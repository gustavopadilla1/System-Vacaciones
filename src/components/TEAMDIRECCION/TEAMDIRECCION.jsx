import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc,getDoc } from 'firebase/firestore'
import { db } from '../../Config/firestore'
import {Box, Modal} from '@mui/material'

// import { useParams} from 'react-router-dom'


function TEAMDIRECCION({ user }) {
    const [Vacaciones, setVacaciones] = useState([]);
    const [status, setstatus] = useState("")
    // const [Status, setStatus] = useState("");
    
    const VacacionesCollection = collection(db, "Vacaciones");
  
    // /// modal
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

    //   const update = async (e) =>{
    //     e.preventDefault();        
    //     const Vacacion= doc(db, "Vacaciones", id)
    //     const data = {Status:Status}
    //     await updateDoc(Vacacion, data)
    
    //     console.log(e);  
    //   alert(e);
      
    //   }

    //   const getUsuariosById = async (id) =>{

    //  const Vacacion = doc(db, "Vacaciones", id)
    
                   
    //         console.log(Vacacion.data());                   
    //         setStatus(Vacacion.data().Status)

        
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
        // getUsuariosById(id)

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
          <select
                                                    value={status}
                                                    onChange={(e) => setstatus(e.target.value)}
                                                    className="form-select form-select-lg mb-3" aria-label=".form-select-md example"
                                                    required
                                                >

                                                    <option></option>
                                                    <option>Aprobar</option>
                                                    <option>Denegar </option>
                                                    
                                                </select>
                                         <button className='btn btn-primary' >Confirmar </button>       
    </form>


  </Box>
</Modal>



            <br /><br />
            {/* contenido del monitoreo */}
            <div className='' >
                <table className="container">

                    <thead>
                        <tr Style="font-family: 'Heebo', sans-serif; Font-size: 14px;" >
                            <th scope="col">USUARIO</th>
                            <th scope="col">EQUIPO</th>
                            <th scope="col">FECHA INICIO</th>
                            <th scope="col">FECHA FINAL</th>
                            <th scope="col">COMENTARIOS</th>

                        </tr>
                    </thead>
                   


                    {
                        Vacaciones
                            .map((vacacion) => {
                                        if (vacacion['EQUIPO DE TRABAJO'] === "TEAM DIRECCION") {
                                            
                                        
                                return (

                                    <tbody key={vacacion.id} >
                                        
                                        <tr onClick={handleOpen} >
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
                                                {vacacion.FechaInicial}
                                            </td>
                                            <td
                                                Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;" >
                                                {vacacion.FechaFinal}
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

            </div>
        </div>
    )
}

export default TEAMDIRECCION
