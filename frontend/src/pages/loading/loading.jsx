import styles from './loading.module.css';

export default function Loading() {
	return (
		<>
            <div className={styles.loading}>Loading... </div>
            <div className={styles.loadingMessage}>
                Currently on the free tier of render, so it might take a couple
                minutes for the server to load
            </div>
        </>
	)
}

