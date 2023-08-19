import styles from './RatingBox.module.css';

/**
* CSS styles changing rating box color based on rating
* */
export default function RatingBox({ ratingAverage, isCourse, numRatings}) {
   let color;

   if (ratingAverage === 5) {
	   color = styles.green;
   } else if (ratingAverage >= 4) {
	   color = styles.lightGreen;
   } else if (ratingAverage >= 3) {
	   color = styles.yellow;
   } else if (ratingAverage >= 2) {
	   color = styles.orange;
   } else if (ratingAverage >= 1) {
	   color = styles.red;
   }

   let ratingStyle;
   let ratingScoreStyle;
   if(isCourse){
	ratingStyle = styles.rating;
	ratingScoreStyle = styles.ratingScoreContainer;
	} else {
	ratingStyle = styles.ratingReview;
	ratingScoreStyle = styles.ratingScoreContainerReview;
	}

   return (
	   <div className={`${ratingStyle} ${color}`}>
		   <p className={ratingScoreStyle}>
			   <span className={styles.ratingScore}>
				   {ratingAverage === 0 ? '-' : ratingAverage}
			   </span>
			   / 5
		   </p>
		   {isCourse ?   <p className={styles.ratingCount}>{numRatings} reviews</p> : null}
	   </div>
   );
}
