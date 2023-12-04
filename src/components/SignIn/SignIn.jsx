import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signin.css'
import LogoTwitter from '../Login/logo-twitter.png'

export const SignIn = () => {

    const navigate = useNavigate();
    const goToLogin= () => {
      navigate('/');
    }


    const url = 'http://localhost:3000/api/users';
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        pass: ""

    });

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name] : value});

    };

    const handleSubmit = async (event)=>{
        event.preventDefault();    
        const result = await axios.post(url, formData);
        const data = (await result).data;

        console.log(data);
        

        if(data.status==200){
            Swal.fire({
              title: 'REGISTRO EXITOSO',
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                goToLogin();
              }
            });
        }

    }

  return (
    <section>
    <div id='conteneder-form-registro'>
        <div >
            <div id='irLogin'>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={goToLogin} type='button' className="icon icon-tabler icon-tabler-arrow-narrow-left mx-4" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l14 0" />
                <path d="M5 12l4 4" />
                <path d="M5 12l4 -4" />
            </svg>
            </div>
            <div>
                <img className='h-100' src={LogoTwitter} alt="" />
            </div>
            <h3 className='text-center fw-bold'>Registro</h3>

            <form className='w-100 d-flex flex-column mt-3 align-items-center' onSubmit={handleSubmit}>
                <div className="form-group w-75">
                    <label className='mb-1' >Usuario:</label>
                    <input type="text" className="form-control" name = "user_name" onChange={onHandleChange} required/>
                </div>
                <div className="form-group w-75">
                    <label className='mb-1' >Correo Electronico:</label>
                    <input type="email" className="form-control" name = "email" onChange={onHandleChange} required/>
                </div>
                <div className="form-group w-75 mb-3">
                    <label className='mb-1' >Contraseña:</label>
                    <input type="password" className="form-control"  name="pass"  onChange={onHandleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary w-75">Entrar</button>
            </form>
        </div>
    </div>
</section>
  )
}
