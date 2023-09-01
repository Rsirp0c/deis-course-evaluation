/**
 * @module EvaluationsController
 */
import EvalForm from '../models/evalForm.js';
import Course from '../models/course.js';
import User from '../models/user.js';
import { updateCourseAverages, getEvalFormParams } from '../utils/evaluationUtils.js';

/**
 * @summary POST api/v1/evaluations/forms
 * @description Creates a new EvalForm
 * 
 * Example request body:
 * 
 * {
 *    "courseIdName": {ObjectId(asdfagqerfas124), "COSI-10A"}
 *    "semester": "SPRING",
 *    "professor": "Timothy Hickey",
 *    "difficulty": "4",
 *    "rate": "4", 
 *    "usefulness": 5,
 *    "attendance": true,
 *    "grade-received": "A",
 *    "delivery": "In-Person", 
 *    "comment": "good"
 * }
 * @MingCWang 
 * @async
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Object} 201 - JSON object with the created EvalForm
 * @returns {Object} 500 - JSON object with the error message
 */
async function create(req, res) {
	try {
		const {courseIdName, userId} = req.body;
		console.log({courseIdName})
		// save evalform with the req aruguments 
		const newEvalForm = new EvalForm(getEvalFormParams(req.body));
		const savedEvalForm = await newEvalForm.save();
		// add evalform id to course comments with the matching course id 
		const evalFormId = savedEvalForm._id;
		const course = await Course.findByIdAndUpdate(courseIdName.id, { $push: { comments: evalFormId } }, { new: true });
		console.log({course})
		// add evalform id to user evals with the matching user id
		if (userId !== 'anonymous'){
			const user = await User.findByIdAndUpdate(userId, { $push: { evals: evalFormId } }, { new: true });
		}
		console.log({savedEvalForm})
		try{
			await updateCourseAverages(course, savedEvalForm);
		}catch(err){
			throw err;
		}
		res.status(201).json(savedEvalForm);

	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
}

/**
 * @todo Implement error handling for edge cases
 * @summary GET api/v1/evaluations?course=course&semester=semester&professor=professor
 * @description Gets all EvalForms filtered with the given parameters    
 * @MingCWang
 * @async
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function read(req, res) {

	const { course, semester, professor } = req.query;
	let evalForms = [];
	try {
		if (semester) {
			evalForms = await EvalForm.find({ course: course, semester: semester });
		} else if (professor) {
			evalForms = await EvalForm.find({ course: course, professor: professor });
		} else {
			evalForms = await EvalForm.find({ course: course });
		}
		res.status(200).json(evalForms);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

async function readWithIds(req, res) {
	const { userId } = req.body;
	const user = await User.find({ _id: userId });
	console.log(user);
	console.log(user[0].evals);
	const ids = user[0].evals;
	let evalForms = [];
	try {
		evalForms = await EvalForm.find({ _id: { $in: ids } });
		res.status(200).json(evalForms);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export { create, read, readWithIds };
