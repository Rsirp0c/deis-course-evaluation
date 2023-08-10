import { useEffect, useState } from 'react';
import styles from './search.module.css';
import CourseCard from './CourseCard.jsx';

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

  // fetch data from backend when page is loaded
  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then((res) => res.json())
      .then((res) => {
        console.log(`retrieved data ${res}`);

        setData(res);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  // console.log(data)

  if (error) return <Error />;

  return (
    <div>
      {data ? data.map((course) => (
        <CourseCard key={course._id} course={course} />
      )) : <p>Loading...</p>}
    </div>
  );
}
