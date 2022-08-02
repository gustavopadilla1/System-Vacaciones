import React, { useState } from 'react'
import { Auth, google } from '../../Config/GogleAuth';

function AuthGoogle() {
  const [, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [displayName, setDisplayName] = useState(null);


  const loginGogle = () => {
    Auth.signInWithPopup(google)
      .then(res => {
        console.log(res.user);
        setUser(res.user);
        setPhoto(res.user.photoURL)
        setDisplayName(res.user.displayName)
      }).catch(err => {
        console.log(err);
      })
  }
  return (
    <div
      Style="
      margin: 0;
	padding: 0;
	box-sizing: border-box;
  height: 2000px;
	background-color: red;
	background-image: url(https://upload.wikimedia.org/wikipedia/commons/6/64/Creaci%C3%B3n_de_Ad%C3%A1n_%28Miguel_%C3%81ngel%29.jpg);
	background-size: 100% auto;
	background-position: top center;
	background-attachment: fixed;
  height: 100%;
	background-size: 100% 100%;
	mix-blend-mode: difference;
  min-height:550px ;
      max-width:1000px;
      margin:100px auto;
      border-radius:25px;
      color:#fff;
      flex-direction:column;
      overflow:hidden;
      animation: hi 0.5s;
      box-sizing:border-box;
      flex:1;
      white-space:nowrap;
      position:relative;
      transition:all 0.4s;
     "
    >
      <div class="container-fluid h-100"> 
      <div class="col v-center">
        <button className="btn btn-primary mx-auto" onClick={loginGogle} type="button">Solicitar Vacaciones</button>
      </div>
      </div>
      <br />

      {photo ?
        <div>
          <img height='100' src={photo} alt="imagen no definidad" />
          <br />
          <br />
          <h5>Bienvenido:</h5>
          <p>{displayName}</p>

        </div>
        :
        <span></span>
      }

    </div>
  )
}

export default AuthGoogle
/*font-family: 'Raleway', sans-serif;
      min-height:0px auto;
      max-width:250px;
      margin:100px auto;
      border-radius:25px;
      color:#fff;
      flex-direction:column;
      overflow:hidden;
      animation: hi 0.5s;
      box-sizing:border-box;
      flex:1;
      white-space:nowrap;
      position:relative;
      transition:all 0.4s;
      background:linear-gradient(to left, #955DFF, #6FAAFF);*/