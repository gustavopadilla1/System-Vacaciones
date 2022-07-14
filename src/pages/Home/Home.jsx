import React, { useEffect } from 'react'
import HomeUser from '../HomeUser'
import HomeGerente from '../HomeGerente'
import Appbar from '../../components/Appbar/Appbar'
function Home({user}) {

  return (
    <div>               
      <Appbar/>

        <div Style="margin:16px;">
      <h5 >Bienvenido: {user['NOMBRE CORTO']}</h5> 
      {/* <h6 >{user.rol}</h6> */}
      {/* <h6> hola:  {user.usuario}</h6> */}

     

        {user['NIVEL DE AUTORIDAD'] ==="Colaborador" ?  <HomeUser user={user}/> : <div></div> }
        {user['NIVEL DE AUTORIDAD'] ==="Superior" ?  <HomeGerente user={user}/> : <div></div> }


        </div>
    </div>
  )
}

export default Home
