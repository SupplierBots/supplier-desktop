import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme/main';
import Slider from 'components/Slider/Slider';
import { Formik, FormikProps, FormikHelpers, useFormikContext } from 'formik';
import { GradientParagraph } from 'components/GradientParagraph/GradientParagraph';
import { ReactComponent as TimerIcon } from 'assets/Timer.svg';
import { InlineInputsContainer } from 'components/TaskEditor/TaskEditor';
import Input from 'components/Input/Input';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import routes from 'constants/routes';
import Button from 'components/Button/Button';
import { removeAllTasks } from 'store/tasks/tasksSlice';
import { push } from 'connected-react-router';
import { setScheduler } from 'store/scheduler/schedulerSlice';
import { schedulerValidationSchema } from './FormData';
import Fieldset from 'components/Fieldset/Fieldset';
import moment, { Moment } from 'moment';
import { SchedulerState } from 'main/types/SchedulerState';
import { setTimerState } from 'store/controller/controllerSlice';

const Scheduler = styled.div`
  width: 35rem;
  height: 11rem;
  background: ${colors.secondaryBackground};
  border-radius: 0.5rem;
  padding: 1.75rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 45%;
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
`;

const StyledTimerIcon = styled(TimerIcon)<{ 'data-enabled': boolean }>`
  path {
    transition: all 0.3s;
    fill: ${({ 'data-enabled': enabled }) => (enabled ? 'url(#iconGradient)' : colors.darkGrey)};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  flex-basis: 55%;
  margin-left: 3rem;
`;

const ScheduledState = styled.div`
  color: ${colors.lightPurple};
  padding: 0.3rem 0;
  line-height: 1.25;
  font-size: ${fonts.regular};
`;

const TaskRunner = () => {
  const { tasks, browsers, scheduler, controller } = useStateSelector(state => state);
  const [intervalID, setIntervalID] = useState<number>();
  const [currentDate, setCurrentDate] = useState<Moment>();

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

  const isAnyBrowserAvailable = () => {
    return browsers.filter(b => !tasks.some(t => t.browser && t.browser.value === b.id)).length > 0;
  };

  const createNewTask = () => {
    if (!isAnyBrowserAvailable()) return;
    dispatch(push(routes.tasksEditor + '/new'));
  };

  const isAnyTaskActive = () => browsers.some(b => b.isActive) || controller.isTimerActive;

  const handleTasks = async () => {
    if (!isAnyTaskActive()) {
      dispatch(setTimerState({ active: true }));

      IPCRenderer.startTasks(tasks, scheduler);
      setCurrentDate(moment());
      setIntervalID(
        setInterval(() => {
          setCurrentDate(moment());
        }, 1000),
      );
      return;
    }
    dispatch(setTimerState({ active: false }));
    IPCRenderer.stopTasks();
    clearInterval(intervalID);
  };

  const handleSubmit = (state: SchedulerState, actions: FormikHelpers<SchedulerState>) => {
    dispatch(setScheduler({ data: state }));
  };

  const getRemainingTime = () => {
    const scheduledDate = moment(`${scheduler.date} ${scheduler.time}`, 'DD/MM/YYYY HH:mm:ss');
    if (!currentDate) return 'Unknown time, start again!';

    const timeDifference = Math.abs(currentDate.valueOf() - scheduledDate.valueOf());
    if (currentDate >= scheduledDate || timeDifference <= 1000) return 'Started!';

    if (timeDifference < 60000) {
      return `Starts within ${Math.floor(timeDifference / 1000)} seconds`;
    }

    return `Starts ${currentDate?.to(scheduledDate)}`;
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={scheduler}
        validationSchema={schedulerValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<SchedulerState>) => (
          <>
            <SubmitOnExit />
            <Scheduler>
              <Fieldset disabled={isAnyTaskActive()}>
                <InlineInputsContainer>
                  <Slider name="enabled" checked={props.values.enabled}>
                    {props.values.enabled ? (
                      <StyledGradientParagraph>Schedule tasks</StyledGradientParagraph>
                    ) : (
                      <DisabledParagraph>Schedule tasks</DisabledParagraph>
                    )}
                  </Slider>
                  <StyledTimerIcon data-enabled={props.values.enabled} />
                </InlineInputsContainer>
              </Fieldset>
              {isAnyTaskActive() && props.values.enabled ? (
                <ScheduledState>
                  <p>Scheduled for {`${scheduler.date} ${scheduler.time}`}</p>
                  <p>{getRemainingTime()}</p>
                </ScheduledState>
              ) : (
                <Fieldset disabled={!props.values.enabled}>
                  <InlineInputsContainer>
                    <StyledInput
                      type="text"
                      name="date"
                      placeholder="DD/MM/YYYY"
                      maskPlaceholder="DD/MM/YYYY"
                      width="48.5%"
                      masked
                      mask="99/99/9999"
                    />
                    <StyledInput
                      type="text"
                      name="time"
                      placeholder="HH:MM:SS (24h)"
                      maskPlaceholder="HH:MM:SS"
                      width="48.5%"
                      masked
                      mask="99:99:99"
                    />
                  </InlineInputsContainer>
                </Fieldset>
              )}
            </Scheduler>
            <ButtonsContainer>
              <Button
                disabled={isAnyTaskActive() || tasks.length === 0}
                secondary
                onClick={() => dispatch(removeAllTasks())}
                width="12rem"
              >
                Remove All
              </Button>

              <Button
                submit
                secondary
                onClick={handleTasks}
                disabled={tasks.length === 0}
                width="12rem"
              >
                {isAnyTaskActive() ? 'Stop All' : 'Start All'}
              </Button>

              <Button
                disabled={!isAnyBrowserAvailable() || isAnyTaskActive()}
                onClick={createNewTask}
              >
                {!isAnyBrowserAvailable() ? 'All Browsers Used' : 'Create Task'}
              </Button>
            </ButtonsContainer>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};

export { TaskRunner };
