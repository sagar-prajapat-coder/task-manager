import { validationResult } from "express-validator";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import ResponseBuilder from "../utils/ResponseBuilder.js";
import UserResource from "../resource/user.resource.js";
import { errorHandler } from "../middleware/errorHandler.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();




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
    },

      login: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return ResponseBuilder.error(errors.array()[0].msg, 400).build(res);
        }
        try{
            const {email, password} = req.body;
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
      
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
        
              return ResponseBuilder.successMessage('login success', 200, { token }).build(res);

        }catch(error){
             errorHandler(error, req, res);
        }
    },
};