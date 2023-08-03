import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ error: 'User not found' });
	} else {
		const match = await user.validatePassword(password);
		if (match) {
			const userJSON = user.toAuthJSON();
			res.status(200).send({ userJSON });
		} else {
			res.status(400).json({ error: 'Invalid password' });
		}
	}
};

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email });
		user.setPassword(password);
		const userJSON = user.toAuthJSON();
		await user.save();
		res.status(200).send({ userJSON });
	} catch (err) {
		res.status(400).json({ error: 'Invalid data', err });
	}
};

export const validateToken = async (req, res) => {
	// const token = req.get('Authorization')
	console.log(req.get('Authorization'))
	// jwt.verify(req.body.token, process.env.JWT_SECRET, function (err, decoded) {
	// });
	res.status(200).json({ message: 'Valid token' });
}
/**
 * Generally, URL parameters are used to identify a specific resource, 
 * while query parameters are used to sort/filter those resources or change the server's behavior in handling the request.
 **/
export const remove = async (req, res) => {
	try {
		console.log("req params", req.params);
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'User deleted', user });
	} catch (err) {
		res.status(400).json({ error: 'Invalid data', err });
	}
}