/* eslint-disable react/prop-types */
import styles from './RatingBox.module.css';

/**
 * CSS styles changing rating box color based on rating
 * */
export default function RatingBox({ ratingAverage, isCourse, numRatings }) {
    let color;
    let rating;

    if (ratingAverage % 1 === 0) {
        rating = ratingAverage.toFixed(1);
    } else {
        rating = ratingAverage;
    }

    if (rating === 5) {
        color = styles.green;
    } else if (rating >= 4) {
        color = styles.lightGreen;
    } else if (rating >= 3) {
        color = styles.yellow;
    } else if (rating >= 2) {
        color = styles.orange;
    } else if (rating >= 1) {
        color = styles.red;
    }

    let ratingStyle;
    let ratingScoreStyle;
    if (isCourse) {
        ratingStyle = styles.rating;
        ratingScoreStyle = styles.ratingScoreContainer;
    } else {
        ratingStyle = styles.ratingReview;
        ratingScoreStyle = styles.ratingScoreContainerReview;
    }

    return (
        <div className={`${ratingStyle} ${color}`}>
            <p className={ratingScoreStyle}>
                <span className={styles.ratingScore}>
                    {rating == 0.0 ? '-' : rating}
                </span>
                / 5.0
            </p>
            {isCourse ? (
                <p className={styles.ratingCount}>{numRatings} reviews</p>
            ) : null}
        </div>
    );
}
