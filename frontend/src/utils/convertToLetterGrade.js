export default function convertToLetterGrade(grade) {
	const letterGrades = {
		13: 'A+',
		12: 'A',
		11: 'A-',
		10: 'B+',
		9: 'B',
		8: 'B-',
		7: 'C+',
		6: 'C',
		5: 'C-',
		4: 'D+',
		3: 'D',
		2: 'D-',
		1: 'F',
		0: 'N/A'
	}
	return letterGrades[grade];
}
