const yup = require ("yup")

const userValidationSchema = yup.object().shape({
    userName: yup.string().min(3, "username is to short").required("username is required"),
    email: yup.string().email("invalid email").required("email is required"),
    password:yup.string().min(6, "password must have at least eigth characters").required("password is required")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=<>?]).{8,}$/, "password must contain one uppercase letter, one lowercase, one digit (0-9),  one special character, must be at least 8 characters")
})

module.exports = userValidationSchema