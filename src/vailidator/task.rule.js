import { body } from "express-validator";

export const taskValidator = [

    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

    body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

    body("priority")
    .trim()
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be one of the following: low, medium, high"),
    
    body("due_date")
    .trim()
    .notEmpty()
    .withMessage("Due date is required")
    .isDate()
    .withMessage("Due date must be a valid date")
    .custom((value) => {
        const today = new Date();
        if (new Date(value) < today) {
            throw new Error("Due date must be in the future");
        }
        return true;
    }),

    body("assign_to")
    .trim()
    .notEmpty()
    .withMessage("Assign to is required")
    .isMongoId()
    .withMessage("Assign to must be a valid MongoDB ObjectId"),

    body("comments")
    .optional()
    .trim()
    .isString()
    .withMessage("Comments must be a string")
    .isLength({ max: 500 })
    .withMessage("Comments must be at most 500 characters long"),

    body("_id")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Task ID must be a valid MongoDB ObjectId"),
    


];