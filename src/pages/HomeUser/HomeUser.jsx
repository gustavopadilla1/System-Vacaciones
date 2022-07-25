import React, {useEffect, useState} from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore' 
import { db} from '../../Config/firestore';
import {Box, Modal} from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Calendario from '../../components/Calendario/Calendario';
import NotificacionGoogle from '../../components/NotificacionGoogle/NotificacionGoogle';

function HomeUser({user}) {
  const [colaboladores, setcolaboladores] = useState([]);
  const [Vacaciones, setVacaciones] = useState([]);

    const [, setCorreo] = useState("");
    const [Usuario, setUsuarios] = useState("");
    const [,setequipo] = useState("");
    const [comentario, setComentario] = useState("");
    const [Acreditacion, setAcreditacion] = useState("En proceso");
    const [title, settitle] = useState("");
    const [start, setstart] = useState("");
    const [end, setend] = useState("");

    const VacacionesCollection = collection(db, "Vacaciones");
    const colaboladoresCollection = collection(db, "colaboladores");

     // /// modal
     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
  

    // Style del modal
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


    const Add = async (e) =>{
  
      e.preventDefault();        
  
      await addDoc (VacacionesCollection, 
        {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'],
         ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
         ['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'],
         comentario:comentario,
         Acreditacion:Acreditacion ,
         title:title,
         start:start,
         end:end,
        })
  alert(e)
      console.log(e);  
    }

    const getvacaciones = async () => {
      const data = await getDocs(VacacionesCollection)
      setVacaciones(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
      console.log(Vacaciones)
  
    }
    //mostrar los colaboradores
    const getcolaboladores = async () => {
      const data = await getDocs(colaboladoresCollection)
      // console.log(data.docs);
      setcolaboladores(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
      console.log(colaboladores)
  
    }
  
    // use efect  
    useEffect(() => {
      getvacaciones()
      getcolaboladores()
    }, [])
  
   function Home() {
return <>
   <div className='d-flex justify-content-end mr-auto p-2'>
      <button className='btn btn-primary'  onClick={handleOpen}>   
              Acreditacion
     </button>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <Link to="/Calendario"  className='btn btn-success' >   
    <i class="fa-regular fa-rotate-left"></i>
               Calendario
    </Link>
 
    </div>     
  
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>


  <Box sx={style}>
      {
      colaboladores.map((Colaborador) =>{
        return( 
          <div key={Colaborador.id}>
  
        
        {
          Vacaciones.map((vacacion)=>{
            if(Colaborador['NOMBRE COMPLETO'] === vacacion['NOMBRE COMPLETO']){
              return(
              

      <div key={vacacion.id}>
                        {/* <p>Fechas</p> 
                          <p>{vacacion.FechaInicial}-{vacacion.FechaFinal}</p> */}
                          <p>Estado</p> 
                           <h6>   {vacacion.Acreditacion} </h6>                     
      </div>

              )
          }
          })      
        }
         </div>
        )
      })
      }
    
  
    





  </Box>
</Modal>


       <form  className="was-validated" 
        onSubmit={Add} 
        >
  
    <br/>
  
    <div className="row d-flex justify-content-evenly" >
  <div className="col-5">
  <label className="col-sm-1 col-form-label"> Nombre: </label>
    <input    value={user['NOMBRE COMPLETO']} 
    elected = {Usuario}                     
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
            value={title}  
            onChange ={(e)=> settitle(e.target.value)} 
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
  <label className="col-sm-1 col-form-label is-invalid">Fecha Inicial: </label>
       <input  
                          value={start}  
                        selected = {start}  
                        onChange ={(e)=> setstart(e.target.value)}                        
                        className='form-control '
                        type="date"
                        required                  
                        />		
  </div>


  <div className="col-5">
      <label className="col-sm-1 col-form-label">Fecha Final: </label>
       <input  
                          value={end}  
                        selected = {end}  
                        onChange ={(e)=> setend(e.target.value)}                        
                        className='form-control '
                        type="date"
                        required                  
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
      Enviar Solicitud
    </button>
      

    </div>
    </div>
  
       </form>

</>
   }


    return (
      <div>
         <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/Calendario' element={<Calendario />} ></Route>
            </Routes>
        </BrowserRouter>
      </div>
   )
  
  }

export default HomeUser;