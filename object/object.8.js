
function validateObjectSchema(obj, schema) {
  let errors = [];
  let validatedFields = [];
  let validCount = 0;
  let invalidCount = 0;

  function validate(value, rules, path) {
    // Required check
    if (rules.required && (value === undefined || value === null)) {
      errors.push(`${path} is required`);
      invalidCount++;
      return;
    }

    // Type check
    if (rules.type && typeof value !== rules.type) {
      errors.push(`${path} should be of type ${rules.type}`);
      invalidCount++;
      return;
    }

    // String validations
    if (rules.type === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${path} should have minimum length ${rules.minLength}`);
        invalidCount++;
        return;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${path} does not match pattern`);
        invalidCount++;
        return;
      }
    }

    // Number validations
    if (rules.type === "number") {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${path} should be >= ${rules.min}`);
        invalidCount++;
        return;
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${path} should be <= ${rules.max}`);
        invalidCount++;
        return;
      }
    }

    // Object (nested) validation
    if (rules.type === "object" && rules.properties) {
      for (let key in rules.properties) {
        validate(
          value[key],
          rules.properties[key],
          `${path}.${key}`
        );
      }
      return;
    }

    // If passed all checks
    validatedFields.push(path);
    validCount++;
  }

  for (let key in schema) {
    validate(obj[key], schema[key], key);
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    validatedFields: validatedFields,
    summary: {
      total: validCount + invalidCount,
      valid: validCount,
      invalid: invalidCount
    }
  };
}




let user = {
  name: "John",
  email: "john@example.com",
  age: 25,
  address: {
    street: "Jl. Sudirman",
    city: "Jakarta"
  }
};

let schema = {
  name: { type: "string", required: true, minLength: 2 },
  email: { type: "string", required: true, pattern: /@/ },
  age: { type: "number", required: true, min: 18, max: 100 },
  address: {
    type: "object",
    required: true,
    properties: {
      street: { type: "string", required: true },
      city: { type: "string", required: true }
    }
  }
};

console.log(validateObjectSchema(user, schema));
