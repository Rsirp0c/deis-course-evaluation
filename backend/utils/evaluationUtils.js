/**
 * Gets the parameters from the request body and returns them in an JSON object
 * @MingCWang
 * @param {Object} body - request body
 * @returns {{course: string, semester: string, professor: string, difficulty: number, rate: number, attendance: string, gradeRecieved: string, delivery: string, comment: string}} - JSON object with the parameters
 */
export const getEvalFormParams = ({ courseIdName, semester, professor, difficulty, rate, usefulness, attendance, grade, delivery, commentString }) => {
	return {
		course: courseIdName,
		semester,
		professor,
		difficulty,
		rate, 
		usefulness,
		attendance,
		grade,
		delivery,
		comment: commentString
	};
};

function calcAverage(prev, curr, numComments) {
	return Math.round(((prev * (numComments - 1) + curr) / numComments)*10)/10;
}

export const updateCourseAverages = async (course, savedEvalForm) => {
	// Do the score calculations here. Note: calculate after the request is sent to the client
	console.log(course.ratingAverage)
	console.log(course.difficultyAverage)
	console.log(course.usefulnessAverage)

	const numComments = course.comments.length;

	course.ratingAverage = calcAverage(course.ratingAverage, savedEvalForm.rate, numComments);
	course.difficultyAverage = calcAverage(course.difficultyAverage, savedEvalForm.difficulty, numComments);
	course.usefulnessAverage = calcAverage(course.usefulnessAverage, savedEvalForm.usefulness, numComments);

	// If the grade is not null, then update the gradeAverage
	if (savedEvalForm.grade !== 0) {
		const numGrades = course.gradeAverage.numGrades;
		course.gradeAverage.grade = Math.round((course.gradeAverage.grade * numGrades + savedEvalForm.grade) / (numGrades + 1));
		course.gradeAverage.numGrades = numGrades + 1;
	}	
	const savedCourse = await course.save();
	console.log({ savedCourse });

}