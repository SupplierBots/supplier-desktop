import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Heading from 'components/Heading/Heading';
import Harvester from 'components/Harvester/Harvester';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';

import { createHarvester } from 'store/harvesters/harvestersSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { colors } from 'theme/main';
import Card from 'components/Card/Card';
import { Formik, FormikProps, useFormikContext } from 'formik';
import { webhookValidationSchema } from './webhookForm';
import { WebhookConfig } from 'main/types/WebhookConfig';
import Input from 'components/Input/Input';
import Slider from 'components/Slider/Slider';
import { setWebhookConfig } from 'store/webhook/webhookSlice';
import { IPCRenderer } from 'main/IPC/IPCRenderer';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
`;

const HarvestersCard = styled(Card)`
  max-height: 50rem;
  position: relative;
  padding-bottom: 3.5rem;
`;

const HarvestersHeading = styled(Heading)`
  margin-bottom: 1.6rem;
`;

const HarvestersContainer = styled.div`
  margin-top: 0.6rem;
  max-height: 39rem;
`;

const InlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const StyledSlider = styled(Slider)`
  margin: 0;
`;

const Settings = () => {
  const { harvesters, webhook } = useStateSelector(state => state);
  const dispatch = useStateDispatch();

  const handleSubmit = (config: WebhookConfig) => {
    dispatch(setWebhookConfig({ config }));
  };

  const SubmitOnExit = () => {
    const { values, submitForm } = useFormikContext();
    useEffect(() => {
      return () => {
        submitForm();
      };
    }, [values, submitForm]);
    return null;
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={webhook}
        validationSchema={webhookValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, setFieldError, errors }: FormikProps<WebhookConfig>) => (
          <Card>
            <Heading>Discord webhook</Heading>
            <SubmitOnExit />
            <Input type="text" name="url" placeholder="Webhook URL" />
            <InlineContainer>
              <StyledSlider name="onlySuccess" checked={values.onlySuccess}>
                Success Only
              </StyledSlider>
              <Button
                small
                secondary
                bgColor={colors.tertiaryBackground}
                onClick={() => {
                  if (errors.url) return;
                  if (webhook.url === '') {
                    touched.url = true;
                    setFieldError('url', 'Required');
                    return;
                  }

                  IPCRenderer.testWebhook(webhook);
                }}
              >
                Test
              </Button>
            </InlineContainer>
          </Card>
        )}
      </Formik>

      <HarvestersCard>
        <HarvestersHeading>Harvesters</HarvestersHeading>
        <HarvestersContainer>
          {harvesters.map(b => (
            <Harvester key={b.id} data={b} />
          ))}
        </HarvestersContainer>
      </HarvestersCard>
      <ButtonsContainer>
        <Button onClick={() => dispatch(createHarvester())} disabled={harvesters?.length >= 3}>
          {harvesters?.length >= 3 ? 'Max Harvesters' : 'Add Harvester'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Settings;
