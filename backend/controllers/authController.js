import User from '../models/user.js';

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ error: 'User not found' });
	} else {
		const match = await user.validatePassword(password);
		if (match) {
			const jwt = user.generateJWT();
			res.status(200).send({ jwt });
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
		const jwt = user.generateJWT();
		await user.save();
		res.status(200).send({ jwt });
	} catch (err) {
		res.status(400).json({ error: 'Invalid data', err });
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const userJSON = user.toAuthJSON();
		res.status(200).json({ user: userJSON });
	} catch (err) {
		res.status(400).json({ error: 'Invalid data', err });
	}
};

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