import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    due_date: {
        type: Date,
        required: true,
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: {
        type: String,
        default: null
    }

}, 
    { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;