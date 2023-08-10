// fetch('http://localhost:3000/api/liked-courses/add', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		courseId: course._id,
			// 		userId: id,
			// 	}),
			// }).then(res => res.json()).then((res) => {
			// 	if (!res.error) {
			// 		console.log('Successfully added course to liked courses');
			// 	} else {	
			// 		console.log(res.error);
			// 	}
			// });


	// fetch('http://localhost:3000/api/liked-courses/remove', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		courseId: course._id,
			// 		userId: id,
			// 		}),
			// 	}).then((res) => {
			// 		if (res.status === 200) {
			// 			console.log('Successfully removed course from liked courses');
			// 		} else {
			// 			res.json().then((data) =>console.log(data))
			// 			console.log(res.message);
			// 		}
			// 	});


				// if user is logged in, check if course is in liked courses then set clicked to true

				// if(id){
				// 	fetch('http://localhost:3000/api/liked-courses', {
				// 		method: 'POST',
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 		body: JSON.stringify({
				// 			userId: id,
				// 		}),
				// 	}).then(res => res.json()).then((res) => {
				// 		if (!res.error) {
				// 			console.log('Successfully retrieved liked courses');
				// 			console.log(res);
				// 			setLikedList(res);
				// 		}else{
				// 			console.log(res.error)
				// 		}
				// 	}).catch((err) => {
				// 		console.log(err);
				// 	});
				// }