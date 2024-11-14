import {Router} from 'express'
import {body, param} from 'express-validator'
import { createPatner, deletePatner, getPatners, getPatnersById, updatePatner, updatePatnerName } from './handlers/patners';
import { handleInputErrors } from './middleware';
const router = Router();


router.get('/',
    
    getPatners
)
router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getPatnersById
)


router.post('/', 

       // Validación
       body('numero_socio').notEmpty().withMessage('El numero de socio es requerido'),

       body('fecha_apertura').notEmpty().withMessage('La fecha de apertura es requerida'),
   
       body('nombre').notEmpty().withMessage('El nombre es requerido'),
       body('apellido_paterno').notEmpty().withMessage('El apellido paterno es requerido'),
       body('apellido_materno').notEmpty().withMessage('El apellido materno es requerido'),
       
       body('comunidad').notEmpty().withMessage('La comunidad es requerida'),
       body('municipio').notEmpty().withMessage('El municipio es requerido'),
       
       body('cantidad').notEmpty().withMessage('La cantidad es requerida'),
       body('cantidad').isFloat({ gt: 0 }).withMessage('La cantidad debe ser un número positivo'),

       handleInputErrors,
       createPatner
)


router.put('/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),

    // Validación
    body('numero_socio').notEmpty().withMessage('El numero de socio es requerido'),

    
    body('fecha_apertura').notEmpty().withMessage('La fecha de apertura es requerida'),

    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido_paterno').notEmpty().withMessage('El apellido paterno es requerido'),
    body('apellido_materno').notEmpty().withMessage('El apellido materno es requerido'),
    
    body('comunidad').notEmpty().withMessage('La comunidad es requerida'),
    body('municipio').notEmpty().withMessage('El municipio es requerido'),
    
    body('cantidad').notEmpty().withMessage('La cantidad es requerida'),
    body('cantidad').isFloat({ gt: 0 }).withMessage('La cantidad debe ser un número positivo'),

    handleInputErrors,    
    updatePatner
)


router.patch('/:id', 
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    updatePatnerName
)


router.delete('/:id', 
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    deletePatner

)


export default router;