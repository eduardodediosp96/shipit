import DetailsProduct from '../components/layouts/DetailsProduct';
import Layout from '../components/layouts/Layout'; 
import useProductos from '../hooks/useProducts';

const Home = () => {

  const {products} = useProductos('votos');

  return (
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
  )
}

export default Home;