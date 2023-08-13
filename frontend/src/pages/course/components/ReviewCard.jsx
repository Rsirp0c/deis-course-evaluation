/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import styles from './ReviewCard.module.css'
import convertToLetterGrade from '../../../utils/convertToLetterGrade'
import RatingBox from '../../../components/CourseReviewCard/RatingBox.jsx'



export default function ReviewCard({review, course}){
	
	const formattedDate = format(new Date(review.createdAt), 'MMMM do, yyyy');
	
	return (
		<>
	
		<div className={styles.review}>
			<p>{review.comment}</p>
			<p>{review.difficulty}</p>
			<p>{review.usefulness}</p>
			<p>{review.rate}</p>
			<p>{convertToLetterGrade(review.grade)}</p>
			<p>{review.professor}</p>
			<p>{review.semester}</p>
		</div>



		<div className={styles.card}>
			<RatingBox ratingAverage={review.rate} />
			<div className={styles.body}>
				<div className={styles.contents}>
					<p className={styles.date}>{formattedDate}</p>
					<p className={styles.course}>
						<span className={`${styles.courseFont} ${styles.bold}`}>{course}</span> with professor <span className={styles.bold}>{review.professor}</span>
					</p>
				</div>
			
			</div>
		</div>


		</>
	)
}