/* eslint-disable react/prop-types */
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';
// import useWindowWidth from '../../utils/useWindowWidth';

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

/**
 *  This is the main search page in the main page
 *  TO DO: convert to split page main page
 * */
function SearchCourse() {

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate("/search")
	}
	return (
		<>
			<div className={styles.searchReviewContainer}>
				<div className={styles.searchReviewWrapper}>
					<p className={styles.searchTitle}>Search Course Reviews</p>
					<div className={styles.searchReview}>

						<form action="" onSubmit={handleSubmit} className={styles.searchBar}>
							<div className={styles.wrapper}>
								<Select title="department" />
							</div>
							<div className={styles.wrapper}>
								<Select title="core requirement" />
							</div>
							<div className={styles.searchWrapper}>
								<input type="text" placeholder="Search" className={styles.search} />
								<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>

							</div>

							<button type="submit" className={styles.goButton}>Search</button>
						</form>
					</div>

				</div>

			</div>

		</>
	)
}

function ReviewCourse() {

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault()
		navigate("/review")
	}
	return (
		<>
			<div className={styles.reviewContainer}>
				<div className={styles.reviewWrapper}>
					<p className={styles.searchTitle}>Write a Review, Now!</p>
					<div className={styles.searchReview}>

						<form action="" onSubmit={handleSubmit} className={styles.searchBar}>
							<div className={styles.wrapper}>
								<Select title="department" />
							</div>
							<div className={styles.searchWrapper}>
								<input type="text" placeholder="Search" className={styles.search} />
								<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>

							</div>

							<button type="submit" className={styles.goButton}>Review</button>
						</form>
					</div>

				</div>
			</div>


		</>
	)
}

export default function Home() {

	// const width = useWindowWidth();

	return (
		<>
			<div className={styles.container}>
				<div className={styles.leftContainer}></div>

				<div className={styles.rightContainer}></div>
				<SearchCourse />
				<ReviewCourse />
			</div>
		</>
	)

}