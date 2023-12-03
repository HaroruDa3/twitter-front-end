import { useState, useEffect } from "react"
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom"
import {Login} from '../src/components/Login/Login'
import {SignIn} from '../src/components/SignIn/SignIn' 
import { Wall } from "../src/components/Wall/Wall"
import { Posts } from "../src/components/Post/Posts"
import axios from "axios"

function App() {
  const [inicioSesion, setInicioSesion] = useState(false);
  const [inicioSesionInfo , setInicioSesionInfo] = useState({});

  const validarCookie = async ( )=>{

    const ulrValidar = 'http://localhost:3000/api/auth'
    const result = await axios.get(ulrValidar,  { withCredentials:true} );
    const resultData = (await result).data;

    if (result.status ===200){
      setInicioSesion(true);
      setInicioSesionInfo(resultData);
    }
  }

  useEffect ( ()=>{
    validarCookie();
  } ,  [] );

  return (
    <>
    <BrowserRouter>
      <Routes>
        {  inicioSesion ? (<Route path="/"  element={<Wall/>}/ >) :  
                          <Route path="/" element ={<Login prop1 = {setInicioSesion}  />} /> }
        <Route path="/crearUsuario" element ={<SignIn/>}></Route>
        { inicioSesion ?  (<Route path="/crearPost" element ={<Posts infoUsuario = {inicioSesionInfo} />} />) : <></> }
        { inicioSesion ? (<Route path="/wall" element ={<Wall/>} />) :<></> }
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
