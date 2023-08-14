import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useContext, useEffect } from 'react';
import styles from './LikeButton.module.css';
import { UserContext } from '../../contexts/UserContext.jsx';

export default function LikeButton({courseId, isCourse, reload}){
    const [clicked, setClicked] = useState(false);
    const [added, setAdded] = useState(false);

    const { loggingInState, idState } = useContext(UserContext);
    const [id, setId] = idState;
    const [loggingIn, setLoggingIn] = loggingInState;


    // check if course is in liked courses when page is loaded
    useEffect(() => {
        const likedCourses =
            JSON.parse(localStorage.getItem('likedCourses')) || [];
        if (id) {
            if (likedCourses.includes(courseId)) {
                setClicked(true);
                setAdded(true);
            }
        }
    }, []);

	// fetch liked courses from local storage and update when liked/unliked
    useEffect(() => {
        const likedCourses =
            JSON.parse(localStorage.getItem('likedCourses')) || [];
        if (clicked && !added) {
            setAdded(true);
            likedCourses.push(courseId);
            localStorage.setItem('likedCourses', JSON.stringify(likedCourses));
        } else if (!clicked && added) {
            setAdded(false);
            const deletedCourses = likedCourses.filter(
                (likedCourse) => likedCourse !== courseId,
            );
            localStorage.setItem(
                'likedCourses',
                JSON.stringify(deletedCourses),
            );
        }
    }, [clicked]);

	function handleLikedCourse() {
        if (!id) {
            setLoggingIn(true);
        } else {
            setClicked(!clicked);
			if (reload) reload();
        }
    }


	/**
	 * These are for custom rating hearts from MUI
	 * */
	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#3A7BD5',
		},
		'& .MuiRating-iconHover': {
			color: '#3A7BD5',
		},
	});

	let buttonStyle 
	if (isCourse){
		buttonStyle = styles.listButtonCourse
	}else{
		buttonStyle = styles.listButton
	}

	return (
		<button
		type='button'
		className={buttonStyle}
		onClick={handleLikedCourse}
	>
		<StyledRating
			name='rating-heart'
			max={1}
			icon={
				<FavoriteIcon
					fontSize='inherit'
				/>
			}
			emptyIcon={
				<FavoriteBorderIcon
					fontSize='inherit'
				/>
			}
			className={styles.ratingHeart}
			value={clicked ? 1 : 0}
			readOnly
		/>
		<p>Add to list</p>
	</button>
	)
}