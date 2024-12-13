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
    return value;
};

export const ERRORS = {
    FULLNAME_LENGTH: {
        message: "*Please enter a valid fullname.",
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
        validate: validateString,
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

    console.log("validateFields", errors);
    return errors.filter((error) => error !== undefined);
};
