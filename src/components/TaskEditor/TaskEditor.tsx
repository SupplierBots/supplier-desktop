import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import { colors } from 'theme/main';
import Card from 'components/Card/Card';
import Backdrop from 'components/Backdrop/Backdrop';
import { ReactComponent as CloseIcon } from 'assets/Close.svg';
import Fieldset from 'components/Fieldset/Fieldset';
import { Formik, FormikProps, Form, FormikHelpers } from 'formik';
import Select from 'components/Select/Select';
import Slider from 'components/Slider/Slider';
import Button from 'components/Button/Button';
import { slideInFromRight } from 'theme/animations';
import { Option } from 'main/types/Option';
import {
  anySizeOptions,
  initialTaskValues,
  sizeOptions,
  taskValidationSchema,
} from './FormDetails';
import { Task } from 'main/types/Task';
import { RouteComponentProps } from 'react-router';
import routes from 'constants/routes';
import uuid from 'uuid/v4';
import { push } from 'connected-react-router';
import { TaskStatusType } from 'main/types/TaskStatus';
import { updateTask, addTask } from 'store/tasks/tasksSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { UserData } from 'main/types/UserData';
import KeywordsManager from 'components/KeywordsManager/KeywordsManager';
import { config } from 'config';

const StyledHeading = styled(Heading)`
  color: ${colors.lightPurple};
  font-size: 2.2rem;
  margin-bottom: 4rem;

  ::after {
    width: calc(100% + 5.5rem);
  }
`;

const StyledCard = styled(Card)`
  width: 80rem;
  height: 55rem;
  padding: 5rem 7rem;
  margin-top: 7.5rem;
  z-index: 2000;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 3rem;
  top: 2.7rem;
  z-index: 9999;
  cursor: pointer;
  rect,
  path {
    fill: ${colors.pink};
    transition: all 0.3s;
  }
  :hover {
    transform: scale(1.1);
    rect,
    path {
      fill: ${colors.lightPurple};
    }
  }
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 46% 50%;
  grid-column-gap: 3.2rem;
`;

const SlidersContainer = styled.div`
  display: flex;
`;

const StyledSlider = styled(Slider)`
  :first-child {
    margin-right: 7rem;
  }
`;

export const GradientText = styled.span`
  color: transparent;
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
`;

export const InlineInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-row: 3;
  grid-column: 1 / 3;
  margin-top: 8rem;
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;
const TaskEditor = ({ history, match }: RouteComponentProps<{ id: string }>) => {
  const dispatch = useStateDispatch();
  const state = useStateSelector(state => state);
  const [isNew, setIsNew] = useState(match.params.id && match.params.id === 'new');

  const getOptions = (type: 'profiles' | 'proxies'): Option[] => {
    const dataArr = state[type] as UserData[];

    const options = dataArr.map(data => {
      return { label: data.name, value: data.id };
    });
    return options;
  };

  const getInitialValues = (): Task => {
    if (!match.params.id) {
      return initialTaskValues;
    }
    const taskToLoad = state.tasks.find(task => task.id === match.params.id);

    if (taskToLoad) return taskToLoad;

    return initialTaskValues;
  };
  const handleSubmit = (task: Task, actions: FormikHelpers<Task>) => {
    if (isNew) {
      const newTask = {
        ...task,
        isActive: false,
        status: { message: 'Inactive', type: TaskStatusType.Inactive },
        id: uuid(),
      };
      dispatch(addTask({ item: newTask }));
    } else {
      dispatch(updateTask({ item: task }));
    }
    dispatch(push(routes.tasks));
    actions.setSubmitting(false);
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Backdrop visible onClick={() => history.push(routes.tasks)}>
      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={taskValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<Task>) => (
          <StyledCard disableBottomPolygon onClick={handleCardClick}>
            <CloseButton onClick={() => history.push(routes.tasks)}>
              <CloseIcon />
            </CloseButton>
            <StyledHeading>Create new task</StyledHeading>
            <StyledForm>
              <Fieldset>
                <Select
                  name="product"
                  placeholder="Product"
                  value={props.values.product}
                  options={Object.keys(state.products).map(p => ({
                    value: p,
                    label: p,
                  }))}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.product && !!props.touched.product}
                />
                <KeywordsManager
                  name="colors"
                  placeholder="+Another color"
                  onChange={props.setFieldValue}
                  setTouched={props.setFieldTouched}
                  error={!!props.errors.colors && !!props.touched.colors}
                  description="Press enter or click 'Add'"
                  values={props.values.colors}
                  customStyle={`
                  margin-bottom: .7rem;
                `}
                />
              </Fieldset>
              <Fieldset>
                <Select
                  name="size"
                  placeholder="Size"
                  value={props.values.size}
                  options={sizeOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.size && !!props.touched.size}
                />
                <SlidersContainer>
                  <StyledSlider name="anySize" checked={props.values.anySize}>
                    Any Size
                  </StyledSlider>
                  <StyledSlider name="anyColor" checked={props.values.anyColor}>
                    Any Color
                  </StyledSlider>
                </SlidersContainer>
                {props.values.anySize && (
                  <Select
                    name="anySizeOption"
                    placeholder="If selected size not available choose"
                    value={props.values.anySizeOption}
                    options={anySizeOptions}
                    onBlur={props.setFieldTouched}
                    onChange={props.setFieldValue}
                    error={!!props.errors.anySizeOption && !!props.touched.anySizeOption}
                  />
                )}
                <Select
                  name="profile"
                  placeholder="Profile"
                  value={props.values.profile}
                  options={getOptions('profiles')}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.profile && !!props.touched.profile}
                />
                <Select
                  name="proxy"
                  placeholder="Proxy"
                  value={props.values.proxy}
                  options={[{ value: 'none', label: 'None' }, ...getOptions('proxies')]}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.proxy && !!props.touched.proxy}
                />
              </Fieldset>
              <ButtonsContainer>
                {!isNew && props.dirty && state.tasks.length < config.maxTasksAmount && (
                  <Button
                    medium
                    secondary
                    bgColor={colors.tertiaryBackground}
                    animation={slideInFromRight}
                    onClick={async () => {
                      const errors = await props.validateForm();
                      console.log(errors);
                      if (Object.entries(errors).length !== 0) return;
                      setIsNew(true);
                      props.submitForm();
                    }}
                  >
                    Save As New
                  </Button>
                )}
                <Button submit medium bgColor={colors.tertiaryBackground}>
                  {isNew ? 'Create' : 'Save Changes'}
                </Button>
              </ButtonsContainer>
            </StyledForm>
          </StyledCard>
        )}
      </Formik>
    </Backdrop>
  );
};

export default TaskEditor;
