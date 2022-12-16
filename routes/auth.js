/*
    Rutas de usuario / Auth
    host + /api/auth
*/

import {Router} from 'express';
import { check } from 'express-validator'; 
import { createUser,loginUser,renewToken } from '../controllers/index.js';
import { validateEmail,validateUser } from '../helpers/index.js';
import { validateJWT, validationsErrors } from '../middlewares/index.js';

const router = Router();

router.post('/',[
    check('email','El email es incorrecto').isEmail(),
    check('email').custom(validateUser),
    check('password','El password es obligatorio').not().isEmpty(),
    check('password','El password debe tener un mínimo de 6 caracteres').isLength({min:6}),
    validationsErrors
],loginUser);
    
router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name','El nombre debe tener un minimo de 3 caracteres').isLength({min:3}),
    check('email','El email es incorrecto').isEmail(),
    check('email').custom(validateEmail),
    check('password','El password es obligatorio').not().isEmpty(),
    check('password','El password debe tener un mínimo de 6 caracteres').isLength({min:6}),

    validationsErrors
],createUser);

router.get('/renew', validateJWT ,renewToken);
   

export default router;