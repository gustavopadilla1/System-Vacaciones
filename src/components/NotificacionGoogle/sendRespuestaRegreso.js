import { db } from '../../Config/firestore';
import { collection, addDoc } from 'firebase/firestore' 

export default async function sendRespuestaRegreso(email, subject, body) {
	const collectionRef = collection(db, 'mail');
	const emailContent = {
		to: email,
		message: {
			subject: subject,
			name:  body,
			html: `<div>
						<h3>Aviso Importante </h3>
						<p> En este momento <b> ${body}</b> </p> 

						<p> Acabas de recibir una respuesta de tu solicitud, Favor de revisar el sistemas <b> </p> 
						
						<br/>
						
						<h5> Si deceas revisar la solicitud ingresa al Sistema de Vacaciones</h5>
						<a href="https://system-vacaciones-f2a1c.firebaseapp.com/">https://system-vacaciones-f2a1c.firebaseapp.com/</a>
					
					</div>`,
		},
	};
	console.log('listo para ser enviado');
	return await addDoc(collectionRef, emailContent);
}