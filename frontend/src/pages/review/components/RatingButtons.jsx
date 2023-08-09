import styles from './ButtonsStyles.module.css';

export default function RatingButtons({ state, setState }) {

	const numRatingButtons = [1, 2, 3, 4, 5];

	
	function RatingButton({ rate, state, setState }) {
		function handleOnClick(e) {
			e.preventDefault();
			if (rate !== state) setState(rate);
		}
		let buttonStyle = rate === state ? styles.ratingButtonSelected : styles.ratingButton;
		if (rate === 1) buttonStyle = `${buttonStyle} ${styles.firstRatingButton}`;
		else if (rate === 5) {
			buttonStyle = `${buttonStyle} ${styles.lastRatingButton}`;
		}
		return <button className={buttonStyle} onClick={handleOnClick} />;
	}
	return (
		<div className={styles.ratingButtonsWrapper}>
			<p className={styles.levelText}>Awful</p>
			{numRatingButtons.map((rate) => (
				<RatingButton key={rate} rate={rate} state={state} setState={setState} />
			))}
			<p className={styles.levelText}>GOAT</p>
		</div>
	);
}