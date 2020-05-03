import * as Yup from 'yup';

//Works, right?
const timeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;

export const runnerValudationSchema = Yup.object().shape({
  scheduled: Yup.boolean(),
  time: Yup.string().when('scheduled', {
    is: true,
    then: Yup.string()
      .required()
      .matches(timeRegex),
    otherwise: Yup.string(),
  }),
  proxies: Yup.boolean(),
  proxiesRegion: Yup.string().when('proxies', {
    is: true,
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  localIPTasks: Yup.number().when('proxies', {
    is: true,
    then: Yup.number()
      .required()
      .max(99),
    otherwise: Yup.number().max(99),
  }),
  restocks: Yup.boolean(),
  monitorDelay: Yup.number().when('restocks', {
    is: true,
    then: Yup.number()
      .required()
      .min(100)
      .max(9999),
    otherwise: Yup.number()
      .min(100)
      .max(9999),
  }),
});
