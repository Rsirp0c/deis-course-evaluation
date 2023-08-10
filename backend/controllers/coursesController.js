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
 * @todo optimization for error handling; add more filter for the sorting functionality on the main page? or create another function
 * @summary GET api/courses/courseId
 * @description Get a specific course by courseid    
 * @sorai910
 * @async
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function display(req, res, next) {
	try {
		const course = await Course.findById(req.param._id);

		if (!course) {
			res.status(404).json({ error: 'Course not found' });
			return;
		}

		res.locals.course = course;
		res.status(200).json(course);
		next();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
}

export { index, display };