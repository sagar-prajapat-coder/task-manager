import { validationResult } from "express-validator";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import ResponseBuilder from "../utils/ResponseBuilder.js";
import UserResource from "../resource/user.resource.js";
import { errorHandler } from "../middleware/errorHandler.js";




export const AuthController = {

    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return ResponseBuilder.error(errors.array()[0].msg, 400).build(res);
        }
        try {
            const { name, email, password, phone } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return ResponseBuilder.error("User already exists", 400).build(res);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ 
                name,
                email,
                password: hashedPassword,
                phone,
            });
            await newUser.save();

            const userData = new UserResource(newUser).toArray();
            return ResponseBuilder.success( userData,"User registered successfully",201).build(res);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
};