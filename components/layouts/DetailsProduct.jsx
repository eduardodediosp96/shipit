import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
    padding: 4rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e1e1e1;
`;

const DecripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template.columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    
    :hover {
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    font-size:1.6rem;
    margin: 0;
    color: #888;
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }

    img {
        width: 2rem;
        margin-right: 2rem;
    }

    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;

    }
`;

const Imagen = styled.img`
    width: 200px;
`

const DetailsProduct = ({ product }) => {

    const { id,
        comentarios,
        creado,
        description,
        votos,
        empresa,
        nombre,
        url,
        urlImage } = product

    return (
        <Producto>
            <DecripcionProducto>
                <div>
                    <Imagen src={urlImage} alt="" />
                </div>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{description}</TextoDescripcion>
                    <Comentarios>
                        <div>
                            <img src="data:image/png;base64,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" 
                            alt="" />
                            <p>{comentarios.length}</p>
                        </div>
                    </Comentarios>
                    <p>Publicado hace: {formatDistanceToNow(new Date(creado),
                        { locale: es })}</p>
                </div>
            </DecripcionProducto>

            <div>
                <div>
                    &#9650;
                </div>
                <p>{votos}</p>
            </div>
        </Producto>
    );
}

export default DetailsProduct;