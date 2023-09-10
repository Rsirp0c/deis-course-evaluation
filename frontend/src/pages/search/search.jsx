/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './search.module.css';
import CourseCard from '../../components/CourseReviewCard/CourseCard.jsx';
import fetchCourses from '../../services/fetchCourses.js';
import Loading from '../loading/loading';

function Error() {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.error}>Error fetching course data</p>
        </div>
    );
}

function Content({ data }) {
    if (data && data.length > 0) {
        return (
            <>
                {data.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </>
        );
    }
    if (data && data.length === 0) {
        return <div className={styles.NotFoundContainer}>No Courses Found</div>;
    }
    return (
		<Loading />
    );
}

export default function Search() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    function storeData(retrievedData) {
        setData([...retrievedData]);
    }
    function storeError(retrievedError) {
        setError(retrievedError);
    }

    // fetch data from backend when page is loaded
    useEffect(() => {
        fetchCourses(searchParams.get('course'), storeData, storeError);
    }, [searchParams]);

    if (error) return <Error />;

    return (
        <Content data={data} />
    );
}
