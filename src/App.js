import './App.css';
import React, {useState } from 'react'
import Home from './pages/Home/Home';

import firebaseApp from './Config/Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import AuthGoogle from './pages/AuthGoogle';


const auth = getAuth(firebaseApp); 
const  firestore = getFirestore(firebaseApp) ;

function App() {
  const [user, setUser] = useState(null);
  
  async function getRol(uid) {

  const docuRef =  doc(firestore, `colaboladores/${uid}`);
  const docuCifrada = await getDoc (docuRef);
  const docuFinal = docuCifrada.data();
  console.log(docuFinal);
  return docuFinal;
}


async function setUserWithFirebaseAndRol(usuarioFirebase) {
  getRol(usuarioFirebase.uid).then((res)=>{
    const userData = {
      uid: usuarioFirebase.uid,      
      email: usuarioFirebase.email,                  
      // rol: res.rol,
      ['NIVEL DE AUTORIDAD']: res['NIVEL DE AUTORIDAD'],
      ['CORREO ELECTRONICO']: res['CORREO ELECTRONICO'],
      ['ESTADO DEL EMPLEADO']: res['ESTADO DEL EMPLEADO'],     
      ['EQUIPO DE TRABAJO']: res['EQUIPO DE TRABAJO'],     
      ['AREA FUNCIONAL']: res['AREA FUNCIONAL'],
      ['NOMBRE COMPLETO']: res['NOMBRE COMPLETO'],
      ['NOMBRE CORTO']: res['NOMBRE CORTO'],
      Dias: res.Dias,
      ['CORREO ELCTRONICO DEL SUPERVISOR']: res['CORREO ELCTRONICO DEL SUPERVISOR']   ,   
      ['CORREO ELCTRONICO DEL DIRECTOR']: res['CORREO ELCTRONICO DEL DIRECTOR']   ,   

    }

    setUser(userData);
    console.log(userData);

  })
};

onAuthStateChanged(auth, (usuarioFirebase) =>{

  if (usuarioFirebase) {  
    if (!user) {
      setUserWithFirebaseAndRol(usuarioFirebase) 
    }

  }else{
    setUser(null);
  }
});

  return (  
  <> 
 
  { user ?  <Home  user={user} /> : <AuthGoogle/> }    

 

  </> 
  
  ) ;

}
export default App;
