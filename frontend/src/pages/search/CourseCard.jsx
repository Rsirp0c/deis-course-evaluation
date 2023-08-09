/* eslint-disable react/prop-types */

import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CourseCard.module.css';

/**
 * These are for custom rating hearts from MUI
 * */
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#3A7BD5',
  },
  '& .MuiRating-iconHover': {
    color: '#3A7BD5',
  },
});

/**
 * CSS styles changing rating box color based on rating
 * */
function RatingBox({ ratingAverage }) {
  let color;

  if (ratingAverage === 5) {
    color = styles.green;
  } else if (ratingAverage >= 4) {
    color = styles.lightGreen;
  } else if (ratingAverage >= 3) {
    color = styles.yellow;
  } else if (ratingAverage >= 2) {
    color = styles.orange;
  } else if (ratingAverage >= 1) {
    color = styles.red;
  }

  return (
    <div className={`${styles.rating} ${color}`}>
      <p className={styles.ratingScoreContainer}>
        <span className={styles.ratingScore}>{ratingAverage === -1 ? '-' : ratingAverage}</span>
        / 5
      </p>
      <p className={styles.ratingCount}>31 ratings</p>
    </div>
  );
}

/**
 * React component for a course card
 */
export default function CourseCard({ course }) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function handleLikedCourse() {
    setClicked(!clicked);
    // Implement adding the course to the user's list
  }

  function handleRateCourse() {
    const courseName = `${course.course} ${course.courseTitle}`;
    navigate(`/review/${courseName}`);
  }
  return (
    <div className={styles.card}>
      <RatingBox ratingAverage={course.ratingAverage} />
      <div className={styles.body}>
        <div className={styles.contents}>
          <p className={styles.course}>{course.course}</p>
          <p className={styles.courseTitle}>{course.courseTitle}</p>
          <p className={styles.prerequisites}>
            Prerequisite:
            {course.prerequisites}
          </p>
        </div>
        <div className={styles.button}>
          <button className={styles.listButton} onClick={handleLikedCourse}>
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
          <button className={styles.rateButton} onClick={handleRateCourse}>Rate this course</button>
        </div>
      </div>
    </div>
  );
}
