import styles from './ButtonsStyles.module.css';

function AttendanceButton({ value, state, setState }) {
    function handleOnClick(e) {
        e.preventDefault();
        if (value !== state) setState(value);
    }
    let buttonStyle =
        value === state
            ? styles.attendanceButtonSelected
            : styles.attendanceButton;
    if (value) {
        return (
            <button
                className={
                    (buttonStyle = `${buttonStyle} ${styles.firstAttendanceButton}`)
                }
                onClick={handleOnClick}
            >
                Yes
            </button>
        );
    }
    if (!value) {
        return (
            <button
                className={`${buttonStyle} ${styles.lastAttendanceButton}`}
                onClick={handleOnClick}
            >
                No
            </button>
        );
    }
}
/**
 * Not 'DRY' enough, cleaan up this later
 * @param {*} param0
 * @returns
 */
export default function AttendanceButtons({ state, setState }) {
    return (
        <div className={styles.attendanceButtonsWrapper}>
            <AttendanceButton value state={state} setState={setState} />
            <AttendanceButton value={false} state={state} setState={setState} />
        </div>
    );
}
