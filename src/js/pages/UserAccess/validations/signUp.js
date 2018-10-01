import validate from '@/lib/validate';

const constraints = {
  firstName: {
    presence: true,
    length: {
      maximum: 254,
    },
  },
  lastName: {
    presence: true,
    length: {
      maximum: 254,
    },
  },
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

export const validateSingle = field => (value = '') => {
  if (value.length > 0) {
    const errors = validate.single(value, constraints[field]);
    return !!errors;
  }

  return false;
};
