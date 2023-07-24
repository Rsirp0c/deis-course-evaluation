
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Middlewares
 */
app.use(cors());
app.use(morgan('dev'));
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * Set up mongodb connection and start the server
 */
mongoose.
	connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-eval', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`mongodb is connected on location: ${mongoose.connection.host}:${mongoose.connection.port}`);
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
	})
	.catch((err) => {
		console.log(`mongodb connection failed ${err}`);
	});




app.use('/', router);
