import Course from '../models/course.js';
import User from '../models/user.js';

/**
 * This controller adds a course to the likedCourses array of a user when the user clicks the like button
 * 
 * Example request body:
 * {
 *     "courseId": "64d1f443ecc04ec2ba2f455e",
 *     "userId": "64c615e6e1f19654ea691ab6"
 * }
 * @param {*} req 
 * @param {*} res 
 */
export const add = async (req, res) => {
	const { likedCoursesIds, userId } = req.body;
	console.log(likedCoursesIds);
	try {
		const result = await User.findByIdAndUpdate(userId, { likedCourses: likedCoursesIds }, { new: true })
		if(result) res.status(200).json(result);
		else res.status(404).json({ error: 'Add liked course failed'});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

/**
 * This controller removes a course from the likedCourses array of a user when the user clicks the like button
 * @param {*} req
 * @param {*} res
 */
export const remove = async (req, res) => {
	const { courseId } = req.body;
	const { userId } = req.body;
	try {
		const result = await User.findByIdAndUpdate(userId, { $pull: { likedCourses: courseId } }, { new: true })
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

/**
 * 
 * This controller returns the likedCourses array of a user
 * @param {*} req
 * @param {*} res
 */
export const get = async (req, res) => {
	const { userId } = req.body;
	try {
		const result = await User.findById(userId).select('likedCourses');
		const likedCourses = result.likedCourses;
		if (likedCourses.length === 0) {	
			res.json({ error: 'No liked courses' });
			return;
		}
		res.status(200).json(likedCourses);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

/**
 * This controller returns the courses with the given ids
 * @param {*} req 
 * @param {*} res 
 */
export const getWithIds = async (req, res) => {
	const { likedCoursesIds } = req.body;
	try {
		const result = await Course.find({ _id: { $in: likedCoursesIds } });
		res.status(200).json(result);
	}catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};