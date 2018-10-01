import validate from '../../../lib/validate';

const resetConstraints = {
  password: {
    presence: true,
    strongPassword: {
      minimum: 8,
    },
    length: {
      maximum: 50,
    },
  },
  confirmation_password: {
    presence: true,
    equality: 'password',
  },
};

export const validateForm = values => validate(values, resetConstraints);
