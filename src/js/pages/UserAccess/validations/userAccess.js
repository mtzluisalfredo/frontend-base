import validate from '../../../lib/validate';

const constraints = {
  email: {
    presence: true,
    email: true,
    length: {
      maximum: 50,
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 50,
    },
  },
};

export const validateForm = values => validate(values, constraints);
