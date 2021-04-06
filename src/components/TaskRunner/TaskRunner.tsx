import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts, shadows } from 'theme/main';
import Slider from 'components/Slider/Slider';
import { Formik, FormikProps, FormikHelpers, useFormikContext } from 'formik';
import { GradientParagraph } from 'components/GradientParagraph/GradientParagraph';
import { ReactComponent as TimerIcon } from 'assets/Timer.svg';
import { ReactComponent as StartIcon } from 'assets/Start.svg';
import { ReactComponent as StopIcon } from 'assets/Stop.svg';
import { ReactComponent as AddIcon } from 'assets/Plus.svg';
import { InlineInputsContainer } from 'components/TaskEditor/TaskEditor';
import Input from 'components/Input/Input';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import routes from 'constants/routes';
import { push } from 'connected-react-router';
import { setScheduler } from 'store/scheduler/schedulerSlice';
import { schedulerValudationSchema } from './FormData';
import Fieldset from 'components/Fieldset/Fieldset';
import moment, { Moment } from 'moment';
import { SchedulerState } from 'main/types/SchedulerState';
import { setTimerState } from 'store/controller/controllerSlice';
import { TaskStatusType } from 'main/types/TaskStatus';
import { setProcessingAction } from 'store/tasksManager/tasksManagerSlice';

const ConfigBox = styled.div`
  height: 11rem;
  background: ${colors.secondaryBackground};
  border-radius: 0.5rem;
  padding: 1.75rem 2.5rem;
  box-shadow: ${shadows.primary};
`;
const Scheduler = styled(ConfigBox)`
  width: 23.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ActionButton = styled.div<{ 'data-disabled'?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.95rem;
  height: 4.75rem;
  border-radius: 0.5rem;
  margin-left: 1.5rem;
  background: ${colors.secondaryBackground};
  box-shadow: ${shadows.primary};
  transition: 0.3s all;
  backface-visibility: hidden;

  ${({ 'data-disabled': disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      }
    `};

  ${({ 'data-disabled': disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const StyledGradientParagraph = styled(GradientParagraph)`
  font-size: ${fonts.big};
  margin-top: 0.15rem;
  margin-left: 1.5rem;
`;

const DisabledParagraph = styled.p`
  font-size: ${fonts.big};
  margin-top: 0.15rem;
  margin-left: 1.5rem;
`;

const StyledInput = styled(Input)`
  margin-bottom: 0;
`;
const Wrapper = styled.div`
  align-self: end;
  display: flex;
  justify-content: flex-end;
`;

const StyledTimerIcon = styled(TimerIcon)<{ 'data-enabled': boolean }>`
  path {
    transition: all 0.3s;
    fill: ${({ 'data-enabled': enabled }) => (enabled ? 'url(#iconGradient)' : colors.darkGrey)};
  }
`;

const StyledStartIcon = styled(StartIcon)<{ 'data-disabled'?: boolean }>`
  height: 1.8rem;
  width: 1.8rem;
  margin-top: 0.3rem;
  margin-left: 0.3rem;
  ${({ 'data-disabled': disabled }) =>
    disabled &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `};
`;

const StyledStopIcon = styled(StopIcon)`
  height: 1.9rem;
  width: 1.9rem;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
`;

const StyledAddIcon = styled(AddIcon)<{ 'data-disabled'?: boolean }>`
  height: 2.1rem;
  width: 2.1rem;
  margin-left: 0.1rem;
  ${({ 'data-disabled': disabled }) =>
    disabled &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ScheduledState = styled.div`
  color: ${colors.lightPurple};
  padding: 0.3rem 0;
  line-height: 1.25;
  font-size: ${fonts.regular};
`;

const StyledInputsContainer = styled(InlineInputsContainer)`
  margin-top: 0.4rem;
  align-items: center;
  font-size: ${fonts.regular};
`;

const TaskRunner = () => {
  const {
    tasks,
    harvesters,
    scheduler,
    controller,
    proxies,
    webhook,
    tasksManager: { processingAction },
  } = useStateSelector(state => state);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [scheduledDate, setScheduledDate] = useState<Moment>(moment());

  const dispatch = useStateDispatch();

  const SubmitOnExit = () => {
    const { values, submitForm } = useFormikContext();
    useEffect(() => {
      return () => {
        submitForm();
      };
    }, [values, submitForm]);
    return null;
  };

  const isAnyTaskActive = () =>
    tasks.some(t => t.isActive) || controller.isTimerActive || harvesters.some(h => h.isActive);

  const createNewTask = () => {
    if (isAnyTaskActive()) return;
    dispatch(push(routes.tasksEditor + '/new'));
  };

  const startTasks = async () => {
    if (processingAction) return;
    dispatch(setProcessingAction({ processingAction: true }));
    if (!scheduler.scheduled) {
      IPCRenderer.startTasks({
        tasks: getAvailableTasks(),
        scheduler,
        proxies,
        harvesters,
        webhook,
      });
      return;
    }

    dispatch(setTimerState({ active: true }));

    const date = moment(scheduler.time, 'DD/MM HH:mm:ss');

    setScheduledDate(date);

    IPCRenderer.startTasks({
      tasks: getAvailableTasks(),
      scheduler,
      proxies,
      harvesters,
      webhook,
    });
    setCurrentDate(moment());
    setIntervalID(
      setInterval(() => {
        setCurrentDate(moment());
      }, 1000),
    );
  };

  const stopTasks = async () => {
    if (processingAction) return;
    dispatch(setProcessingAction({ processingAction: true }));
    dispatch(setTimerState({ active: false }));
    IPCRenderer.stopTasks();
    if (intervalID) {
      clearInterval(intervalID);
    }
  };

  const handleSubmit = (state: SchedulerState, actions: FormikHelpers<SchedulerState>) => {
    dispatch(setScheduler({ data: state }));
  };

  const getRemainingTime = () => {
    if (!currentDate) return 'Unknown time, start again!';

    const timeDifference = Math.abs(currentDate.valueOf() - scheduledDate.valueOf());
    if (currentDate >= scheduledDate || timeDifference <= 1000) {
      if (intervalID) {
        clearInterval(intervalID);
      }
      return 'Started!';
    }

    if (timeDifference < 60000) {
      return `Starts within ${Math.floor(timeDifference / 1000)} seconds`;
    }

    return `Starts ${currentDate?.to(scheduledDate)}`;
  };

  const getAvailableTasks = () => tasks.filter(t => t.status.type !== TaskStatusType.Success);

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={scheduler}
        validationSchema={schedulerValudationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<SchedulerState>) => (
          <>
            <SubmitOnExit />
            <Scheduler>
              <Fieldset disabled={isAnyTaskActive()}>
                <InlineInputsContainer>
                  <Slider name="scheduled" checked={props.values.scheduled}>
                    {props.values.scheduled ? (
                      <StyledGradientParagraph>Schedule</StyledGradientParagraph>
                    ) : (
                      <DisabledParagraph>Schedule</DisabledParagraph>
                    )}
                  </Slider>
                  <StyledTimerIcon data-enabled={props.values.scheduled} />
                </InlineInputsContainer>
              </Fieldset>
              {isAnyTaskActive() && props.values.scheduled ? (
                <ScheduledState>
                  <p>Scheduled for {scheduler.time}</p>
                  <p>{getRemainingTime()}</p>
                </ScheduledState>
              ) : (
                <Fieldset disabled={!props.values.scheduled}>
                  <StyledInputsContainer>
                    <StyledInput
                      type="text"
                      name="time"
                      placeholder="DD/MM hh:mm:ss"
                      maskPlaceholder="DD/MM hh:mm:ss"
                      masked
                      data-centered
                      mask="99/99 99:99:99"
                      hideErrors
                      width="80%"
                    />
                    <span>24h</span>
                  </StyledInputsContainer>
                </Fieldset>
              )}
            </Scheduler>
            <ButtonsContainer>
              {!isAnyTaskActive() ? (
                <ActionButton
                  onClick={startTasks}
                  data-disabled={
                    getAvailableTasks().length === 0 || harvesters.length === 0 || processingAction
                  }
                >
                  <StyledStartIcon
                    data-disabled={
                      getAvailableTasks().length === 0 ||
                      harvesters.length === 0 ||
                      processingAction
                    }
                  />
                </ActionButton>
              ) : (
                <ActionButton onClick={stopTasks} data-disabled={processingAction}>
                  <StyledStopIcon />
                </ActionButton>
              )}
              <ActionButton
                data-disabled={isAnyTaskActive() || tasks.length >= 6}
                onClick={createNewTask}
              >
                <StyledAddIcon data-disabled={isAnyTaskActive() || tasks.length >= 6} />
              </ActionButton>
            </ButtonsContainer>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};

export { TaskRunner };
