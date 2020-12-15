import { webhookRegex } from './../../main/types/WebhookConfig';
import * as Yup from 'yup';

export const webhookValidationSchema = Yup.object().shape({
  onlySuccess: Yup.boolean(),
  url: Yup.string().when('onlySuccess', {
    is: true,
    then: Yup.string()
      .trim()
      .required('Required')
      .matches(webhookRegex, 'Incorrect Format'),
    otherwise: Yup.lazy((value: string) =>
      value?.length > 0 ? Yup.string().matches(webhookRegex, 'Incorrect Format') : Yup.string(),
    ),
  }),
});
