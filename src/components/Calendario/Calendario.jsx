import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firestore'
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
    <div class="col v-center">
      <table Style="" class="table col v-center">
        <thead>
          <tr>
            <th scope="col-1"class="table table-sm">Color/Significado</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr class="card-body d-flex justify-content-between align-items-center">
            <th scope="row" class="bg-danger">1</th>
            <td class="table table-sm">Rechazado</td>
          </tr>
          <tr class="card-body d-flex justify-content-between align-items-center">
            <th scope="row" class="bg-success">2</th>
            <td class="table table-sm">Aprobado</td>
          </tr>
        </tbody>
      </table>
      <h1 Style="font-family: 'Anek Latin', sans-serif; Font-size: 23px;" className='fst-italic text-center'>Calendario</h1>

      <Link to="/" className='btn btn-primary'>
        <i class="fa-regular fa-rotate-left"></i>
        Volver
      </Link>

      <br /> <br />
      <FullCalendar
        plugins={[dayGridPlugin,]}
        initialView="dayGridMonth"
        events={Vacaciones}
        eventColor={Vacaciones.color ?? "white"}
        eventAdd={Vacaciones.id}

      />

    </div>
  )

}