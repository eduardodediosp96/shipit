import DetailsProduct from '../components/layouts/DetailsProduct';
import Layout from '../components/layouts/Layout'; 
import useProductos from '../hooks/useProducts';

const Populars = () => {

  const {products} = useProductos('votos');

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                products.map((product) => (
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
    </div>
  )
}

export default Populars;