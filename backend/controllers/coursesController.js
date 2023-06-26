/**
 * @module EvaluationsController
 */
import Course from '../models/course';

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
	try {
		const courses = await Course.find({});
		res.locals.courses = courses;
		res.status(200).json(courses);
		next();
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