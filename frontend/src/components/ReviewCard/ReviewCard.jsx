/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import styles from './ReviewCard.module.css'
import convertToLetterGrade from '../../utils/convertToLetterGrade'
import RatingBox from '../CourseReviewCard/RatingBox.jsx'



export default function ReviewCard({review}){
	
	const formattedDate = format(new Date(review.createdAt), 'MMMM do, yyyy');
	let attendance = ''
	if(review.attendance === 'false'){
		attendance = 'Not Required'
	} else {
		attendance = 'Mandatory'
	}

	return (
		<div className={styles.card}>
			<RatingBox ratingAverage={review.rate} />
			<div className={styles.body}>
				<div className={styles.contents}>
					<p className={styles.date}>{formattedDate}</p>
					<p className={styles.course}>
						<span className={`${styles.courseFont} ${styles.bold}`}>{review.course.name}</span> with professor <span className={styles.bold}>{review.professor}</span>
					</p>
					<div className={styles.infoContainer}>
						<p className={styles.info}>
							Term: <span className={styles.bold}>{review.semester}</span>
						</p>
						<p className={styles.info}>
							Delivery: <span className={styles.bold}>{review.delivery}</span>
						</p>
						<p className={styles.info}>
							Attendance: <span className={styles.bold}>{attendance}</span>
						</p>
						<p className={styles.info}>
							Difficulty: <span className={styles.bold}>{review.difficulty}</span>
						</p>
						<p className={styles.info}>
							Usefulness: <span className={styles.bold}>{review.usefulness}</span>
						</p>
						<p className={styles.info}>
							Grade: <span className={styles.bold}>{convertToLetterGrade(review.grade)}</span>
						</p>
					
					</div>
					<p className={styles.comment}>Comment on the course: </p>
					<p className={styles.commentText}>{review.comment}</p>
					
				</div>
			
			</div>
		</div>
	)
}