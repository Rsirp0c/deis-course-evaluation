const process = import.meta.env;

export default function fetchReviews(setReviews, setLoadingReviews, id){
	fetch(`${process.VITE_BASE_URL}api/courses/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({
			courseId: id,
		})
	}).then((res) => res.json()).then((data) => {
		if(!data.error){
			// console.log(data)
			setReviews([...data])
		}else{
			// console.log(data.error)
		}
		setLoadingReviews(false)
	})	
}