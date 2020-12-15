import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import { colors, fonts } from 'theme/main';
import Card from 'components/Card/Card';
import Backdrop from 'components/Backdrop/Backdrop';
import { ReactComponent as CloseIcon } from 'assets/Close.svg';
import Fieldset from 'components/Fieldset/Fieldset';
import Input from 'components/Input/Input';
import { Formik, FormikProps, Form, FormikHelpers } from 'formik';
import Select from 'components/Select/Select';
import Slider from 'components/Slider/Slider';
import Button from 'components/Button/Button';
import { slideInFromRight } from 'theme/animations';
import ProductSelector from 'components/ProductSelector/ProductSelector';
import { Option } from 'main/types/Option';
import { taskSiteOptions, initialTaskValues, taskValidationSchema } from './FormDetails';
import { Task } from 'main/types/Task';
import { RouteComponentProps } from 'react-router';
import routes from 'constants/routes';
import uuid from 'uuid/v4';
import { push } from 'connected-react-router';
import { SelectableUserData } from 'main/types/SelectableUserData';
import { TaskStatusType } from 'main/types/TaskStatus';
import { updateTask, addTask } from 'store/tasks/tasksSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';

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
  height: 60rem;
  padding: 5rem 7rem;
  margin-top: 6.5rem;
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

const ItemsCounter = styled.p`
  color: ${colors.darkGrey};
  font-size: ${fonts.big};
  grid-column: 1;
  justify-self: center;
  margin-top: 2.4rem;
  margin-right: 1rem;
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

const StyledSlider = styled(Slider)`
  margin: 1.25rem 0 1.85rem 0;
  display: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-row: 3;
  grid-column: 1 / 3;
  margin-top: 6.5rem;
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;
const TaskEditor = ({ history, match }: RouteComponentProps<{ id: string }>) => {
  const dispatch = useStateDispatch();
  const state = useStateSelector(state => state);
  const [isNew, setIsNew] = useState(match.params.id && match.params.id === 'new');

  const getOptions = (type: 'profiles' | 'products', site: Option | null): Option[] => {
    const dataArr = state[type] as SelectableUserData[];

    const options = dataArr
      .filter(
        data =>
          (site && data.site && data.site.value === site.value) ||
          (data.site && data.site.label === 'Both'),
      )
      .map(data => {
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
        // status: { message: 'Success', type: TaskStatusType.Success },
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
              <ProductSelector
                site={props.values.site && props.values.site.value}
                placeholder="+Another color"
                onChange={props.setFieldValue}
                setTouched={props.setFieldTouched}
                error={!!props.errors.products && !!props.touched.products}
                value={props.values.products}
              />
              <Fieldset>
                <Select
                  specialPlaceholder
                  name="site"
                  placeholder="Site"
                  value={props.values.site}
                  options={taskSiteOptions}
                  onBlur={props.setFieldTouched}
                  onChange={(name, value) => {
                    props.setFieldValue(name, value);
                    props.setFieldValue('profile', null);
                    props.setFieldValue('proxy', null);
                  }}
                  error={!!props.errors.site && !!props.touched.site}
                />
                <Fieldset disabled={!props.values.site}>
                  <Select
                    name="profile"
                    placeholder="Profile"
                    value={props.values.profile}
                    options={getOptions('profiles', props.values.site)}
                    onBlur={props.setFieldTouched}
                    onChange={props.setFieldValue}
                    error={!!props.errors.profile && !!props.touched.profile}
                  />
                  <Input type="text" name="name" placeholder="Task name" />
                  <InlineInputsContainer>
                    <Input
                      type="number"
                      name="refreshRate"
                      placeholder="Refresh rate (ms)"
                      width="48.5%"
                    />
                    {props.values.site && props.values.site.value === 'supreme' && (
                      <Input
                        type="number"
                        name="checkoutDelay"
                        placeholder="Checkout delay (ms)"
                        width="48.5%"
                      />
                    )}
                  </InlineInputsContainer>
                  <Slider name="bypassCardinal" checked={!!props.values.bypassCardinal}>
                    3D Secure Bypass
                  </Slider>
                  <StyledSlider name="stopIfSoldOut" checked={props.values.stopIfSoldOut}>
                    Stop if any product sold out
                  </StyledSlider>
                </Fieldset>
              </Fieldset>
              <ItemsCounter>
                {!props.values.site && <GradientText>Firstly, select the site</GradientText>}
                {props.values.site && props.values.products.length > 0 && (
                  <span>
                    You've selected{' '}
                    <GradientText>
                      {props.values.products.length} product
                      {props.values.products.length > 1 && 's'}
                    </GradientText>
                  </span>
                )}
                {props.values.site && props.values.products.length === 0 && (
                  <span>You haven't selected any products</span>
                )}
              </ItemsCounter>
              <ButtonsContainer>
                {!isNew && props.dirty && state.tasks.length < 8 && (
                  <Button
                    medium
                    secondary
                    bgColor={colors.tertiaryBackground}
                    animation={slideInFromRight}
                    onClick={async () => {
                      const errors = await props.validateForm();
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
