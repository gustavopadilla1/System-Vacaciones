import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc,getDoc, startAt } from 'firebase/firestore'
import { db } from '../../Config/firestore'
import {Box, Modal} from '@mui/material'


import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";


import { useParams} from 'react-router-dom'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function TEAMADMIN({ user }) {
    const [Vacaciones, setVacaciones] = useState([]);
    const [Acreditacion, setAcreditacion] = useState(""); 
    const [comentarioSuperior, setcomentarioSuperior] = useState("");
    const VacacionesCollection = collection(db, "Vacaciones");
  
    // /// modal
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

    
   


    //   const update = async (id, Acreditacion) => {
    //     await updateDoc(doc(db, 'Vacaciones', id), {Acreditacion})
    //     console.log(Acreditacion);
        
    //   }

      
    
    //mostrar los VACACIONES
    const getvacaciones = async () => {
        const data = await getDocs(VacacionesCollection)
        console.log(data.docs);
        setVacaciones(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(Vacaciones)

    }

    // use efect  
    useEffect(() => {
        getvacaciones()
        


    }, [])


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


    return (
        <div user={user}>

            {/* boton y elmodal */}
            {/* <Button onClick={handleOpen} variant="contained" color="success" endIcon={<SendIcon />}>Checar</Button> */}
            <br /><br />

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>


  <Box sx={style}>
    {/* contenido del moda --- y en el contenido tenemos todo para registrar el cheque del administrador  */}


    <form 
    // onSubmit={update}
    >


    <label className="col-sm-1 col-form-label">Accion: </label>
          <select                                   value={Acreditacion || ""}                    
                                                    onChange={(e) => setAcreditacion(e.target.value)}
                                                    className="form-select form-select-lg mb-3" aria-label=".form-select-md example"
                                                    required
                                                >
                                                    <option></option>
                                                    <option >Aprobar</option>
                                                    <option>Denegar </option>                                                    
                                                </select>


<div className="row mb-1 justify-content-center" >
      <div className="col-sm-11">
      <textarea              
                          placeholder="Deseas colocar un comentario: (opcional)"                                                
                          value={comentarioSuperior}
                          onChange ={(e)=> setcomentarioSuperior(e.target.value)}
                          type='text'
                          className='form-control'
                      />
      </div>
      </div>
<br />
                                         <button className='btn btn-primary justify-content-center ' >Enviar  </button>       
    </form>


  </Box>
</Modal>



            <br /><br />
            {/* contenido del monitoreo */}
            <div className='' >
                <table className="container">

                    <thead>
                        <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;" >
                        <th scope="col">id</th>
                            <th scope="col">USUARIO</th>
                            <th scope="col">EQUIPO</th>
                            <th scope="col">TIPO</th>                            
                            <th scope="col">FECHA INICIO</th>
                            <th scope="col">FECHA FINAL</th>
                            <th scope="col">ACREDITACION</th>
                            <th scope="col">COMENTARIOS</th>
                        </tr>
                    </thead>
                   

                    {
                        Vacaciones
                            .map((vacacion) => {
                                        if (vacacion['EQUIPO DE TRABAJO'] === "TEAM ADMIN") {
                                            

                                return (

                                    <tbody key={vacacion.id} >
                                        
                                        <tr onClick={handleOpen}  >
                                        <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                    {vacacion.id}
                                                {/* {new Date(vacacion.start).toLocaleDateString("en-US")} */}
                                            </td>
                                                <td >
                                                    <div className="h-25">

                                                        <img src={vacacion.foto ?? 
                                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-circle" style={{ width: 40 }} alt="Avatar" />


                                                        <div style={{ marginLeft: 50, marginTop: -40 }}>
                                                            <a Style="font-family: 'Anek Latin', sans-serif; Font-size: 14px; ">
                                                                {vacacion['NOMBRE COMPLETO']}
                                                            </a>

                                                            <br />
                                                            <p className='fst-italic lh-1' Style="Font-size: 13px;">
                                                                {vacacion['CORREO ELECTRONICO']}
                                                            </p>

                                                        </div>
                                                    </div>
                                                </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion['EQUIPO DE TRABAJO']}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.title}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.start}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.end}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.Acreditacion}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.comentario}
                                            </td>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }

                            }
                            )
                    }
                </table>


                <br /><br />
                <Calendar localizer={localizer} events={Vacaciones}  style={{ height: 700, margin: "50px"}} />
            </div>
        </div>
    )
}

export default TEAMADMIN
