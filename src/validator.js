import validator from "validator";

export const required = (value) => {
  if (!value.toString().trim().length) {
    return "this field is required";
  }
};

export const isEmail = (value) => {
  if (!validator.isEmail(value)) {
    return "invalid email address";
  }
};

export const hasMinLength = (value) => {
  if (value.toString().trimStart().length < 10) {
    return "message should contain at least 10 symbols";
  }
};
