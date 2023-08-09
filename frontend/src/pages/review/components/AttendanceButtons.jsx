import styles from './ButtonsStyles.module.css';

/**
	   * Not 'DRY' enough, cleaan up this later
	   * @param {*} param0
	   * @returns
	   */
export default function AttendanceButtons({ state, setState }) {
	function AttendanceButton({ value, state, setState }) {
		function handleOnClick(e) {
			e.preventDefault();
			if (value !== state) setState(value);
		}
		let buttonStyle = value === state ? styles.attendanceButtonSelected : styles.attendanceButton;
		if (value === 1) {
			return <button className={buttonStyle = `${buttonStyle} ${styles.firstAttendanceButton}`} onClick={handleOnClick}>Yes</button>;
		} if (value === 2) {
			return <button className={`${buttonStyle} ${styles.lastAttendanceButton}`} onClick={handleOnClick}>No</button>;
		}
	}
	return (
		<div className={styles.attendanceButtonsWrapper}>
			<AttendanceButton value={1} state={state} setState={setState} />
			<AttendanceButton value={2} state={state} setState={setState} />
		</div>
	);
}