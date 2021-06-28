import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase';

const useProductos = (orden) => {
    const [products, setProducts] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection('productos').orderBy(`${orden}`, 'desc')
                .onSnapshot(manejarSnapshot)
        }
        getProducts();
    }, [])

    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setProducts(productos);
    }

    return {
        products
    }
}

export default useProductos;