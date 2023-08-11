
export default function fetchCourse(course, storeData, storeError){

	fetch(`http://localhost:3000/api/courses?course=${course}`)
		.then((res) => res.json()).then((res) => {
  			if(!res.error){
	  			console.log(`retrieved course data`);
	 		 	storeData(res);
	 		 	return
  			}
 	 		storeError(true);
  			console.log(res.error);
		})
		.catch((err) => {
			console.log(err); 
			storeError(true);
		});
}