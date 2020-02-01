import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as SupremeIcon } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceIcon } from 'assets/PalaceLogo.svg';
import { ReactComponent as EditIcon } from 'assets/Edit.svg';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';
import { Task as TaskType } from 'components/TaskEditor/FormDetails';
import { useDispatch } from 'hooks/useDispatch';
import { push } from 'connected-react-router';
import routes from 'constants/routes';
import { fadeIn } from 'theme/animations';
import { removeUserDataItem } from 'store/userData/actions';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6.7% 23% 20% 19% 23% 8.3%;
  width: 100%;
  height: 5rem;
  align-items: center;
  color: ${colors.lightGrey};
  font-size: ${fonts.medium};
  animation: ${fadeIn} 0.3s forwards;
  :nth-child(odd) {
    background: ${colors.tertiaryBackground};
  }

  :nth-child(even) {
    background: ${colors.secondaryBackground};
  }
`;
const Text = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
`;

const WebsiteIconWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Action = styled.div`
  margin-right: 1.3rem;

  transition: 0.3s all;
  svg {
    height: 1.5rem;
    path {
      fill: url(#iconGradient45);
    }
  }
  :hover {
    cursor: pointer;
    transform: scale(1.15);
    filter: grayscale(85%);
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  &:first-child {
    height: 1.4rem;
  }
`;
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;

interface Props {
  details: TaskType;
}
const Task = ({ details }: Props) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <WebsiteIconWrapper>
        {details.site && details.site.label === 'Palace' ? <PalaceIcon /> : <SupremeIcon />}
      </WebsiteIconWrapper>
      <Text>{details.name}</Text>
      <Text>{details.profile && details.profile.label}</Text>
      <Text>{details.proxy && details.proxy.label}</Text>
      <Text>Waiting For Product</Text>
      <ActionsContainer>
        <Action>
          <EditIcon onClick={() => dispatch(push(routes.tasksEditor + '/' + details.id))} />
        </Action>
        <Action>
          <StyledRemoveIcon onClick={() => dispatch(removeUserDataItem('tasks', details.id))} />
        </Action>
      </ActionsContainer>
    </Wrapper>
  );
};

export default Task;
