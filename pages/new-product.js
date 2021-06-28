import Layout from '../components/layouts/Layout';
import { Campo, Formulario, InputSubmit, Error } from '../components/ui/Formulario';
import { css } from '@emotion/core';
import  { FirebaseContext } from '../firebase';
import { useState, useContext } from 'react';
import FileUploader from 'react-firebase-file-uploader';
// validaciones
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validators/validateNewProduct';
import Router, {useRouter} from 'next/router';
import React from 'react';
import Error404 from '../components/layouts/404';
const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  //imagen: '',
  url: '',
  description:''
}

const NewProduct = () => {
  // State de las imagenes
  const [nameImage, setNameImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('');

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INICIAL, validateNewProduct , createProduct);

  const { nombre, empresa, imagen, url, description } = valores;
  const [successCreation, setSuccessCreation] = useState(false);
  const [errorCreation, setErrorCreation] = useState(false);

  // hook de routing
  const router = useRouter();

  // Context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    // Si el usuario no esta autenticado
    if(!usuario) {
      router.push('/login');
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImage,
      description,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: []
    }

    // insertar en la base de datos
    firebase.db.collection('productos').add(producto);
    return router.push('/');
  }

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  }

  const handleOnProgress = (progreso) => setProgress({progreso});

  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  }

  const handleUploadSuccess = (name) => {
    setProgress(100);
    setUploading(false);
    setNameImage(name);
    firebase.storage
    .ref('productos')
    .child(name)
    .getDownloadURL()
    .then((url) => setUrlImage(url));
  }

  if(!usuario) return null; 

  return (
    <div>
      <Layout>
        {!usuario ? <Error404/> :
          <>
                    <h1
          css={css`
            text-align: center;
            margin-top: 5em;
            `
          }
        >Nuevo Producto</h1>

        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset>
            <legend>Información General</legend>
          <Campo>
            <label htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Escribe tu nombre..."
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
          <Campo>
            <label htmlFor="empresa">
              Empresa
            </label>
            <input 
              id="empresa"
              placeholder="Escribe el nombre de la empresa o compañia..."
              name="empresa"
              value={empresa}
              onChange={handleChange}
              onBlur={handleBlur}
              />
          </Campo>
          {errores.empresa && <Error>{errores.empresa}</Error>}
           <Campo>
            <label htmlFor="imagen">
              Imagen
            </label>
            <FileUploader 
              accept="image/*"
              id="imagen" 
              name="imagen"
              randomizeFilename
              storageRef={firebase.storage.ref('productos')}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleOnProgress}
              />
          </Campo>
          <Campo>
            <label htmlFor="url">
              Url
            </label>
            <input 
              type="url" 
              id="url"
              name="url"
              value={url}
              onChange={handleChange}
              onBlur={handleBlur}
              />
          </Campo>
          {errores.url && <Error>{errores.url}</Error>}
          </fieldset>
          <fieldset>
            <legend>Sobre tu producto</legend>
            <Campo>
            <label htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              onBlur={handleBlur}
              />
          </Campo>
          {errores.description && <Error>{errores.description}</Error>}
          </fieldset>

          {errorCreation ? <Error>{errorCreation}</Error> : null}
          <InputSubmit
            type="submit"
            value="Crear Producto"
          />
        </Formulario>
        {successCreation && <p>Usuario creado exitosamente</p>}

          </>
        }
      </Layout>
    </div>
  )
}

export default NewProduct;