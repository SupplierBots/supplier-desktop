import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts, shadows } from 'theme/main';
import Slider from 'components/Slider/Slider';
import { Formik, FormikProps, FormikHelpers, useFormikContext } from 'formik';
import { GradientParagraph } from 'components/GradientParagraph/GradientParagraph';
import { ReactComponent as TimerIcon } from 'assets/Timer.svg';
import { ReactComponent as ProxiesIcon } from 'assets/Proxies.svg';
import { ReactComponent as RestocksIcon } from 'assets/Restocks.svg';
import { ReactComponent as StartIcon } from 'assets/Start.svg';
import { ReactComponent as StopIcon } from 'assets/Stop.svg';
import { ReactComponent as AddIcon } from 'assets/Plus.svg';
import { InlineInputsContainer } from 'components/TaskEditor/TaskEditor';
import Input from 'components/Input/Input';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import routes from 'constants/routes';
import Button from 'components/Button/Button';
import { removeAllTasks } from 'store/tasks/tasksSlice';
import { push } from 'connected-react-router';
import { setScheduler } from 'store/runner/runnerSlice';
import { runnerValudationSchema } from './FormData';
import Fieldset from 'components/Fieldset/Fieldset';
import moment, { Moment } from 'moment';
import { RunnerState } from 'main/types/RunnerState';
import { setTimerState } from 'store/controller/controllerSlice';
import Select from 'components/Select/Select';
import { proxyRegions } from 'pages/Proxies/FormDetails';
import Radio from 'components/Radio/Radio';

const ConfigBox = styled.div`
  height: 11rem;
  background: ${colors.secondaryBackground};
  border-radius: 0.5rem;
  padding: 1.75rem 2.5rem;
  box-shadow: ${shadows.primary};
`;
const Scheduler = styled(ConfigBox)`
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProxySelector = styled(ConfigBox)`
  width: 32rem;
  margin-left: 1.5rem;
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

const Restocks = styled(ConfigBox)`
  width: 22rem;
  margin-left: 1.5rem;
  pointer-events: none;
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

const StyledProxiesIcon = styled(ProxiesIcon)<{ 'data-enabled': boolean }>`
  margin-top: 0.2rem;
  path {
    transition: all 0.3s;
    fill: ${({ 'data-enabled': enabled }) => (enabled ? 'url(#iconGradient)' : colors.darkGrey)};
  }
`;

const StyledRestocksIcon = styled(RestocksIcon)<{ 'data-enabled': boolean }>`
  margin-top: 0.2rem;
  path {
    transition: all 0.3s;
    fill: ${({ 'data-enabled': enabled }) => (enabled ? 'url(#iconGradient)' : colors.darkGrey)};
  }
`;

const StyledStartIcon = styled(StartIcon)<{ 'data-disabled'?: boolean }>`
  height: 2.1rem;
  width: 2.1rem;
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

const RadioContainer = styled.div`
  display: flex;
`;

const StyledInputsContainer = styled(InlineInputsContainer)`
  margin-top: 0.4rem;
  align-items: center;
  font-size: ${fonts.regular};
`;

const Separator = styled.div`
  height: 1.5rem;
  width: 1px;
  margin: 0 1rem;
  background-color: ${colors.darkGrey};
`;

const SoonParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fonts.big};
  margin-top: 1.35rem;
`;

const TaskRunner = () => {
  const { tasks, harvesters, runner, controller, proxies } = useStateSelector(state => state);
  const [intervalID, setIntervalID] = useState<number>();
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

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

  const isAnyTaskActive = () => tasks.some(t => t.isActive) || controller.isTimerActive;

  const createNewTask = () => {
    if (isAnyTaskActive()) return;
    dispatch(push(routes.tasksEditor + '/new'));
  };

  const startTasks = async () => {
    dispatch(setTimerState({ active: true }));

    IPCRenderer.startTasks(tasks, proxies, harvesters, runner);
    setCurrentDate(moment());
    setIntervalID(
      setInterval(() => {
        setCurrentDate(moment());
      }, 1000),
    );
  };

  const stopTasks = async () => {
    dispatch(setTimerState({ active: false }));
    IPCRenderer.stopTasks();
    clearInterval(intervalID);
  };

  const handleSubmit = (state: RunnerState, actions: FormikHelpers<RunnerState>) => {
    dispatch(setScheduler({ data: state }));
  };

  const getRemainingTime = () => {
    const scheduledDate = moment(runner.time, 'HH:mm:ss');
    if (scheduledDate.valueOf() < moment().valueOf()) {
      scheduledDate.add(1, 'day');
    }
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
        initialValues={runner}
        validationSchema={runnerValudationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<RunnerState>) => (
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
                  <p>Scheduled for {runner.time}</p>
                  <p>{getRemainingTime()}</p>
                </ScheduledState>
              ) : (
                <Fieldset disabled={!props.values.scheduled}>
                  <InlineInputsContainer>
                    <StyledInput
                      type="text"
                      name="time"
                      placeholder="HH:MM:SS (24h)"
                      maskPlaceholder="HH:MM:SS"
                      masked
                      mask="99:99:99"
                      hideErrors
                    />
                  </InlineInputsContainer>
                </Fieldset>
              )}
            </Scheduler>
            <ProxySelector>
              <Fieldset disabled={isAnyTaskActive()}>
                <InlineInputsContainer>
                  <Slider
                    name="proxies"
                    checked={props.values.proxies}
                    onClick={() => {
                      props.setFieldValue('proxiesRegion', !props.values.proxies ? 'eu' : '');
                    }}
                  >
                    {props.values.proxies ? (
                      <StyledGradientParagraph>Auto rotating proxies</StyledGradientParagraph>
                    ) : (
                      <DisabledParagraph>Auto rotating proxies</DisabledParagraph>
                    )}
                  </Slider>
                  <StyledProxiesIcon data-enabled={props.values.proxies} />
                </InlineInputsContainer>
              </Fieldset>
              <Fieldset disabled={!props.values.proxies}>
                <StyledInputsContainer>
                  <RadioContainer>
                    <Radio
                      name="proxiesRegion"
                      value="eu"
                      currentValue={props.values.proxiesRegion}
                      onChange={props.setFieldValue}
                    >
                      EU
                    </Radio>
                    <Radio
                      name="proxiesRegion"
                      value="us"
                      currentValue={props.values.proxiesRegion}
                      onChange={props.setFieldValue}
                    >
                      US
                    </Radio>
                  </RadioContainer>
                  <Separator />
                  <p>Local IP tasks</p>
                  <StyledInput
                    type="tel"
                    name="localIPTasks"
                    placeholder="10"
                    hideErrors
                    width="19%"
                    centered
                    maxlength="2"
                  />
                </StyledInputsContainer>
              </Fieldset>
            </ProxySelector>
            <Restocks>
              <Fieldset disabled={isAnyTaskActive()}>
                <InlineInputsContainer>
                  <Slider name="restocks" checked={props.values.restocks}>
                    {props.values.restocks ? (
                      <StyledGradientParagraph>Restocks</StyledGradientParagraph>
                    ) : (
                      <DisabledParagraph>Restocks</DisabledParagraph>
                    )}
                  </Slider>
                  <StyledRestocksIcon data-enabled={props.values.restocks} />
                </InlineInputsContainer>
              </Fieldset>
              <Fieldset disabled={!props.values.restocks}>
                <SoonParagraph>- Soon -</SoonParagraph>
              </Fieldset>
            </Restocks>
            <ButtonsContainer>
              {!isAnyTaskActive() ? (
                <ActionButton
                  onClick={startTasks}
                  data-disabled={tasks.length === 0 || harvesters.length === 0}
                >
                  <StyledStartIcon data-disabled={tasks.length === 0 || harvesters.length === 0} />
                </ActionButton>
              ) : (
                <ActionButton onClick={stopTasks}>
                  <StyledStopIcon />
                </ActionButton>
              )}
              <ActionButton data-disabled={isAnyTaskActive()} onClick={createNewTask}>
                <StyledAddIcon data-disabled={isAnyTaskActive()} />
              </ActionButton>
            </ButtonsContainer>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};

export { TaskRunner };
