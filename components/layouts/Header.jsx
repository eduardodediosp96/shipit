import  { Fragment, useContext } from 'react'
import Search from '../ui/Search'
import Navbar from './Navbar'
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Boton from '../ui/Boton';
import {FirebaseContext} from '../../firebase';

const ContenedorHeader = styled.div`
    max-width:1200px;
    width: 95%;
    margin: 0 auto;
    @media(min-width:768px) {
        display: flex;
        justify-content: space-between;
    }    
`

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    margin-right: 2rem;
`

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);

    return (
        <header
            css={
                css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;    
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                    display: flex;
                    align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Search />
                    <Navbar />
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {
                        usuario ? (
                        <Fragment>
                            <p
                                css={css`
                                margin-right: 2rem;
                                `}
                            >Hola: {usuario.displayName}</p>
                            <Boton
                                bgColor="true"
                                onClick={()=>firebase.logout()}
                                type="button">
                                 Cerrar Sesión
                            </Boton>
                        </Fragment>
                        ) : (
                        <Fragment>
                           <Link href="/login">
                                <Boton
                                  bgColor="true"
                                        >
                                     Login
                                </Boton>
                            </Link>
                            <Link href="/create-account">
                                <Boton>
                                   Crear cuenta
                                </Boton>
                            </Link>
                        </Fragment>
                        )
                    }
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header
