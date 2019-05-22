import { Validator } from 'jsonschema';


Validator.prototype.customFormats.myId = id => (typeof id === 'number');

Validator.prototype.customFormats.myEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'gi');
  return re.test(String(email).toLowerCase());
};

Validator.prototype.customFormats.myDate = date => !!Date.parse(date);

const errorTypes = {
  required: ({ field }) => `Field ${field} is required`,
  type: ({ field, type }) => `Field ${field} should be of type ${type}`,
  format: ({ field, format }) => `Field ${field} should conform to ${format.split('my')[1]} format`,
};

const getErrors = errors => errors.map((err) => {
  const field = (err.schema && err.schema.fieldName) ? err.schema.fieldName.toUpperCase() : '';
  const type = (err.schema) ? err.schema.type : '';
  const format = (err.schema) ? err.schema.format : '';
  const errorMessage = (errorTypes[err.name]) ? errorTypes[err.name]({ field, type, format }) 
    : err.message;
  return errorMessage;
});

const schema = (data, model) => {
  const id = `/${model.table}`;
  const validatorSchema = {
    id,
    properties: model.schema
  };
  let validationErrors = [];
  const dataToValidate = (!Array.isArray(data)) ? [data] : data;
  const error = dataToValidate.some((singleData) => {
    const { valid: isValid, errors } = new Validator().validate(singleData, validatorSchema);
    validationErrors = errors;
    return !isValid;
  });
  return { valid: !error, errors: getErrors(validationErrors) };
};

const validate = (data, dataSchema) => new Validator().validate(data, dataSchema);

const validateSchemaForUpdate = (data, dataSchema) => {
  let validationError = [];
  const isValid = !Object.entries(data).some(([key, value]) => {
    if (!dataSchema[key]) {
      validationError.push('Field is Invalid');
      return true;
    }
    const { valid, errors } = validate(value, dataSchema[key]);
    validationError = errors;
    return !valid;
  });
  return { valid: isValid, errors: getErrors(validationError) };
};

export default {
  schema, validate, validateSchemaForUpdate
};
