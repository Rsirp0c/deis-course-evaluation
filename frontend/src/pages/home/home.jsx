/* eslint-disable react/prop-types */
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../utils/useWindowWidth';

// icon imports
import { GoSearch } from 'react-icons/go';


function Select({ title }) {
	const options = [
		{ id: 1, name: `Select ${title}` },
		{ id: 2, name: "option 1" },
		{ id: 3, name: "option 2" },
		{ id: 4, name: "option 3" },
	]
	return (
		<select name="" className={styles.select} >
			{options.map(option => <option key={option.id} value="">{option.name}</option>)}
		</select>
	)
}

// This is the main search page in the main page
function MainSearchBar() {

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate("/search")
	}
	return (
		<>

			<div className={styles.mainSearchBarContainer}>
				<form action="" onSubmit={handleSubmit} className={styles.mainSearchBar}>
					<div className={styles.wrapper}>
						<Select title="department" />
					</div>
					<div className={styles.wrapper}>
						<Select title="course" />
					</div>
					<div className={styles.searchWrapper}>
						<input type="text" placeholder="Search" className={styles.search} />
						<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>

					</div>

					<button type="submit" className={styles.goButton}>GO</button>
				</form>
			</div>

		</>
	)
}

export default function Home() {

	const width = useWindowWidth();

	return (
		<>
			<div className={styles.homeImage}>
				<p className={styles.homeTitle}>Course Evaluation: By you, and for you</p>

			</div>
			{width >= 1100 && <MainSearchBar />}
			<div className={styles.popularCourses}>
				Popular courses
			</div>
		</>
	)

}