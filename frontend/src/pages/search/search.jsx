import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from './search.module.css';
import CourseCard from '../../components/CourseReviewCard/CourseCard.jsx';
import fetchCourse from '../../services/fetchCourse.js';

function Error() {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.error}>Error fetching course data</p>
    </div>
  );
}

export default function Search() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
 

  	function storeData(retrievedData){
		setData([...retrievedData])
	}
	function storeError(retrievedError){
		setError(retrievedError)
	}

  // fetch data from backend when page is loaded
  useEffect(() => {
	fetchCourse(searchParams.get('course'), storeData, storeError);
  }, [searchParams]);

  if (error) return <Error />;

  return (
    <div>
      {data ? data.map((course) =>  (<CourseCard key={course._id} course={course}  />)) 
	: <>
		<div className={styles.loading}>Loading... </div>
		<div className={styles.loadingMessage}>Currently on the free tier of render, so it might take a couple minutes for the server to load</div>
	 </>
	}
    </div>
  );
}
