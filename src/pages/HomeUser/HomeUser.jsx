import React, {useEffect, useState} from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore' 
import { db} from '../../Config/firestore';
import {Box, Modal} from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Calendario from '../../components/Calendario/Calendario';
import NotificacionGoogle from '../../components/NotificacionGoogle/NotificacionGoogle';
import sendCustomEmail from '../../components/NotificacionGoogle/sendCustomEmail';

function HomeUser({user}) {
  const [colaboladores, setcolaboladores] = useState([]);
  const [Vacaciones, setVacaciones] = useState([]);

    const [, setCorreo] = useState("");
    const [Usuario, setUsuarios] = useState("");
    const [,setequipo] = useState("");
    const [comentario, setComentario] = useState("");
    const [DiasDisponibles, setDiasDisponibles] = useState("")
    const [DiasSolicitados, setDiasSolicitados] =useState("");
    const[,setSupervisor]=useState("")

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
    
    if(DiasSolicitados <= user.Dias){
        

      await addDoc (VacacionesCollection, 
        {['CORREO ELECTRONICO']:user['CORREO ELECTRONICO'],
         ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
         ['EQUIPO DE TRABAJO']:user['EQUIPO DE TRABAJO'],
         comentario:comentario,
         Acreditacion:Acreditacion ,
         title:title,
         start:start,
         end:end,
         DiasDisponibles: user.Dias,
         DiasSolicitados:DiasSolicitados,
        })
       
        alert("Registro exitoso")

      console.log(e);  
      
      let correo = e.target.correo.value;
      let asunto = e.target.asunto.value;
      let nombre = e.target.nombre.value;
      let fechai= e.target.fechai.value;
      let fechaf= e.target.fechaf.value;

      sendCustomEmail(correo, asunto, nombre, fechai, fechaf);
		e.target.correo.value = e.target.asunto.value = e.target.nombre.value = 
    e.target.solicitud.value = e.target.fechai.value = e.target.fechaf.value = '';
  }
  
  else{
    alert("Los dias sobre pasan los disponibles")
  }
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
<br />
<div className="alert alert-success" role="alert" >
   <h6>Tienes <b>{user.Dias}</b> disponible, Disfrutalos y Aprovechalos al maximo !!! </h6>   
</div>  

   <div className='d-flex justify-content-end mr-auto p-2'>
      <button className='btn btn-primary'  onClick={handleOpen}>   
              Acreditacion
     </button>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <Link to="/Calendario"  className='btn btn-success' >   
    <i className="fa-regular fa-rotate-left"></i>
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
    selected = {Usuario}          
                           name="nombre"     
           
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
  <label className="col-sm-1 col-form-label">Superior: </label>
  <input    value={user['CORREO ELCTRONICO DEL SUPERVISOR']} 
                          name="correo" 
                          onChange ={()=> setSupervisor(user['CORREO ELCTRONICO DEL SUPERVISOR'])}  
                          type='text'
                          className='form-control '                                                 
                          disabled
            />		
  </div>



  <div className="col-5">
  <label className="col-sm-1 col-form-label">Tipo: </label>
      <select  
            name="asunto"
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
      
      <br />
     
  
      
     <div className="row d-flex justify-content-evenly" >

     <div className="col-3">
  <label className="col-sm-1 col-form-label is-invalid">Dias: </label>
       <input  
                        value={DiasSolicitados}
                        onChange ={(e)=> setDiasSolicitados(e.target.value)}                                  
                        className='form-control '
                        type="Number"
                        required                  
                        />		
  </div>

  <div className="col-3">
  <label className="col-sm-1 col-form-label is-invalid">Inicial: </label>
       <input  
                        name="fechai"     
                        value={start}  
                        selected = {start}  
                        onChange ={(e)=> setstart(e.target.value)}                        
                        className='form-control '
                        type="date"
                        required                  
                        />		
  </div>


  <div className="col-3">
      <label className="col-sm-1 col-form-label"> Final: </label>
       <input  
                          name="fechaf"     
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