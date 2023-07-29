import User from '../models/user';

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ error: 'User not found' });
	} else {
		const match = await user.validatePassword(password);
		if (match) {
			const jwt = user.genrateJWT();
			res.status(200).send({ jwt });
		} else {
			res.status(400).json({ error: 'Invalid password' });
		}
	}
};

const register = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email });
		user.setPassword(password);
		await user.save();
		const jwt = user.genrateJWT();
		res.status(200).send({ jwt });
	} catch (err) {
		res.status(400).json({ error: 'Invalid data' });
	}
};



