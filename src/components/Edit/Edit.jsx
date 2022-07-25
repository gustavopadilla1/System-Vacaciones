import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getDoc, updateDoc, doc} from 'firebase/firestore'
import {db} from '../../Config/firestore';
import { Box } from '@mui/material';

const Edit = () => {

  const [Acreditacion, setAcreditacion] = useState("");
  const [comentarioSuperior, setcomentarioSuperior] = useState("");
  const [color, setColor] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();

  const[Final, setFinal] =useState(Acreditacion,color)


  const update = async (e) =>{
    e.preventDefault()
 
    const vacacion= doc(db, "Vacaciones", id)
    const data = {Acreditacion, color}
    await updateDoc(vacacion, data)
    navigate('/');
  }

  const getUsuariosById = async (id) =>{
    const vacacion = await getDoc(doc (db, 'Vacaciones', id));
    
      if (vacacion.exists()) {        
        console.log(vacacion.data());         
        setAcreditacion(vacacion.data().Acreditacion)
      }else{
        console.log("el usuario no existe");
      }
  }

const ok=  ()=>{
if (Acreditacion==="Aprobar") {
  setColor("green")
}else{
  setColor("red")
}
return color;
}

  useEffect(()=>{
    getUsuariosById()
 
  }, [] ) 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
   
    boxShadow: 24,
    p: 9,
};



  return (
<Box sx={style}>
                    {/* contenido del moda --- y en el contenido tenemos todo para registrar el cheque del administrador  */}

                    <form
                    onSubmit={update}
                    >

                        <label className="col-sm-1 col-form-label">Accion: </label>
                        <select value={Acreditacion}
                            onChange={(e) => setAcreditacion(e.target.value)}
                            className="form-select form-select-lg mb-3" aria-label=".form-select-md example"
                            required
                        >
                            <option></option>
                            <option>Aprobar</option>
                            <option>Denegar </option>
                        </select>


                        <div className="row mb-1 justify-content-center" >
                            <div className="col-sm-11">
                                <textarea
                                    placeholder="Deseas colocar un comentario: (opcional)"
                                    value={comentarioSuperior}
                                    onChange={(e) => setcomentarioSuperior(e.target.value)}
                                    type='text'
                                    className='form-control'
                                />
                            </div>
                        </div>
                        <br />
                        <button className='btn btn-primary justify-content-center' onClick={ok}>Enviar  </button>
                    </form>


                </Box>
  )
}

export default Edit
