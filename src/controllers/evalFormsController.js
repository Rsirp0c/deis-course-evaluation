import EvalForm from "../models/evalForm";


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

function create (req, res, next) {
  let newEvalForm = new EvalForm(getEvalFormParams(req.body));

  newEvalForm.save()
    .then((evalForm) => {
      res.locals.redirect = "/evalForms";
      res.locals.evalForm = evalForm;
      next();
    })
    .catch((error) => {
      console.log(`Error saving evalForm: ${error.message}`);
      next(error);
    });
}

export { create };

// jsdoc implement 