import React ,{useState, useEffect}from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { collection, addDoc, getDocs } from 'firebase/firestore' 
import { db} from '../../Config/firestore'
import { Link } from 'react-router-dom'

export default () => {
  const [Vacaciones, setVacaciones] = useState([]);
  const VacacionesCollection = collection(db, "Vacaciones");

  const getvacaciones = async () => {
    const data = await getDocs(VacacionesCollection)
    setVacaciones(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(Vacaciones)

  }

  useEffect(() => {
    getvacaciones()
  }, [])

 
    return (
      <div>
      <h1 Style="font-family: 'Anek Latin', sans-serif; Font-size: 23px;" className='fst-italic text-center'> Calendario </h1>

      <Link to="/" className='btn btn-primary' >
        <i class="fa-regular fa-rotate-left"></i>
        Volver
      </Link>

<br /> <br />
      <FullCalendar
        plugins={[ dayGridPlugin,  ]}
        initialView="dayGridMonth"
        events={Vacaciones}  
        eventColor= {Vacaciones.color ?? "white"}

       
      />

</div>
    )
  
}