// TO DO: show reviews by user if user is logged in
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';

import fetchUserReviews from '../../services/fetchUserReviews.js';
import styles from './my-reviews.module.css';

export default function MyReviews() {
    const { idState } = useContext(UserContext);
    const [id, setId] = idState;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (id) {
            fetchUserReviews(id, setReviews);
        }
    }, [id]);

    const empty = () => {
        if (reviews.length === 0) return <p>No reviews yet</p>;
        return null;
    };

    return (
        <div>
            <h1>My Reviews</h1>
            <div className={styles.dividerContainer}>
                <div className={styles.divider} />
            </div>
            {empty()}
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </div>
    );
}
