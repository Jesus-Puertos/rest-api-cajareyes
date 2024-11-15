import { Request, Response } from 'express';
import User from '../models/User.model';
import { checkPassword, hashPassword } from '../utils/auth';
import Token from '../models/Token.model';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';



export class AuthController {
    static createAccount = async (req: Request, res: Response): Promise<void> => {
        try {
            const { password, email } = req.body;

            // Prevenir usuarios duplicados
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                const error = new Error('El usuario ya está registrado');
               res.status(409).json({ error: error.message });
            }

            const user = new User(req.body);

            // Hashear el password
            user.password = await hashPassword(password);
            await user.save();

            // Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            await token.save();

            // Enviar email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name:  user.name,
                token: token.token
            })
          

            res.send('Cuenta creada correctamente, revisa tu email para confirmar tu cuenta');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static confirmAccount = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ where: { token } });

            if(!tokenExists){
                const error = new Error('El token no es válido');
                res.status(401).json({ error: error.message });
            }

            const user = await User.findByPk(tokenExists.user);
            user.confirmed = true;

            //Eliminar el token y confirmar la cuenta

            await Promise.allSettled([user.save(), tokenExists.destroy()]);
            res.send('Cuenta confirmada correctamente');
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({ where: { email } });
            if(!user){
                const error = new Error('Usuario no encontrado');
                res.status(404).json({ error: error.message });
            }

            if(!user.confirmed){

                const token = new Token();
                token.user = user.id;
                token.token = generateToken();
                await token.save();

                 // Enviar email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name:  user.name,
                    token: token.token
                })
          

                const error = new Error('Usuario no confirmado, por favor revisa tu email hemos enviado un nuevo token');
                res.status(401).json({ error: error.message });
            }

            //Revisar el password
            const isPasswordCorrect = await checkPassword(password, user.password);
            if(!isPasswordCorrect){
                const error = new Error('Password incorrecto');
                res.status(401).json({ error: error.message });
            }

            res.send('Autenticado correctamente');


        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }
}