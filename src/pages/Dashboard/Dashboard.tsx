import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Droplist from 'components/Droplist/Droplist';
import SelloutTime from 'components/SelloutTime/SelloutTime';
import Statistics from 'components/Staistics/Statistics';
import { fonts, colors } from 'theme/main';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { push } from 'connected-react-router';
import routes from 'constants/routes';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  grid-auto-flow: column;
  height: 100%;
`;

const StyledCard = styled(Card)`
  height: 61rem;
`;

const StyledHeading = styled(Heading)`
  margin-top: 1.5rem;
`;

const StyledHeadingSmall = styled(Heading)`
  margin-bottom: 2.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  :nth-of-type(2) {
    margin-bottom: 1rem;
  }
`;

const Info = styled.p<{ height: string }>`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  text-align: justify;
  line-height: 2rem;
  margin-bottom: 2.5rem;
  height: ${({ height }) => height};
`;

const ContactDescription = styled.div`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  line-height: 2rem;
  margin: 1rem 0;
`;

const ContactEmail = styled.span`
  display: block;
  background: ${colors.mainGradientLR};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ContactParagraph = styled.p`
  margin-top: 0.9rem;
`;

const Dashboard = () => {
  const { news, tips, contactEmail } = useStateSelector(s => s.dashboard);
  const update = useStateSelector(s => s.update);
  const { version } = useStateSelector(s => s.controller);
  const { supreme, palace } = useStateSelector(s => s.dashboard.droplists);
  const times = useStateSelector(s => s.dashboard.selloutTimes);
  const { createdProducts, checkouts } = useStateSelector(s => s.statistics);
  const dispatch = useStateDispatch();

  return (
    <Wrapper>
      <StyledCard>
        <Heading>Droplists</Heading>
        <Container>
          <Droplist data-available details={supreme[0]} />
          <Droplist details={supreme[1]} />
          <Droplist isPalace data-available details={palace[0]} />
          <Droplist isPalace details={palace[1]} />
        </Container>
        <StyledHeading>Sellout times</StyledHeading>
        <Container>
          <SelloutTime details={times.supreme} />
          <SelloutTime isPalace details={times.palace} />
        </Container>
        <StyledHeading>Stats</StyledHeading>
        <Statistics name="Checkouts">{checkouts}</Statistics>
        <Statistics name="Created products">{createdProducts}</Statistics>
      </StyledCard>
      <StyledCard>
        <StyledHeadingSmall>News</StyledHeadingSmall>
        <Info height="10.5rem">{news}</Info>
        <StyledHeadingSmall>Tips</StyledHeadingSmall>
        <Info height="8rem">{tips}</Info>
        <StyledHeadingSmall>Information</StyledHeadingSmall>
        <Statistics
          hasAction={update.isUpdateAvailable}
          name="Version"
          {...(update.isUpdateAvailable && { onClick: () => dispatch(push(routes.update)) })}
        >
          {version} ({update.isUpdateAvailable ? `Download ${update.number} update!` : 'latest'})
        </Statistics>
        <Statistics name="License">Lifetime</Statistics>

        <ContactDescription>
          <p>Did you notice some bugs?</p>
          <p>Have any suggestions?</p>
          <p>Any business inquiries?</p>
          <ContactParagraph>
            Send us a message!<ContactEmail>{contactEmail}</ContactEmail>
          </ContactParagraph>
        </ContactDescription>
      </StyledCard>
    </Wrapper>
  );
};

export default Dashboard;
