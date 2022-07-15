import React, {useEffect, useState} from 'react';

import { collection, addDoc } from 'firebase/firestore' 
import { db} from '../../Config/firestore';


// import {getAuth,signOut} from 'firebase/auth';
// import firebaseApp from '../../Config/Credenciales'

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal);
// const auth = getAuth(firebaseApp);


function HomeUser({user}) {
    const [, setCorreo] = useState("");
    const [, setUsuarios] = useState("");
    const [,setequipo] = useState("");
    const [tipo, setTipo] =useState("");
    const [FechaInicial, setFechaInicial] = useState("");
    const [FechaFinal , setFechaFinal] = useState("");
    const [comentario, setComentario] = useState("Buen día");
    
    
    const VacacionesCollection = collection(db, "Vacaciones");
  
  
    const Add = async (e) =>{
  
      e.preventDefault();        
  
      await addDoc (VacacionesCollection, 
        {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'],
         ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
         ['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'],
         tipo:tipo,
         FechaInicial:FechaInicial,
         FechaFinal:FechaFinal,
         comentario:comentario        
        })
  
      console.log(e);  
    alert(e);
    //   MySwal.fire({
    //           position: 'center',
    //           icon: 'success',
    //           title: 'Bienvenido Registro hecho con exito !!!',
    //           showConfirmButton: false,
    //           timer: 2500
    //         })    
        
    //     signOut(auth)
  
    }
   
  
    return (
      <div>
   
  
       <form  className="was-validated" 
        onSubmit={Add} 
        >
  
    
    <br/>
  
    <div className="row d-flex justify-content-evenly" >
  <div className="col-5">
  <label className="col-sm-1 col-form-label"> Nombre: </label>
    <input    value={user['NOMBRE COMPLETO']}                      
                          onChange ={()=> setUsuarios(user['NOMBRE COMPLETO'])}  
                          type='text'
                          className='form-control '                                                 
                          disabled
            />
  </div>


  <div className="col-5">
  <label className="col-sm-1 col-form-label"> Email: </label>

    <input
                         value={user['CORREO ELECTRONICO']}                      
                          onChange ={()=> setCorreo(user['CORREO ELECTRONICO'])}  
                          type='text'
                          className='form-control '                                                 
                          disabled/>
  </div>
</div>

<br />



<div className="row d-flex justify-content-evenly" >
  <div className="col-5">
  <label className="col-sm-1 col-form-label">Equipo: </label>
  <input  value={user['EQUIPO DE TRABAJO']}  
                        onChange ={()=> setequipo(user['EQUIPO DE TRABAJO'])}                        
                        type='text'
                        className='form-control '
                        disabled
                        />		
  </div>


  <div className="col-5">
  <label className="col-sm-1 col-form-label">Tipo: </label>
      <select 
            value={tipo}  
            onChange ={(e)=> setTipo(e.target.value)} 
            className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example" 
            required
            >
                          
              <option></option>            
                          <option>Vacaciones</option>
                          <option>Permisos</option>
                          <option>Incapacidad</option>					
                          </select>
                 
  
</div>
  </div>
      
     
  
      
     <div className="row d-flex justify-content-evenly" >
  <div className="col-5">
  <label className="col-sm-1 col-form-label">Fecha Inicial: </label>
  <input  
                          value={FechaInicial}  
                        onChange ={(e)=> setFechaInicial(e.target.value)}                        
                        className='form-control '
                        type="date"
                        />		
  </div>


  <div className="col-5">
      <label className="col-sm-1 col-form-label">Fecha Final: </label>
      <input  value={FechaFinal}  
                        onChange ={(e)=> setFechaFinal(e.target.value)}                        
                        className='form-control '
                        type="date"
                                                />	
                 
  
</div>
  </div>
      
    <br /><br />
  

      <div className="row mb-1 justify-content-center form-floating" >
      <div className="col-sm-5">
      <textarea              
                          placeholder="Deseas colocar un comentario: (opcional)"                                                
                          value={comentario}
                          onChange ={(e)=> setComentario(e.target.value)}
                          type='text'
                          className='form-control is-invalid'                        
                      />
      </div>
      </div>
  

  
  
  <br/><br/>
  
     
  {/* d-flex justify-content-evenly -----Style boton Centrado pero con margin cada uno quedando separaditos  */}
  {/* d-flex justify-content-between -----------------Style Boton en cada esquina  */}
      <div className='d-flex justify-content-around '>
    <div>    
    <button 
  
      Style="padding:11px;"  
      type='submit'  
      className='btn btn-success '  
      
    >   
    <i className="fa-solid fa-arrow-right" />&nbsp;
      Enviar Solicitud
  
   
  
    </button>
      

    </div>
    </div>
  
       </form>
      </div>
  
   )
  
  }

export default HomeUser;