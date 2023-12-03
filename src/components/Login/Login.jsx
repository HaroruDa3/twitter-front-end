import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import LogoTwitter from '../Login/logo-twitter.png'

export const Login = ( {prop1}) => {

    const url = `http://localhost:3000/api/auth`

    const navigate = useNavigate();

    const goToCrearUsuario = () => {
      navigate('/crearUsuario');
    }

    const [formData, setFormData] = useState({
        user_name: "",
        pass: ""
    });

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onHandleSubmit = async (event) => {
        event.preventDefault();
        console.log("dentro");
        const result = await axios.post(url, formData,  { withCredentials : true }  );
        const resultData = (await result).data;
    
        if (result.status === 200){
          prop1(true);
          navigate('/wall')
        }
      
        if (result.status === 404){
          console.log("Inicio de Sesion No Exitoso");
        }
    
    }

  return (
    <section>
        <div id='conteneder-form'>
            <div id='form-body'>
                <div>
                    <img className='h-100' src={LogoTwitter} alt="" />
                </div>
                <h3 className='text-center fw-bold'>Iniciar Sesion</h3>

                <form className='w-100 d-flex flex-column mt-3 align-items-center' onSubmit={onHandleSubmit}>
                    <div class="form-group w-75">
                        <label className='mb-1' for="username">Usuario:</label>
                        <input type="text" class="form-control" name = "user_name" onChange={onHandleChange} required/>
                    </div>
                    <div class="form-group w-75 mb-3">
                        <label className='mb-1' for="password">Contraseña:</label>
                        <input type="password" class="form-control"  name="pass"  onChange={onHandleChange} required/>
                    </div>
                    <button type="submit" class="btn btn-primary w-75">Entrar</button>
                </form>
                <div className='h-25 w-100 d-flex align-items-center'>
                    <button onClick={goToCrearUsuario} className='btn text-white'>Registrarme</button>
                </div>
            </div>
        </div>
    </section>
  )
}
