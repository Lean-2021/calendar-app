/*
    Rutas de evenos / Events
    host + /api/events
*/
import { Router } from "express";
import { check } from "express-validator";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/index.js";
import { isDate } from "../helpers/index.js";
import { validateJWT,validationsErrors } from "../middlewares/index.js";

const router = Router();

router.use(validateJWT); //middleware que se aplica a todas las rutas que se encuentren debajo del mismo - en este caso de validar token


router.get('/',getEvents);

//crear un nuevo evento

router.post('/',[
   check('title','No se ingreso ningún título').not().isEmpty(),
   check('title','El título debe tener un mínimo de 3 caracteres').isLength({min:3}),
   check('start','Fecha de inicio es obligatoria').custom(isDate),
   check('end','Fecha de finalización es obligatoria').custom(isDate),
   validationsErrors
],createEvent);

//Actualizar un evento

router.put('/:id',[
    check('id','El ID no es válido').isMongoId(),
    check('title','No se ingreso ningún título').not().isEmpty(),
    check('title','El título debe tener un mínimo de 3 caracteres').isLength({min:3}),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalización es obligatoria').custom(isDate),
    validationsErrors
],updateEvent);

// borrar evento

router.delete('/:id',[
    check('id','El ID no es válido').isMongoId(),
    validationsErrors
],deleteEvent);


export default router;