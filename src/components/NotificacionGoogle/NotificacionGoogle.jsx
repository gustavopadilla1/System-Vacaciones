import React from 'react';
import NotificacionGoogle from './NotificacionGoogle';


function NotificacionGoogle() {
function Submit(e) {
    e.preventDefault();
    let correo = e.target.correo.value
    let asunto = e.target.asunto.value
    let texto = e.target.texto.value
    NotificacionGoogle(correo, asunto, texto);
    correo = asunto = text = ''; 
}

    return (
        <div>
        <form onSubmit={Submit}>
            <input type="text" name='correo' />
            <input type="text" name='asunto' />
            <input type="text" name='texto' />
            <button type='submit'>enviar</button>
            
            </form>        
        </div>
    );
}

export default NotificacionGoogle;