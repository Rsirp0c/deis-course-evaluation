/**
 * @module EvaluationsController
 */
import Course from '../models/course.js';

/**
 * @todo Implement error handling for edge cases
 * @summary GET api/courses
 * @description Get all course 
 * @sorai910
 * @async
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function index(req, res, next) {
	const course = req.query.course;

	console.log(course);
	let courses = [];
	try {
		if(!course){
			courses = await Course.find({});
			res.locals.courses = courses;
			res.status(200).json(courses);
			next();
		}else{
			courses = await Course.find(
				{$or: [
					{ "course": { $regex: course, $options: "i" }},
					{ "courseTitle": { $regex: course, $options: "i" }},
				]},
			);
			console.log(courses);
			res.status(200).json(courses);

		}
			
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

/**
 * @description Get all evaluations with the given course id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getEvalWithIds(req, res) {
	const { courseId } = req.body;
	try {
		const result = await Course.findById(courseId).populate('comments');
		const evalForms = result.comments;
		if (evalForms.length === 0) {
			res.status(404).json({ error: 'No evaluations' });
			return;
		}
		res.status(200).json(evalForms);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
}

export { index, getEvalWithIds };