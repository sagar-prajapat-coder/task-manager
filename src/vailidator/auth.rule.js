import { body } from "express-validator";


export const registerValidator = [

    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("phone").notEmpty().withMessage("Phone number is required").isMobilePhone('en-IN').withMessage("Invalid phone number format"),

];

export const loginValidator = [
    body("email").trim().notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format"),
    body("password").trim().notEmpty().withMessage("Password is required"),
];