import Layout from '../components/layouts/Layout'; 
import {useRouter} from 'next/router';
import { useProductos } from '../hooks/useProducts';
import { useEffect, useState } from 'react';

const Search = () => {

  const router = useRouter();
  const {query: {q}} = router; 
  const {products} = useProductos('votos');
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = products.filter((product) => product.nombre.toLowerCase().includes(busqueda));
    setResultado(filtro);
  }, [q, products])

  return (
    <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                resultado.map((product) => (
                  <DetailsProduct 
                    key={product.id}
                    product={product}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
  )
}

export default Search; 