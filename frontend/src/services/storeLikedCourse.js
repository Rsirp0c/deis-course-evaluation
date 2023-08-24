const process = import.meta.env;

export default function storeLikedCourses(id) {

	// TO DO: sometimes null is stored into user's likedcourses why?
	let likedCoursesIds
	try{
		likedCoursesIds = JSON.parse(localStorage.getItem('likedCourses'));
		if(likedCoursesIds === null){
			throw new Error("wtf")
		}
		fetch(`${process.VITE_BASE_URL}api/liked-courses/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				likedCoursesIds,
				userId: id,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.error) {
					console.log(res);
					localStorage.removeItem('likedCourses');
				} else {
					console.log(res.error);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}catch{
		console.log("why is it null")
	}
	
    
}
