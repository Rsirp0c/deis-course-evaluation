/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import styles from './review.module.css';
import { useState } from 'react';

/**
 * Formats the course name passed through URL to be title case
 * @param {} str 
 * @returns 
 */
function format(str) {

	const smallWordsSet = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet']);

	const words = str.split(' ');

	let newStr = '';

	for (let i = 0; i < words.length; i++) {
		if (i === 0 || i === 1) {
			newStr += words[i].toUpperCase() + ' ';
		} else {
			const word = words[i].toLowerCase()
			if (smallWordsSet.has(word) && i !== 2) {
				newStr += word.toLowerCase() + ' ';
			} else {
				newStr += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
			}
		}

	}
	return newStr;
}

export default function Review() {
	const { course } = useParams();
	const [difficulty, setDifficulty] = useState(3);
	const [quality, setQuality] = useState(3);
	const [attendance, setAttendance] = useState(1);
	const numRatingButtons = new Array(1, 2, 3, 4, 5);


	function RatingButtons({ state, setState }) {

		function RatingButton({ rate, state, setState }) {
			function handleOnClick(e) {
				e.preventDefault();
				if (rate !== state) setState(rate);
			}
			let buttonStyle = rate === state ? styles.ratingButtonSelected : styles.ratingButton;
			if (rate === 1)
				buttonStyle = `${buttonStyle} ${styles.firstRatingButton}`;
			else if (rate === 5) {
				buttonStyle = `${buttonStyle} ${styles.lastRatingButton}`;
			}
			return <button className={buttonStyle} onClick={handleOnClick}></button>
		}
		return (
			<div className={styles.ratingButtonsWrapper}>
				<p className={styles.levelText}>Awful</p>
				{numRatingButtons.map((rate) => (
					<RatingButton key={rate} rate={rate} state={state} setState={setState} />
				))}
				<p className={styles.levelText}>GOAT</p>
			</div >
		)
	}
	/**
	 * Not DRY enough, cleaan up this later
	 * @param {*} param0 
	 * @returns 
	 */
	function AttendanceButtons({ state, setState }) {
		function AttendanceButton({ value, state, setState }) {
			function handleOnClick(e) {
				e.preventDefault();
				if (value !== state) setState(value);
			}
			let buttonStyle = value === state ? styles.attendanceButtonSelected : styles.attendanceButton
			if (value === 1) {
				buttonStyle = `${buttonStyle} ${styles.firstAttendanceButton}`;
				return <button className={buttonStyle} onClick={handleOnClick}>Yes</button>
			}
			else if (value === 2) {
				buttonStyle = `${buttonStyle} ${styles.lastAttendanceButton}`;
				return <button className={buttonStyle} onClick={handleOnClick}>No</button>
			}

		}
		return (
			<div className={styles.ratingButtonsWrapper}>
				<AttendanceButton value={1} state={state} setState={setState} />
				<AttendanceButton value={2} state={state} setState={setState} />
			</div >
		)
	}

	return (
		<div className={styles.review}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}><span className={styles.titleSpan}>Rate: </span>{format(course)}</h1>
			</div>
			<div className={styles.reviewContainer}>
				<form className={styles.form}>
					<div className={styles.dropdownWrapper}>
						<button>Select Semester</button>
						<button>Select Professor</button>
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Rate the difficulty of this course</h2>
						<RatingButtons state={difficulty} setState={setDifficulty} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Rate the quality of this course</h2>
						<RatingButtons state={quality} setState={setQuality} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2>Attendance is requried</h2>
						<AttendanceButtons state={attendance} setState={setAttendance} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2>Your GPA (optional)</h2>
					</div>
					<div className={styles.ratingWrapper}>
						<h2>Delivery mode</h2>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.commentWrapper}>
						<h2 className={styles.ratingDesc}>Your Comment:</h2>
						<textarea placeholder="Write a comment..."></textarea>
					</div>
					<div className={styles.submit}>

					</div>
				</form>
			</div>
		</div>
	)
}