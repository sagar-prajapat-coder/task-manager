import { validationResult } from "express-validator";
import { errorHandler } from "../middleware/errorHandler.js";
import Task from "../model/task.js";
import { messages } from "../utils/message.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";
import sendEmail from "../mail/mailer.js";
import User from "../model/user.js";



export const TaskController = {
    store: async (req, res) => {
  const { title, description, priority, due_date, assign_to, comments, _id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseBuilder.error(errors.array()[0].msg, 400).build(res);
  }

  try {
    const data = { title, description, priority, due_date, assign_to, comments };
    const userInfo = await User.findById(assign_to);

    if (!userInfo) {
      return ResponseBuilder.error("Assigned user not found", 404).build(res);
    }

    let emailSubject, emailBody, task;

    if (_id) {
      const existingTask = await Task.findById(_id);
      if (!existingTask) {
        return ResponseBuilder.error(messages.taskNotFound, 404).build(res);
      }

      task = await Task.findByIdAndUpdate(_id, data, { new: true });
      emailSubject = "Task Updated";
      emailBody = `Hi ${userInfo.name},\n\nThe task "${task.title}" has been updated.\n\nThanks,\nTeam`;
    } else {
      task = await Task.create(data);
      emailSubject = "New Task Assigned";
      emailBody = `Hi ${userInfo.name},\n\nYou have been assigned a new task titled "${task.title}".\n\nThanks,\nTeam`;
    }

    try {
      await sendEmail(userInfo.email, emailSubject, emailBody);
      console.log("Email sent to:", userInfo.email);
    } catch (mailErr) {
      console.error("Failed to send email:", mailErr.message);
    }

    return ResponseBuilder.success(task, _id ? messages.taskUpdated : messages.taskSaved, _id ? 200 : 201).build(res);

  } catch (error) {
    errorHandler(error, req, res);
  }
}




};