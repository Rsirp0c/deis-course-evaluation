export default function fetchLikedCourses(id) {
    fetch('http://localhost:3000/api/liked-courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (!res.error) {
                localStorage.setItem('likedCourses', JSON.stringify(res));
            } else {
                console.log(res.error);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
