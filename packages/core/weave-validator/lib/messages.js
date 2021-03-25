module.exports = {
  required: 'The Field "{param}" is required.',
  string: 'The parameter "{param}" have to be a string.',
  stringMinLength: 'The parameter "{param}" must be at least {expected} characters long.',
  stringMaxLength: 'The parameter "{param}" must be less than or equal to {expected} characters long.',
  stringEqual: 'The parameter "{param}" must not be equal to {expected}.',
  stringContain: 'The parameter "{param}" have to contain {expected}.',
  stringBase64: 'The parameter "{param}" must be a base64 string.',
  boolean: 'The parameter "{param}" have to be a boolean value.',
  array: 'The parameter "{param}" have to be an array.',
  date: 'The parameter "{param}" is not a valid date.',
  email: 'The value of parameter "{param}" is not a valid email address.',
  forbidden: 'The parameter "{param}" is forbidden.',
  number: 'The parameter "{param}" have to be a number.',
  numberMin: 'The value of parameter "{param}" must be at least {expected}.',
  numberMax: 'The value of parameter "{param}" must not exceed {expected}.',
  numberInteger: 'The value of the parameter "{param}" have to be boolean.',
  numberPositive: 'The value of the parameter "{param}" have to be positive.',
  numberNegative: 'The value of the parameter "{param}" have to be negative.',
  numberEqual: 'The value of the parameter "{param}" have to be equal {expected}.',
  numberNotEqual: 'The value of the parameter "{param}" must not be equal to {expected}.',
  object: 'The value of the parameter "{param}" must be an object.',
  url: 'The value of parameter "{param}" have to be an url {passed}.',
  arrayMinLength: 'The parameter "{param}" must contain at least {expected} elements.',
  arrayMaxLength: 'The parameter "{param}" may contain a maximum of {expected} elements.',
  arrayContains: 'The parameter "{param}"  must contain the item "{expected}".',
  enumValues: 'The  value of the parameter "{param}" with the value "{passed}" does not match with any of the allowed values.'
}
