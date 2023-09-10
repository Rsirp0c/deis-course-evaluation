const process = import.meta.env;

export default function fetchLikeCoursesWithIds(storeLikedCourses) {
    const likedCoursesIds =
        JSON.parse(localStorage.getItem('likedCourses')) || [];

    fetch(`${process.VITE_BASE_URL}api/liked-courses/ids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likedCoursesIds }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (!res.error) {
                storeLikedCourses(res);
            } else {
                console.log(res.error);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
