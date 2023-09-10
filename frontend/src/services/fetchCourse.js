const process = import.meta.env;

export default function fetchCourse(setCourseInfo, setLoadingCourse, id) {
    fetch(`${process.VITE_BASE_URL}api/courses/${id}`)
        .then((res) => res.json())
        .then((res) => {
            if (!res.error) {
                console.log(`retrieved course data`);
                setCourseInfo(res);
                setLoadingCourse(false);
                return;
            }
            console.log(res.error);
        })
        .catch((err) => {
            console.log(err);
        });
}
