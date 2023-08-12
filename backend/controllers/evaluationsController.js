/**
 * @module EvaluationsController
 */
import EvalForm from '../models/evalForm.js';
import Course from '../models/course.js';
import User from '../models/user.js';

/**
 * Gets the parameters from the request body and returns them in an JSON object
 * @MingCWang
 * @param {Object} body - request body
 * @returns {{course: string, semester: string, professor: string, difficulty: number, rate: number, attendance: string, gradeRecieved: string, delivery: string, comment: string}} - JSON object with the parameters
 */
const getEvalFormParams = ({ courseId, semester, professor, difficulty, rate, usefulness, attendance, grade, delivery, commentString }) => {
	return {
		course: courseId,
		semester,
		professor,
		difficulty,
		rate, 
		usefulness,
		attendance,
		grade,
		delivery,
		comment: commentString
	};
};

const updateCourseAverages = async (course, savedEvalForm) => {
	// Do the score calculations here. Note: calculate after the request is sent to the client
	const numComments = course.comments.length;
	course.ratingAverage = Math.round((course.ratingAverage * numComments + savedEvalForm.rate) / (numComments + 1));
	course.difficultyAverage = Math.round((course.difficultyAverage * numComments + savedEvalForm.difficulty) / (numComments + 1));
	course.usefullnessAverage = Math.round((course.usefullnessAverage * numComments + savedEvalForm.usefulness) / (numComments + 1));

	// If the grade is not null, then update the gradeAverage
	if (savedEvalForm.grade !== 0) {
		console.log(course.gradeAverage)
		const numGrades = course.gradeAverage.numGrades;
		course.gradeAverage.grade = Math.round((course.gradeAverage.grade * numGrades + savedEvalForm.grade) / (numGrades + 1));
		course.gradeAverage.numGrades = numGrades + 1;
	}
	const savedCourse = await course.save();
	console.log({ savedCourse });
}
/**
 * @summary POST api/v1/evaluations/forms
 * @description Creates a new EvalForm
 * 
 * Example request body:
 * 
 * {
 *    "course": "COSI-103",
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
		const {courseId, userId} = req.body;
		// save evalform with the req aruguments 
		const newEvalForm = new EvalForm(getEvalFormParams(req.body));
		const savedEvalForm = await newEvalForm.save();
		// add evalform id to course comments with the matching course id 
		const evalFormId = savedEvalForm._id;
		const course = await Course.findByIdAndUpdate(courseId, { $push: { comments: evalFormId } }, { new: true });
		// add evalform id to user evals with the matching user id
		if (userId !== 'anonymous'){
			const user = await User.findByIdAndUpdate(userId, { $push: { evals: evalFormId } }, { new: true });
			console.log({user})
		}
		console.log({savedEvalForm, course})
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


export { create, read};
