import validate from '../../lib/validate';

const constraints = {
  email: {
    presence: true,
    email: true,
    length: {
      maximum: 50,
    },
  },
  current_password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 50,
    },
  },
  new_password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 50,
    },
  },
};

const validateForm = values => validate(values, constraints);

export default { validateForm };
