
import { model, Schema } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = Schema(
	{
		name: {
			type: Object,
			first: {
				type: String,
				trim: true,
			},
			last: {
				type: String,
				trim: true,
			},
			default: {}
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			match: [/\S+@\S+\.\S+/, 'is invalid']
		},
		evals: [{ type: Schema.Types.ObjectId, ref: 'EvalForm' }],
		likedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
		provider: String,
		hash: String,
		salt: String,
	},
	{
		timestamps: true, //Dates might be wrong, check this!!!!!
	}
);
/**************************
 * Normal user methods 
 **************************/
userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
	const today = new Date();
	const secret = process.env.JWT_SECRET; // Create a secret for the JWT in your env file
	const options = {
		expiresIn: '14d',
	};
	return jwt.sign({
		id: this._id,
		username: this.name,
	}, secret, options);
};

// Return JSON representation of user to pass to frontend
userSchema.methods.toAuthJSON = function () {
	return {
		email: this.email,
		username: this.username,
		id: this._id,
		token: this.generateJWT(),
	};
};

/**************************
 * Google OAuth2.0 methods 
 **************************/

// Add a custom static method to the schema to save google account data
userSchema.statics.createAndUpdateUser = async function (data) {
	const filter = { email: data.email };
	if (User.exists(filter)) {
		await User.findOneAndUpdate(filter, { name: { first: data.given_name, last: data.family_name } });
	} else {
		await User.create(date);
	}
};



export default model('User', userSchema);
