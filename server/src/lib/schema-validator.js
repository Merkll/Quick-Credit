/**
 * A validator class to check if a data conform to the defined schema
 */

export class Validator {
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

/** Defines major types and their validation functions */
export const FieldTypes = {
  Integer: field => typeof field === 'number' && field % 1 === 0,
  String: field => typeof field === 'string',
  Boolean: field => typeof field === 'boolean' || (field === 'true' || field === 'false'),
  Number: field => typeof field === 'number',
  Date: field => field instanceof Date,
};

// export default {
//   Validator,
//   FieldTypes,
// };
