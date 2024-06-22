import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'

const ProductList = ({ onNewProduct }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className='product-list-container'>
      <button className='new'onClick={onNewProduct}>Novo Produto</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price ? `$${product.price.toFixed(2)}` : 'Preço não disponível'}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleDelete(product._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
