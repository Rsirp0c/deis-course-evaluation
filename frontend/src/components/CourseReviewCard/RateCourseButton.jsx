import { useNavigate } from 'react-router-dom';
import styles from './RateCourseButton.module.css';

export default function RateCourseButton({course, isCourse}) {
	const navigate = useNavigate();

	function handleRateCourse() {
        const courseInfo= `${course.course} ${course.courseTitle}`;
		sessionStorage.setItem('courseInfo', JSON.stringify(course));
		
        navigate(`/review/${course._id}`);
    }

	let rateButtonStyle 
	if (isCourse) {
		rateButtonStyle = styles.rateButtonCourse
	} else {
		rateButtonStyle = styles.rateButton
	}

	return (
		<button
			type='button'
			className={rateButtonStyle}
			onClick={handleRateCourse}
		>
			Rate this course
		</button>
	);
}