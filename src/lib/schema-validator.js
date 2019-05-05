class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(entryToValidate = {}) {
    if (entryToValidate instanceof Array) return this.validateArrayOfData(entryToValidate);
    return !Object.entries(entryToValidate)
      .some(([field, value]) => !(typeof this.schema[field] === 'function' && this.schema[field](value)));
  }

  validateArrayOfData(entryToValidate) {
    return !entryToValidate.some(field => !this.validate(field));
  }
}
const FieldTypes = {};
FieldTypes.Integer = field => typeof field === 'number' && field % 1 === 0;
FieldTypes.String = field => typeof field === 'string';
FieldTypes.Boolean = field => typeof field === 'boolean' || (field === 'true' || field === 'false');

module.exports = {
  Validator,
  FieldTypes,
};
