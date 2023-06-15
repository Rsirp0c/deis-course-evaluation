import EvalForm from "../models/evalForm";

/**
 * Gets the parameters from the request body and returns them in an JSON object
 * @MingCWang
 * @param {Object} body - request body
 * @returns {{course: string, semester: string, professor: string, difficulty: number, rate: number, attendance: string, gradeRecieved: string, delivery: string, comment: string}} - JSON object with the parameters
 */
const getEvalFormParams = (body) => {
    const { course, semester, professor, difficulty, rate, attendance, gradeRecieved, delivery, comment } = body;
    return {
        course,
        semester,
        professor,
        difficulty,
        rate,
        attendance,
        gradeRecieved,
        delivery,
        comment
    };
};

/**
 * Controller: Creates a new EvalForm object and saves it to the database
 * @async
 * @MingCWang
 * @param {Object} req - request object
 * @param {Object} res - response object\
 * @returns {Object} - JSON object with the saved EvalForm or error message
 */
async function create (req, res) {
  try{
    const newEvalForm = new EvalForm(getEvalFormParams(req.body));
    const savedEvalForm = await newEvalForm.save();
    res.status(201).json(savedEvalForm);
  }catch(error){
    res.status(500).json({ error: err.message });
  }
}

export { create };

// jsdoc implement 