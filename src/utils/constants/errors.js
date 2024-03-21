
export const ERRORS = {
    // Form Input
    EMAIL_INVALID: "Email is not valid",
    EMAIL_REQUIRED: "Email is required",
    PHONE_INVALID: "Phone number is not valid",
    PHONE_REQUIRED: "Phone number is required",
    FIRST_NAME_REQUIRED: "First name is required",
    LAST_NAME_REQUIRED: "Last name is required",
    ONLY_LETTERS: "Only letters are allowed",
    ONLY_NUMBERS: "Only numbers are allowed",
    NUMBER_INVALID: "Number is not valid",
    ALPHA_LETTERS: "Only combinations of numbers and letters are allowed",
    CAPITAL_SYMBOL_SIX:"Password must contain atleast six characters of one capital letter, one number, one symbol",
    NOT_MORE_THAN_99:'Value must be between 1 and 99',
    NUMBER_AND_COMMA:'Only alphabetic characters,numbers and commas are allowed',
    ALPHANUMERIC_WITH_COMMA:'Only alphabetic characters and commas are allowed'
  };
  
  export const REGEX_VALIDATION = {
    NUMBER: /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/,
    EMAIL:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    LETTERS: /^[a-zA-Z]*$/,
    ALPHANUMERIC: /[a-z]/gi,
    ALPHANUMERIC_WITH_SPACE_OR_DASH: /^[a-zA-Z0-9- ]*$/,
    ALPHA_WITH_SPACE: /^[a-zA-Z\s]*$/,
    CAPITAL_SYMBOL_SIX:/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]).{6,}/,
    NOT_MORE_THAN_99:/^(?:[1-9]|[1-8][0-9]|99)$/,
    NUMBER_AND_COMMA:/^[a-zA-Z0-9,]*$/,
    ALPHANUMERIC_WITH_COMMA:/^[a-zA-Z,]+$/
  };
  
  export const REGEX_PATTERNS = {
    EMAIL: {
      value: REGEX_VALIDATION.EMAIL,
      message: ERRORS.EMAIL_INVALID,
    },
    NUMBER: {
      value: REGEX_VALIDATION.NUMBER,
      message: ERRORS.ONLY_NUMBERS,
    },
    LETTERS: {
      value: REGEX_VALIDATION.LETTERS,
      message: ERRORS.ONLY_LETTERS,
    },
    ALPHANUMERIC: {
      value: REGEX_VALIDATION.ALPHANUMERIC,
      message: ERRORS.ALPHA_LETTERS,
    },
    ALPHANUMERIC_WITH_SPACE_OR_DASH: {
      value: REGEX_VALIDATION.ALPHANUMERIC_WITH_SPACE_OR_DASH,
      message: ERRORS.ONLY_LETTERS,
    },
    ALPHA_WITH_SPACE: {
      value: REGEX_VALIDATION.ALPHA_WITH_SPACE,
      message: ERRORS.ONLY_LETTERS,
    },
    CAPITAL_SYMBOL_SIX: {
      value: REGEX_VALIDATION.CAPITAL_SYMBOL_SIX,
      message: ERRORS.CAPITAL_SYMBOL_SIX,
    },
    NOT_MORE_THAN_99: {
      value: REGEX_VALIDATION.NOT_MORE_THAN_99,
      message: ERRORS.NOT_MORE_THAN_99,
    },
    NUMBER_AND_COMMA: {
      value: REGEX_VALIDATION.NUMBER_AND_COMMA,
      message: ERRORS.NUMBER_AND_COMMA,
    },
    ALPHANUMERIC_WITH_COMMA: {
      value: REGEX_VALIDATION.ALPHANUMERIC_WITH_COMMA,
      message: ERRORS.ALPHANUMERIC_WITH_COMMA,
    },
  };
  
  export const generateMaxLength = (maxLength = 10) => {
    return {
      value: maxLength,
      message: `Cannot be greater than ${maxLength} characters`,
    };
  };
  
  export const generateMinLength = (minLength = 10) => {
    return {
      value: minLength,
      message: `Cannot be less than ${minLength} characters`,
    };
  };