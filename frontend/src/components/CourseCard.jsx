/* eslint-disable react/prop-types */

import styles from './CourseCard.module.css'
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { useState } from 'react';


const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#3A7BD5',
	},
	'& .MuiRating-iconHover': {
		color: '#3A7BD5',
	},
});


export default function CourseCard({ course }) {

	const [clicked, setClicked] = useState(false)

	function handleClick() {
		setClicked(!clicked)
		// Implement adding the course to the user's list
	}
	return (
		<div className={styles.card}>
			<div className={styles.rating}>
				<p className={styles.ratingScoreContainer}><span className={styles.ratingScore}>4.0</span>/ 5</p>
				<p className={styles.ratingCount}>31 ratings</p>
			</div>
			<div className={styles.body}>
				<div className={styles.contents}>
					<p className={styles.course}>{course.course}</p>
					<p className={styles.courseTitle}>{course.courseTitle}</p>
					<p className={styles.prerequisites}>Prerequisite: {course.prerequisites}</p>
				</div>
				<div className={styles.button}>
					<button className={styles.listButton} onClick={handleClick}>
						<StyledRating
							name="rating-heart"
							max={1}
							icon={<FavoriteIcon fontSize="inherit" className={styles.icon} />}
							emptyIcon={<FavoriteBorderIcon fontSize="inherit" className={styles.icon} />}
							className={styles.ratingHeart}
							value={clicked ? 1 : 0}
							readOnly
						/>
						<p>Add to list</p>
					</button>
					<button className={styles.rateButton}>Rate this course</button>
				</div>
			</div>
		</div>
	)
}