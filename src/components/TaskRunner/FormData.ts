import * as Yup from 'yup';

//Works, right?
const timeRegex = /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2]) (?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;

export const schedulerValudationSchema = Yup.object().shape({
  scheduled: Yup.boolean(),
  time: Yup.string().when('scheduled', {
    is: true,
    then: Yup.string()
      .required()
      .matches(timeRegex),
    otherwise: Yup.string(),
  }),
});
