const validateName = (value) => {
    return value.split(" ").length >= 2;
};

const validateEmail = (value) => {
    return RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value);
};

const validatePassword = (value) => {
    return value.length >= 8;
};

const validateString = (value) => {
    return !/[0-9]/.test(value);
};

const emptyField = (value) => {
    return Boolean(value);
};

const validatePositiveAmount = (value) => {
    return value > 0;
};

const validateDate = (value) => {
    return !isNaN(Date.parse(value));
};

const validateNumber = (value) => {
    return !isNaN(value);
};

export const ERRORS = {
    FULLNAME_LENGTH: {
        message: "*Please enter a valid first name and last name.",
        id: 1,
        property: "fullname",
        validate: validateName,
    },
    INVALID_EMAIL: {
        message: "*Please enter a valid email address.",
        id: 2,
        property: "email",
        validate: validateEmail,
    },
    INVALID_PASSWORD: {
        message: "*Please enter a password with at least 8 characters.",
        id: 3,
        property: "password",
        validate: validatePassword,
    },
    INVALID_FULLNAME: {
        message: "*Please enter a valid fullname without numbers.",
        id: 4,
        property: "fullname",
        validate: validateString,
    },
    EMPTY_FIELD: {
        message: "*Please enter a valid field.",
        id: 5,
        validate: emptyField,
    },
    INVALID_AMOUNT: {
        message: "*Plase enter a positive amount greater than 0.",
        id: 6,
        property: "amount",
        validate: validatePositiveAmount,
    },
    INVALID_DATE: {
        message: "*Please enter a valid date.",
        id: 7,
        property: "date",
        validate: validateDate,
    },
    INVALID_SOURCE: {
        message: "*Please select a source.",
        id: 8,
        property: "source",
        validate: emptyField,
    },
    INVALID_CATEGORY: {
        message: "*Please select a category.",
        id: 9,
        property: "category",
        validate: emptyField,
    },
    INVALID_DESCRIPTION: {
        message: "*A short description will help you remember this transaction.",
        id: 10,
        property: "description",
        validate: emptyField,
    },
    IS_NOT_A_NUMBER: {
        message: "*Please enter a valid number.",
        id: 11,
        property: "amount",
        validate: validateNumber,
    },
    AMOUNT_CERO: {
        message: "*Please enter a valid amount.",
        id: 12,
        property: "amount",
        validate: validatePositiveAmount,
    },
    INVALID_PASSWORD: {
        message: "*Please enter a password with at least 8 characters.",
        id: 3,
        property: "password_confirm",
        validate: validatePassword,
    },
};
const handleErrors = (from, value) => {
    for (const key in ERRORS) {
        if (ERRORS[key].property === from) {
            if (!ERRORS[key].validate(value)) {
                return ERRORS[key];
            }
        }
    }
};

export const validateFields = (fields) => {
    const errors = [];
    for (const value in fields) {
        if (!value) {
            errors.push(ERRORS.EMPTY_FIELD.message);
        } else {
            errors.push(handleErrors(value, fields[value]));
        }
    }

    return errors.filter((error) => error !== undefined);
};
