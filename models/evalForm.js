import { model, Schema } from "mongoose";

const evalFormSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    attendance: {
        type: Boolean,
        required: true
    },
    gradeRecieved: {
        type: String
    },
    delivery: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

export default model("EvalForm", evalFormSchema);