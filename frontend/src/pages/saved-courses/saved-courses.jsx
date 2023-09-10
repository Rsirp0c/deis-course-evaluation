import { useEffect, useState } from 'react';
import styles from './saved-courses.module.css';
import CourseCard from '../../components/CourseReviewCard/CourseCard.jsx';
import fetchLikeCoursesWithIds from '../../services/fetchLikeCoursesWithIds';

export default function SavedCourses() {
    // fetch data from backend when page is loaded
    const [data, setData] = useState([]);
    const [reloadPage, setReloadPage] = useState(false);

    // Reload the page when user clickes the like button so the course gets deleted in real time when unliked
    function reload() {
        setReloadPage(!reloadPage);
    }

    function storeLikedCourses(courses) {
        setData(courses);
    }

    useEffect(() => {
        fetchLikeCoursesWithIds(storeLikedCourses);
    }, [reloadPage]);

    const empty = () => {
        if (data.length === 0) return <p>No saved courses</p>;
        return null;
    };

    return (
        <div>
            <h1>My Saved Courses</h1>
            <div className={styles.dividerContainer}>
                <div className={styles.divider} />
            </div>
            {empty()}
            {data ? (
                data.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        reload={reload}
                    />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
