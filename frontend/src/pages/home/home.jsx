import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import useWindowWidth from '../../utils/useWindowWidth';

// icon imports
import { GoSearch } from 'react-icons/go';
import styles from './home.module.css';

/**
 *  This is the main search page in the main page
 *  TO DO: convert to split page main page
 * */
function SearchCourse() {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?course=${text}`);
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.searchReviewContainer}>
            <div className={styles.searchReviewWrapper}>
                <p className={styles.searchTitle}>Search Course Reviews</p>
                <div className={styles.searchReview}>
                    <form
                        action=''
                        onSubmit={handleSubmit}
                        className={styles.searchBar}
                    >
                        <div className={styles.searchWrapper}>
                            <input
                                type='text'
                                placeholder='Search'
                                className={styles.search}
                                value={text}
                                onChange={handleOnChange}
                            />
                            <button
                                type='submit'
                                className={styles.searchInput}
                            >
                                <GoSearch className={styles.searchIcon} />
                            </button>
                        </div>
                        <button type='submit' className={styles.searchButton}>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    // const width = useWindowWidth();

    return (
        <div className={styles.background}>
            <div className={styles.container} />
            <SearchCourse />
        </div>
    );
}
