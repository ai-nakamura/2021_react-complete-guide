export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if ( rules.required ) {
    isValid = value.trim() !== '' && isValid;
  }

  if ( rules.isEmail ) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if ( rules.minLength ) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if ( rules.maxLength ) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
}