import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body} from 'express-validator';
import { handleInputErrors } from "../middleware";

const router = Router();


router.post('/create-account',
    body('name', 'El nombre es obligatorio').notEmpty().withMessage('El nombre no puede ir vacío'), 
    body('password', 'El nombre es obligatorio').isLength({min:8}).withMessage('El password debe tener al menos 8 caracteres'), 
    body('password_confirmation').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Los passwords no coinciden')
        }
        return true;
    }),
    body('email', 'El nombre es obligatorio').isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('El token no puede ir vacío'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email', 'El nombre es obligatorio').isEmail().withMessage('El email no es válido'), 
    body('password', 'El nombre es obligatorio').notEmpty().withMessage('El password no puede ir vacío'), 
    handleInputErrors,
    AuthController.login
)

export default router;