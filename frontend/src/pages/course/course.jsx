

import { useState, useEffect } from 'react';
import format from '../../utils/formatSentence.js'
import styles from './course.module.css'
import ReviewCard from './components/ReviewCard.jsx';
import fetchReviews from '../../services/fetchReviews.js';
import convertToLetterGrade from '../../utils/convertToLetterGrade.js';
import LikeButton from '../../components/CourseReviewCard/LikeButton.jsx';
import RateCourseButton from '../../components/CourseReviewCard/RateCourseButton.jsx';

export default function Course() {

	const [reviews, setReviews] = useState([]);
	const courseInfo = JSON.parse(localStorage.getItem('courseInfo'));
	const { 
		_id, 
		course, 
		courseTitle, 
		courseDescription, 
		difficultyAverage, 
		ratingAverage, 
		gradeAverage, 
		usefullnessAverage, 
		prerequisites, 
		professors } = courseInfo;
	const { courseFormatted, courseTitleFormatted} = format(`${course} ${courseTitle}`)
	console.log(gradeAverage)
	console.log(professors)
	
	useEffect(()=>{
		fetchReviews(setReviews, _id);
	}, [])
	

  	return (
    	<div>
			<div className={styles.container}>
				<div className={styles.courseTitleContainer}>
					<div className={styles.upperHalf}>
						<p className={styles.course}><span className={styles.bold}>{courseFormatted}</span> {courseTitleFormatted}</p>
						<LikeButton courseId={_id} className={styles.likeButton} isCourse/>
					</div>
					<div className={styles.lowerHalf}>
						<div className={styles.profContainer}>
							Instructors: {professors.map((professor) => (
								<p className={styles.prof} key={professor._id}>{professor.name},</p>
							))}
						</div>
						<RateCourseButton course={courseInfo} isCourse/>
					</div>

				</div>
				<div className={styles.courseInfoContainer}>
					<div className={styles.logistics}>
						<p>{difficultyAverage}</p>
						<p>{usefullnessAverage}</p>
						<p>{ratingAverage}</p>
						<p>{convertToLetterGrade(gradeAverage.grade)}</p>
					</div>
					<div className={styles.courseDescriptionContainer}>
						<div className={styles.courseDescription}>
							<p className={styles.prerequisite}><span className={styles.bold}>Prerequisites: </span>
							{prerequisites.length === 0 ? 'None' : prerequisites.map((prerequisite) => (
								<span key={prerequisite._id}>{prerequisite}</span>
							))}
							</p>
							<p className={styles.description}>Description: </p>
							<p className={styles.descriptionText}> {courseDescription}</p>
						</div>
					</div>
				
				</div>
			
		
			
			</div>

			<div className={styles.divider}>
				{reviews.length === 1 ? <p>{reviews.length} Student Rating</p> : 		
				<p>{reviews.length} Student Ratings</p>}
			</div>
			{reviews.map((review) => (
				<ReviewCard key={review._id} review={review} course={course}/>
			))}
	
    	</div>
  	);
}
