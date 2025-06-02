import moment from "moment";
import { createFileUrl } from "../utils/helper.js";

export default class TaskResource {

    constructor(task) {
        this.task = task;
    }


    toArray() {
        return {
            _id: this.task._id,
            title: this.task.title,
            description: this.task.description,
            priority: this.task.priority,
            assign_to: this.task.assign_to,
            comments: this.task.comments,
            attachments: this.task.file_attachment.map((attach) =>
                createFileUrl(process.env.TASK_DOCUMENTS, attach)
            ),
            due_date: moment(this.task.due_date).format("DD-MM-YYYY"),
            createdAt: moment(this.task.createdAt).format("DD-MM-YYYY"),

        };
    }

    static collection(tasks) {
        return tasks.map((task) => new TaskResource(task).toArray());
    }

    toJson() {
        return JSON.stringify(this.toArray());
    }
}