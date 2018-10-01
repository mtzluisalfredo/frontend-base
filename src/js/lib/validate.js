import validate from 'validate.js';

/*
  Extend validation, eg.

  validate.validators.boolean = function fn(value) {
    return value ? undefined : 'It\'s not check';
  };
*/

validate.validators.strongPassword = (value = '', opc = { minimum: 8 }) => {
  const isValid = /^[a-zA-Z0-9\,!@#\$%\^\&*\)\(+=._-]+$/i.test(value);

  if (isValid && value.length >= opc.minimum) {
    return null;
  }

  return isValid;
};

export default validate;
