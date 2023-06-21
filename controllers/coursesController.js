import { find } from '../models/course';
import { findByIdAndUpdate } from '../models/user';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';


function index(req, res, next) {
	find({})
		.then((courses) => {
			res.locals.courses = courses;
			next();
		})
		.catch((error) => {
			console.log(`Error fetching courses: ${error.message}`);
			next(error);
		});
}
function respondJSON(req, res) {
	res.json({
		status: OK,
		data: res.locals,
	});
}
function errorJSON(error, req, res) {
	let errorObject;
	if (error) {
		errorObject = {
			status: INTERNAL_SERVER_ERROR,
			message: error.message,
		};
	} else {
		errorObject = {
			status: INTERNAL_SERVER_ERROR,
			message: 'Unknown Error.',
		};
	}
	res.json(errorObject);
}
function join(req, res, next) {
	let courseId = req.params.id, currentUser = req.user;
	if (currentUser) {
		findByIdAndUpdate(currentUser, {
			$addToSet: { courses: courseId },
		})
			.then(() => {
				res.locals.success = true;
				next();
			})
			.catch((error) => {
				next(error);
			});
	} else {
		next(new Error('User must log in.'));
	}
}

export { index, respondJSON, errorJSON, join };