/* eslint-disable react/prop-types */
import { useParams} from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import format  from '../../utils/formatSentence.js';
import styles from './review.module.css';
import DropdownSelection from './components/DropdownSelection.jsx';
import RatingButtons from './components/RatingButtons.jsx';
import AttendanceButtons from './components/AttendanceButtons.jsx';
import DeliveryButtons from './components/DeliveryButtons.jsx';
import TextBox from './components/TextBox.jsx';
import LetterGradeDropdown from './components/LetterGradeDropdown.jsx';

/**
 * TO DO: write api request to submit form data to backend
 * @returns {JSX.Element} Review page
 */
export default function Review() {
	const { course } = useParams();
	const { idState } = useContext(UserContext);
	const [id, setId] = idState;
	const [submit, setSubmit] = useState(false);
	const [difficulty, setDifficulty] = useState(3);
	const [rate, setRate] = useState(3); 
	const [usefulness, setUsefulness] = useState(3);
	const [attendance, setAttendance] = useState(true);
	const [delivery, setDelivery] = useState('In Person');
	const [grade, setGrade] = useState(0);
	const [professor, setProfessor] = useState('');
	const [semester, setSemester] = useState('');
	const [comment, setComment] = useState('');
	const { courseFormatted, courseTitleFormatted} = format(course)
	

	// set professor options from course info stored in session storage
	const courseInfo = JSON.parse(sessionStorage.getItem('courseInfo'));
	const courseId = courseInfo._id;
	const {professors} = courseInfo;
	Object.keys(professors).forEach((key) => {
		professors[key] = { label: professors[key].name, value: professors[key].name };
	});

	// TO DO: should i use these default values or fetch them dynamically from the backend?
	const term = [
		{ label: 'FALL 2021', value: 'FALL 2021' },
		{ label: 'SPRING 2021', value: 'SPRING 2021' },
		{ label: 'FALL 2020', value: 'FALL 2020' },
		{ label: 'SPRING 2020', value: 'SPRING 2020' },
		{ label: 'FALL 2019', value: 'FALL 2019' },
		{ label: 'SPRING 2019', value: 'SPRING 2019' },
		{ label: 'FALL 2018', value: 'FALL 2018' },
		{ label: 'SPRING 2018', value: 'SPRING 2018' },
		{ label: 'FALL 2017', value: 'FALL 2017' },
	]

	const letterGrades = [
		{ label: 'A+', value: 13 },
		{ label: 'A', value: 12 },
		{ label: 'A-', value: 11},
		{ label: 'B+', value: 10 },
		{ label: 'B', value: 9 },
		{ label: 'B-', value: 8 },
		{ label: 'C+', value: 7 },
		{ label: 'C', value: 6 },
		{ label: 'C-', value: 5 },
		{ label: 'D+', value: 4 },
		{ label: 'D', value: 3 },
		{ label: 'D-', value: 2 },
		{ label: 'F', value: 1 },
		{ label: 'Prefer not to say', value: 0}
	];

	function handleSubmit(event) {
		event.preventDefault();
		console.log('submitting form')
		const commentString = comment.comment
		const courseIdName = {
			id: courseId,
			name: courseFormatted
		}
		fetch('http://localhost:3000/api/evaluations/forms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: id || 'anonymous',
				courseIdName,
				difficulty,
				rate,
				usefulness,
				attendance,
				delivery,
				grade,
				professor,
				semester,
				commentString,
			})
		}).then((response) => response.json())
			.then((data) => {
				if(!data.error){
					setSubmit(true)
				}else{
					console.log(data.error)
				}
			})
	}

	function handleProfessorChange(event, value) {
		setProfessor(value)
	}
	function handleSemesterChange(event, value) {
		Object.keys(term).forEach((key) => {
			if(term[key].value === value){
				setSemester(value)
			}
		})
			
		// setSemester(value)
	}
	function handleCommentChange(event) {
		setComment({...comment, comment: event.target.value})
	}
	function handleGradeChange(event, value) {
		setGrade(value.value)
	}

	if(submit){
		return (
			<div className={styles.submittedTextContainer}>
					<h1 className={styles.submittedText}>
						Thank you for your submission!
					</h1>
			</div>
		)
	}
	return (
		<div className={styles.review}>
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>
					<span className={styles.titleSpan}>Rate: </span>
					{courseFormatted} {courseTitleFormatted}
				</h1>
			</div>
			<div className={styles.reviewContainer}>
				<form className={styles.form}>
					<div className={styles.dropdownWrapper}>
						<DropdownSelection options={term} label="Select Term" handleChange={handleSemesterChange} />
						<DropdownSelection options={professors} label="Select Professor" handleChange={handleProfessorChange}/>
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Rate the difficulty of this course</h2>
						<RatingButtons state={difficulty} setState={setDifficulty} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Rate the usefulness of this course</h2>
						<RatingButtons state={usefulness} setState={setUsefulness} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Rate the overall quality of the course</h2>
						<RatingButtons state={rate} setState={setRate} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Attendance is requried</h2>
						<AttendanceButtons state={attendance} setState={setAttendance} />
					</div>
				
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Delivery mode</h2>
						<DeliveryButtons state={delivery} setState={setDelivery} />
					</div>
					<div className={styles.ratingWrapper}>
						<h2 className={styles.ratingDesc}>Your grade (optional)</h2>
						<LetterGradeDropdown options={letterGrades} label="grade" handleGradeChange={handleGradeChange} />
					</div>
					<div className={styles.dividerContainer}><div className={styles.divider} /></div>

					<div className={styles.commentWrapper}>
						<h2 className={styles.ratingDesc}>Your Comment:</h2>
						<div className={styles.textBoxContainer}>
							<TextBox comment={comment} handleCommentChange={handleCommentChange} />
						</div>
					</div>
					<div className={styles.submit}>
						<button className={styles.submitButton} type="submit" onClick={handleSubmit} >Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}
