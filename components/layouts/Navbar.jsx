import { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';

const Nav = styled.nav`
    padding-left: 2rem;
    
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);

        &:last-of-type{
            margin-right: 0;
        }
    }

`;

const Navbar = () => {

    const { usuario } = useContext(FirebaseContext);

    return (
        <Nav>
            <Link href="/">
                <a>
                    Inicio
                </a>
            </Link>
            <Link href="/populars">
                <a>
                    Populares
                </a>
            </Link>
            {
                usuario ? <Link href="/new-product ">
                    <a>Nuevo Producto</a>
                </Link>
                    : null
            }
        </Nav>
    )
}

export default Navbar
