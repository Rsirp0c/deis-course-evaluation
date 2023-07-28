/**
 * @class EvalForm
 * @description Generates a EvalForm Model for the database
 * @property {Object} userId - User ID linked to the {@link User} model: optional
 * @property {string} course - Course name: required
 * @property {string} semester - Semester: required
 * @property {string} professor - Professor name: required
 * @property {string} difficulty - Difficulty: required
 * @property {number} rate - Rating: required
 * @property {boolean} attendance - Attendance: required
 * @property {string} gradeRecieved - Grade recieved: optional
 * @property {string} delivery - Delivery: required
 * @property {string} comment - Comment: required
 * @property {Date} date - Date generated automatically
 * @property {string} _id - EvalForm ID generated automatically
 * @example
 * {
 *   "course": "COSI-21B",
 *   "semester": "FALL",
 *   "professor": "Iraklis",
 *   "difficulty": "easy", 
 *   "rate": 5,
 *   "attendance": true,
 *   "delivery": "In-Person",
 *   "comment": "good",
 *   "date": "2023-06-20T12:42:26.673Z",
 *   "_id": "64919ed6dc61bc03321359b9", 
 *   "__v": 0
 * }
 */
import { model, Schema } from 'mongoose';

const evalFormSchema = Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
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

export default model('EvalForm', evalFormSchema);