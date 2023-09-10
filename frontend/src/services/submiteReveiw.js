const process = import.meta.env;
export default function submitReview(
    id,
    courseIdName,
    difficulty,
    rate,
    usefulness,
    attendance,
    delivery,
    grade,
    professor,
    semester,
    commentString,
    setSubmit,
    setError,
) {
    fetch(`${process.VITE_BASE_URL}api/evaluations/forms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: id || 'anonymous',
            courseIdName,
            difficulty,
            rate,
            usefulness,
            attendance,
            delivery,
            grade,
            professor,
            semester,
            commentString,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.error) {
                setSubmit(true);
            } else {
                setError(true);
                console.log(data.error);
            }
        });
}
