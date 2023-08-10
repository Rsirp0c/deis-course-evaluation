import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from './search.module.css';
import CourseCard from '../../components/CourseCard.jsx';

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
  console.log(searchParams.get('course'));
  // fetch data from backend when page is loaded
  useEffect(() => {
    fetch(`http://localhost:3000/api/courses?course=${searchParams.get('course')}`)
      .then((res) => res.json()).then((res) => {
		if(!res.error){
			console.log(`retrieved course data`);
			setData(res);
			return
		}
        setError(true);
		console.log(res.error);
      })
      .catch((err) => {
        console.log(err); 
        setError(true);
      });

  }, []);



  if (error) return <Error />;

  return (
    <div>
      {data ? data.map((course) =>  (<CourseCard key={course._id} course={course}  />)) 
	: <p>Loading...</p>}
    </div>
  );
}
