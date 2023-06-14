import { Schema, model } from "mongoose";

const courseSchema = Schema({
  course: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  professors: {
    type: Array,
    required: true,
  },
  comments: {
    type: Array,
  },
  gradeAverage: {
    type: Number,
  },
  ratingAverage: {
    type: Number,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: Array,
    required: true,
  }
});

export default model("Course", courseSchema);

