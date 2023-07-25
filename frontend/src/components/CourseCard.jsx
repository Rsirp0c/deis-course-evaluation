/* eslint-disable react/prop-types */
export default function CourseCard() {

	const course = {
		"course": "COSI 10A",
		"courseTitle": "INTRODUCTION TO PROBLEM SOLVING IN PYTHON",
		"professors": [
			{
				"name": "Timothy Hickey",
				"email": ""
			},
			{
				"name": "Jordan Pollack",
				"email": ""
			}
		],
		"courseDescription": "Introduces computer programming and related computer science principles. Through programming, students will develop fundamental skills such as abstract reasoning and problem solving. Students will master programming techniques using the Python programming language and will develop good program design methodology resulting in correct, robust, and maintainable programs. Usually offered every semester.",
		"prerequisites": "No previous programming experience required"
	}

	return (
		<>
			<div className="card">
				<div className="rating"></div>
				<div className="body">
					<div className="contents">
						<p className="course"></p>
						<p className="courseTitle"></p>
						<p className="prerequisites"></p>
					</div>
					<div className="buttons">
						<button className="favoriteButton">Add to Favorites</button>
						<button className="rateButton">Rate this course</button>
					</div>
				</div>
			</div>
		</>
	)
}