import { useEffect, useState, useContext } from 'react';
import styles from './search.module.css';
import CourseCard from '../../components/CourseCard.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';

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
  const { idState } = useContext(UserContext);
  const [id, setId] = idState;
  
  // fetch data from backend when page is loaded
  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then((res) => res.json()).then((res) => {
        console.log(`retrieved course data`);
        setData(res);
      })
      .catch((err) => {
        console.log(err); 
        setError(true);
      });

	  // TO DO: fetch liked courses from backend and store in localstorage
  }, []);



  if (error) return <Error />;

  return (
    <div>
      {data ? data.map((course) =>  (<CourseCard key={course._id} course={course} />)) 
	: <p>Loading...</p>}
    </div>
  );
}
