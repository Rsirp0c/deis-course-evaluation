import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import format from '../../utils/formatSentence.js';
import styles from './course.module.css';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';
import fetchReviews from '../../services/fetchReviews.js';
import fetchCourse from '../../services/fetchCourse.js';
import convertToLetterGrade from '../../utils/convertToLetterGrade.js';
import LikeButton from '../../components/CourseReviewCard/LikeButton.jsx';
import RateCourseButton from '../../components/CourseReviewCard/RateCourseButton.jsx';

export default function Course() {
    const [reviews, setReviews] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetchReviews(setReviews, setLoadingReviews, id);
        fetchCourse(setCourseInfo, setLoadingCourse, id);
    }, []);

    if (loadingReviews || loadingCourse) {
        return <div className={styles.loadingContainer}>Loading....</div>;
    }

    // Everything below will not be parsed if loading reveiw or course is true
    const {
        _id,
        course,
        courseTitle,
        courseDescription,
        difficultyAverage,
        ratingAverage,
        gradeAverage,
        usefulnessAverage,
        prerequisites,
        professors,
    } = courseInfo || {};

    const { courseFormatted, courseTitleFormatted } = format(
        `${course} ${courseTitle}`,
    );

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

    let difficulty;
    let usefulness;
    let rating;

    if (difficultyAverage === 0) {
        difficulty = 'N/A';
    } else {
        difficulty = difficultyAverage.toFixed(1);
    }
    if (usefulnessAverage === 0) {
        usefulness = 'N/A';
    } else {
        usefulness = usefulnessAverage.toFixed(1);
    }
    if (ratingAverage === 0) {
        rating = '-';
    } else {
        rating = ratingAverage.toFixed(1);
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.courseTitleContainer}>
                    <div className={styles.upperHalf}>
                        <p className={styles.course}>
                            <span className={styles.bold}>
                                {courseFormatted}
                            </span>{' '}
                            {courseTitleFormatted}
                        </p>
                        <LikeButton
                            courseId={_id}
                            className={styles.likeButton}
                            isCourse
                        />
                    </div>
                    <div className={styles.lowerHalf}>
                        <div className={styles.profContainer}>
                            Instructors:{' '}
                            {professors.map((professor, index) => (
                                <p
                                    className={styles.prof}
                                    key={index.toString()}
                                >
                                    {professor.name},
                                </p>
                            ))}
                        </div>
                        <RateCourseButton course={courseInfo} isCourse />
                    </div>
                </div>
                <div className={styles.courseInfoContainer}>
                    <div className={styles.left}>
                        <div className={styles.rating}>
                            <div className={styles.gridContainer}>
                                <div className={color} />
                            </div>
                            <div className={styles.ratingTextContainer}>
                                <span className={styles.ratingText}>
                                    {rating}
                                </span>{' '}
                                <span className={styles.ratingSubText}>
                                    / 5.0
                                </span>
                            </div>
                        </div>
                        <div className={styles.subRatings}>
                            <p className={styles.subRate}>
                                Difficulty{' '}
                                <span className={styles.subRateValue}>
                                    {difficulty}
                                </span>
                            </p>
                            <p className={styles.subRate}>
                                Usefulness{' '}
                                <span className={styles.subRateValue}>
                                    {usefulness}
                                </span>
                            </p>
                            <p className={styles.subRate}>
                                Average grade{' '}
                                <span className={styles.subRateValue}>
                                    {convertToLetterGrade(gradeAverage.grade)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.courseDescription}>
                            <p className={styles.prerequisite}>
                                <span className={styles.bold}>
                                    Prerequisites:{' '}
                                </span>
                                {prerequisites.length === 0
                                    ? 'None'
                                    : prerequisites.map(
                                          (prerequisite, index) => (
                                              <span key={index.toString()}>
                                                  {prerequisite}
                                              </span>
                                          ),
                                      )}
                            </p>
                            <p className={styles.description}>Description: </p>
                            <p className={styles.descriptionText}>
                                {' '}
                                {courseDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.divider}>
                {reviews.length === 1 ? (
                    <p>{reviews.length} Student Rating</p>
                ) : (
                    <p>{reviews.length} Student Ratings</p>
                )}
            </div>
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </div>
    );
}
