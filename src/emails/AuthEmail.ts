import { transporter } from "../config/nodemailer";

interface IEmail{
    email: string;
    name: string;
    token: string;
}


export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
          // Enviar email
         const info = await transporter.sendMail({
            from: 'Caja de ahorro Reyes <admin@cajareyes.com>',
            to: user.email,
            subject: 'Caja Reyes - Confirma tu cuenta',
            text: `<p>Hola: ${user.name}, has creado tu cuenta en Caja Reyes, ya casi esta todo listo, solo debes confirmarla. </p>
            <p>Visita el siguiente enlace:</p>
            <a href="#">Confirmar cuenta</a>
            <p>E Ingresa el siguiente código para confirmar tu cuenta: <strong>${user.token}</strong></p>
            <p>Este token exprira en 10 minutos</p>
            `,
        });
        console.log('Email enviado', info.messageId);
    }
}