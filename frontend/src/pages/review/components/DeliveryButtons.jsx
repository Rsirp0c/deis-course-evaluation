import styles from './ButtonsStyles.module.css';

export default function DeliveryButtons({ state, setState }) {
    function DeliveryButton({ value, state, setState }) {
        function handleOnClick(e) {
            e.preventDefault();
            if (value !== state) setState(value);
        }
        const buttonStyle =
            value === state
                ? styles.deliveryButtonSelected
                : styles.deliveryButton;
        if (value === 'In Person') {
            return (
                <button
                    className={`${buttonStyle} ${styles.firstDeliveryButton}`}
                    onClick={handleOnClick}
                >
                    {value}
                </button>
            );
        }
        if (value === 'Hybrid') {
            return (
                <button
                    className={`${buttonStyle} ${styles.lastDeliveryButton}`}
                    onClick={handleOnClick}
                >
                    {value}
                </button>
            );
        }
        return (
            <button className={`${buttonStyle}`} onClick={handleOnClick}>
                {value}
            </button>
        );
    }
    return (
        <div className={styles.deliveryButtonsWrapper}>
            <DeliveryButton
                value='In Person'
                state={state}
                setState={setState}
            />
            <DeliveryButton value='Online' state={state} setState={setState} />
            <DeliveryButton value='Hybrid' state={state} setState={setState} />
        </div>
    );
}
