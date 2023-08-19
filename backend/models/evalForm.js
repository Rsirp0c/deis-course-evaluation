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
 *   "course": ObjectId("dsagfdfgdsfgdfsg"),
 *   "semester": "FALL",
 *   "professor": "Iraklis",
 *   "difficulty": "easy", 
 *   "usefulness": 5,
 *   "attendance": true,
 *   "delivery": "In-Person",
 *   "comment": "good",
 *   "date": "2023-06-20T12:42:26.673Z",
 *   "_id": "64919ed6dc61bc03321359b9", 
 *   "__v": 0
 * }
 */
import { model, Schema } from 'mongoose';

const evalFormSchema = Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		// change to course id so we can link to course model
		// why does the course field automatically includes the evalform _id again like this 
		//  course: {
		// 	id: new ObjectId("64dee5847d7bf2ac18f32a29"),
		// 	name: 'COSI 10A ',
		// 	_id: new ObjectId("64e0771f3e9e76b63b23aeda")
		//   },
		
		course: {
			type:{
				id:{
					type: Schema.Types.ObjectId,
					ref: 'Course',
					required: true
				},
				name:{
					type: String,
					requried: true
				}
			}
			
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
			type: Number,
			required: true
		},
		rate: {
			type: Number,
			required: true
		},
		usefulness: {
			type: Number,
			required: true
		},
		attendance: {
			type: Boolean,
			required: true
		},
		grade: {
			type: Number,
		},
		delivery: {
			type: String,
			required: true
		},
		comment: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
	});


export default model('EvalForm', evalFormSchema);