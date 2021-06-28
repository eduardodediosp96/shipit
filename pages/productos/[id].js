import { useRouter } from "next/router";
import { css } from '@emotion/core';
import { es } from 'date-fns/locale';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FirebaseContext } from '../../firebase';
import { useContext, useEffect, useState } from "react";
import styled from '@emotion/styled';
import Error404 from "../../components/layouts/404";
import Layout from '../../components/layouts/Layout';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
import React from 'react';
import { route } from "next/dist/next-server/server/router";

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center; 
`;


const Producto = () => {

    // state del componente 
    const [producto, setProducto] = useState('');
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    // Router para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    // pasando context
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productQuery.get();
                if (producto.exists) {
                    setProducto(producto.data());
                    setConsultarDB(false);
                } else {
                    setError(true);
                    setConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id])

    if (Object.keys.length === 0 && !error) return 'Cargando...';

    const { comentarios,
        creado,
        description,
        votos,
        empresa,
        nombre,
        url,
        urlImage,
        creador,
        haVotado
    } = producto;

    // Administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }

        // Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) return;

        // Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];


        // Actualizar en la base de datos
        firebase.db.collection('productos').doc(id)
            .update({ votos: nuevoTotal, haVotado: nuevoHaVotado })

        setProducto({
            ...producto,
            votos: nuevoTotal
        });
    }

    // Funciones para crear comentarios
    const comentarioChange = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
        setConsultarDB(true);
    }

    // identifica si el comentario es el creador del producto
    const esCreador = (id) => creador.id === id ? true : false;

    const agregarComentario = (e) => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/');
        }

        // Informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la base de datos
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });

        // Actualizar el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        });

        setConsultarDB(true);
    }

    const puedeBorrar = () => creador.id === usuario.id ? true : false;

    const eliminarProducto = async () => {
        if(!usuario) {
            return router.push('/'); 
        }

        if(!creador.id !== usuario.id) {
            return router.push('/'); 
        }
        
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/'); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            {error ? <Error404 />
                : (
                    <div className="contenedor">
                        <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}>{nombre}</h1>
                        <ContenedorProducto>
                            <div>
                                <img src={urlImage} alt="" />
                                <p>{description}</p>
                                {
                                    usuario && <>
                                        <h2>Agrega un comentario</h2>
                                        <form onSubmit={agregarComentario}>
                                            <Campo>
                                                <input
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <InputSubmit
                                                type="submit"
                                                value="Agregar comentario"
                                            />
                                        </form>
                                    </>
                                }
                                <h2 css={css`
                            margin: 2rem 0;

                        `}>Comentarios</h2>
                                {comentarios?.length === 0 ? 'Aun no hay comentarios'
                                    : (
                                        <ul>
                                            {comentarios?.map((comentario, idx) => (
                                                <li key={idx * Math.random() * 2340}
                                                    css={css`
                                            border: 1px solid #e1e1e1;
                                            padding:2rem;
                                        `}
                                                >
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por:
                                                <span css={css`font-weight: bold;`}>
                                                            {comentario.usuarioNombre}
                                                        </span>
                                                    </p>
                                                    {esCreador(comentario.usuarioId) &&
                                                        (<CreadorProducto>Es creador</CreadorProducto>)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                            <aside>
                                <Boton
                                    target="_blank"
                                    bgColor="blue"
                                    href={url}
                                >Visitar Url</Boton>

                                <p>Publicado por: {creador?.nombre}</p>

                                <div css={css`
                            margin-top: 5rem;
                        `}>
                                    <p css={css`
                            text-align: center;
                        `}>{votos} votos</p>
                                    {usuario &&
                                        <Boton
                                            onClick={votarProducto}
                                        >Votar</Boton>
                                    }
                                </div>
                            </aside>
                        </ContenedorProducto>
                        {puedeBorrar &&
                            <Boton
                            onClick={eliminarProducto}
                            >Eliminar Producto</Boton>
                        }
                    </div>
                )
            }

        </Layout>
    );
}

export default Producto;