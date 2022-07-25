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
    font-family: sans-serif;
    background: linear-gradient(to right, #b92b27, #1565c0)
    margin-bottom:20px;
    border:none;
    width: 500px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #191919;
    text-align: center;
    transition: 0.25s;
    margin-top: 100px
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
    color: white;
    text-transform: uppercase;
    font-weight: 500
    width: 300px;
    border-color: #2ecc71
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
    background: #2ecc71
    text-decoration: underline
    list-style: none;
    display: inline;
    margin-left: 0 
    padding: 0
    display: inline;
    margin: 0 5px
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 50px;
    margin-bottom: 100px;
  "
    >
      <div className="d-grid gap-2 col-12 mx-auto">
        <button className="btn btn- btn-lg" onClick={loginGogle} type="button">Solicitar Vacaciones</button>
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