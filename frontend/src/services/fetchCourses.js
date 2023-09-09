const process = import.meta.env;


export default function fetchCourses(course, storeData, storeError) {
    fetch(`${process.VITE_BASE_URL}api/courses?course=${course}`)
        .then((res) => res.json())
        .then((res) => {
            if (!res.error) {
                console.log(`retrieved course data`);
                storeData(res);
                return;
            }
            storeError(true);
            console.log(res.error);
        })
        .catch((err) => {
            console.log(err);
            storeError(true);
        });
}
