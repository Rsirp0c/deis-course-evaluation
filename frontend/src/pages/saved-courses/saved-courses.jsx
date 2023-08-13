
import { useEffect, useState } from 'react';
import styles from './saved-courses.module.css';
import CourseCard from '../../components/CourseReviewCard/CourseCard.jsx';	

export default function SavedCourses() {
 // fetch data from backend when page is loaded
const [data, setData] = useState([]);
const [reloadPage , setReloadPage] = useState(false);
 let likedCoursesIds = []

 function reload(){
	setReloadPage(!reloadPage);
 }
 useEffect(() => {
	likedCoursesIds = JSON.parse(localStorage.getItem('likedCourses')) || [];
	fetch('http://localhost:3000/api/liked-courses/ids', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({likedCoursesIds})
	}).then((res) => res.json()).then((res) => {
		if(!res.error){
			setData(res);
		}else{
			console.log(res.error);
		}
		
	}).catch((err) => {
		console.log(err);
	});

  }, [reloadPage]);
 
  const empty = () => {
	if (data.length === 0) return <p>No saved courses</p>
	return null
	;}

	return (
		<div>
			<h1>My Saved Courses</h1>
			<div className={styles.dividerContainer}><div className={styles.divider} /></div>
			{empty()}
			{data ? data.map((course) =>  (<CourseCard key={course._id} course={course} reload={reload}/>)) : <p>Loading...</p>}
		</div>
	);
}