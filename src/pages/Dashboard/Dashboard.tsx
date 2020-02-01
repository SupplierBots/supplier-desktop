import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Droplist from 'components/Droplist/Droplist';
import SelloutTime from 'components/SelloutTime/SelloutTime';
import Statistics from 'components/Staistics/Statistics';
import { fonts, colors } from 'theme/main';

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

const Info = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  text-align: justify;
  line-height: 2rem;
  margin-bottom: 2.5rem;
`;

const ContactDescription = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  line-height: 2rem;
  margin: 1rem 0;
`;

const ContactEmail = styled.p`
  background: ${colors.mainGradientLR};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <StyledCard>
        <Heading>Droplists</Heading>
        <Container>
          <Droplist available />
          <Droplist />
          <Droplist isPalace available />
          <Droplist isPalace />
        </Container>
        <StyledHeading>Sellout times</StyledHeading>
        <Container>
          <SelloutTime />
          <SelloutTime isPalace />
        </Container>
        <StyledHeading>Stats</StyledHeading>
        <Statistics name="Successful checkouts">23</Statistics>
        <Statistics name="Created products">144</Statistics>
      </StyledCard>
      <StyledCard>
        <StyledHeadingSmall>News</StyledHeadingSmall>
        <Info>
          Finally closed beta! We would be thankful for every feedback. Please be aware that some
          errors can occur. We will fix them as fast as possible. Be sure you've downloaded latest
          version. Thanks for participating.
        </Info>
        <StyledHeadingSmall>Tips</StyledHeadingSmall>
        <Info>
          Here we will display random tips and answers to frequently asked questions. We need more
          text - this placeholder is a too short, final tips will be a bit longer. At least some of
          them.
        </Info>
        <StyledHeadingSmall>Information</StyledHeadingSmall>
        <Statistics name="Version">1.0.0 (latest)</Statistics>
        <Statistics name="License expires on">28 July 2020 (365 days left)</Statistics>
        <ContactDescription>
          Did you notice any bugs or have some suggestions? Send us a message!
          <ContactEmail>support@safedropbot.com</ContactEmail>
        </ContactDescription>
        <ContactDescription>
          Business inquiries:
          <ContactEmail>contact@safedropbot.com</ContactEmail>
        </ContactDescription>
      </StyledCard>
    </Wrapper>
  );
};

export default Dashboard;
