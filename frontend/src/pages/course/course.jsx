

import { useState, useEffect } from 'react';
import format from '../../utils/formatSentence.js'
import styles from './course.module.css'
import ReviewCard from './components/ReviewCard.jsx';
import fetchReviews from '../../services/fetchReviews.js';
import convertToLetterGrade from '../../utils/convertToLetterGrade.js';

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
	console.log(gradeAverage)
	console.log(professors)
	
	useEffect(()=>{
		fetchReviews(setReviews, _id);
	}, [])

  	return (
    	<div>
			<div className={styles.courseContainer}>
      			<p>{format(`${course} ${courseTitle}`)}</p>
				<p>{courseDescription}</p>
				<p>{prerequisites}</p>
				<p>{difficultyAverage}</p>
				<p>{usefullnessAverage}</p>
				<p>{ratingAverage}</p>
				<p>{convertToLetterGrade(gradeAverage.grade)}</p>
			</div>
			<div className={styles.divider}>
				{reviews.length === 1 ? <p>{reviews.length} Student Rating</p> : 		
				<p>{reviews.length} Student Ratings</p>}
		
			</div>
			<div className={styles.reviewContainer}>
				{reviews.map((review) => (
					<ReviewCard key={review._id} review={review} course={course}/>
					))}
			</div>
    	</div>
  	);
}
