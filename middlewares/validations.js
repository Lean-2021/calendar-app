import { validationResult } from "express-validator";

export const validationsErrors = (req,res,next) => {
   const checkError =  validationResult(req);
   if (!checkError.isEmpty()){
    return res.status(400).json({
      ok:false,
      errors: checkError.mapped(),
    });
   }
   next();
};