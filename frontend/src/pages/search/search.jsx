import { useEffect, useState, useContext} from 'react';
import {useSearchParams} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext.jsx';
import styles from './search.module.css';
import CourseCard from '../../components/CourseCard.jsx';
import fetchCourse from '../../services/fetchCourse.js';

function Error() {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.error}>Error fetching course data</p>
    </div>
  );
}

export default function Search() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {authState} = useContext(UserContext);
  const [authenticated, setAuthenticated] = authState;

  	function storeData(retrievedData){
		setData([...retrievedData])
	}
	function storeError(retrievedError){
		setError(retrievedError)
	}

  // fetch data from backend when page is loaded
  useEffect(() => {
	fetchCourse(searchParams.get('course'), storeData, storeError);
  }, [searchParams, authenticated]);

  if (error) return <Error />;

  return (
    <div>
      {data ? data.map((course) =>  (<CourseCard key={course._id} course={course}  />)) 
	: <p>Loading...</p>}
    </div>
  );
}
