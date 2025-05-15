import { errorHandler } from "../middleware/errorHandler.js";
import User from "../model/user.js";
import UserResource from "../resource/user.resource.js";
import { messages } from "../utils/message.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";



export const UserController = {

    getUser:async (req, res) => {
        try{
            const users = await User.find({_id:{ $ne: req.user._id }}).sort({createdAt:-1});
            if(!users){
                return ResponseBuilder.error(messages.userNotFound,404,users).build(res);
            }
            const userData = UserResource.collection(users);
                return ResponseBuilder.success(userData,messages.userList,200).build(res);
        }catch(error){
            errorHandler(error, req, res);
        }
    }
};