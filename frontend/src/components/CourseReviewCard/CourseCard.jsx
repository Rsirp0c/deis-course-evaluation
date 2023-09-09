/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';
import RatingBox from "./RatingBox.jsx";
import LikeButton from './LikeButton.jsx';
import RateCourseButton from './RateCourseButton';


/**
 * React component for a course card
 * 
 * Stores liked courses in local storage and updates when liked/unliked, if user is logged in, stores liked courses in database
 */
export default function CourseCard({ course, reload }) {

	const path = `/course/${course._id}`;
	
    return (
        <div className={styles.card}>
            <RatingBox ratingAverage={course.ratingAverage} isCourse numRatings={course.comments.length}/>
            <div className={styles.body}>
                <div className={styles.contents}>
                    <Link to={path} className={styles.course}>{course.course}</Link>
                    <p className={styles.courseTitle}>{course.courseTitle}</p>
                    <p className={styles.prerequisites}>
                        Prerequisite:
                        {course.prerequisites}
                    </p>
                </div>
                <div className={styles.button}>
					<LikeButton courseId={course._id} reload={reload}/>
					<RateCourseButton course={course}/>
                </div>
            </div>
        </div>
    );
}
