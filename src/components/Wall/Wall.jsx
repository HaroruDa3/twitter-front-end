import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './wall.css';
import LogoTwitter from '../Login/logo-twitter.png';
import iconUsr from '../Wall/icono-user.png';

export const Wall = ({ infoUsuario }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [datoFormulario, setDatosFormularios] = useState({
    twitt: '',
    user_name: infoUsuario.user_name,
  });

  const getDataPost = async () => {
    try {
      const urlGetPost = 'http://localhost:3000/api/posts';
      const result = await axios.get(urlGetPost);
      const resultData = result.data;
      setPosts(resultData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getDataPost();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosFormularios({ ...datoFormulario, [name]: value });
  };

  function cerrarSesion() {
    const cookieName = 'myCookie';
    document.cookie = `${cookieName}=; expires=0; path=/;`;
  }

  const postearTwitt = async () => {
    try {
      const url = 'http://localhost:3000/api/posts';
      const result = await axios.post(url, datoFormulario, { withCredentials: true });
      if (result.status === 200) {
        Swal.fire({
          title: 'POST EXITOSO',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        });
      }
    } catch (error) {
      console.error('Error posting twitt:', error);
    }
  };

  return (
    <>
      <section className='w-100 h-100'>
        <div id="contenedor-info">
          <div id="navbar">
            <div className="w-25 h-100">
              <img className="h-100" src={LogoTwitter} alt="" />
            </div>
            <div className="w-25 d-flex justify-content-center align-items-center">
              <h2 className="text-white">Twitts</h2>
            </div>
            <div className="h-75 w-50 d-flex justify-content-end align-items-center">
              <div className="h-50 w-25">
                <button
                  className="w-100 h-100 btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  type="button"
                >
                  Crear Post
                </button>
              </div>
              <div className="h-50 w-25 mx-3">
                <button
                  onClick={cerrarSesion}
                  className="w-100 h-100 btn btn-danger"
                  type="button"
                >
                  Cerrar Sesion
                </button>
              </div>
            </div>
          </div>
          <div className='space'></div>

          <div className="container pb-5">
            {posts.map((post) => (
              <div className="twitt">
                <div className="encabezado">
                  <div className="icono">
                    <img className="h-100" src={iconUsr} alt="" />
                  </div>
                  <div className="mx-3 d-flex w-100 align-items-center justify-content-between fw-bold text-white">
                    <div>{post.user_name}</div>
                    <div>{post.formatted_create_date}</div>
                  </div>
                </div>
                <div className="cuerpo-twitt">
                  <p>{post.twitt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear Twitt
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="">Escribe tu twitt: </label>
              <div className="input-group h-auto">
                <textarea
                  className="form-control flex-grow-1"
                  name="twitt"
                  aria-label="With textarea"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={postearTwitt}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Postear Twitt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
