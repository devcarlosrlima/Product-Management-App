import React, { useState } from 'react';
import axios from 'axios';
import './styleform.css'

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, available };
    await axios.post('http://localhost:3002/products', newProduct);
    onProductAdded();
  };

  return (
    <div className='productform'>
    <h1 className='formTitle'> Cadastre um Novo Produto</h1>

    <form className='form-container' onSubmit={handleSubmit}>
      <label htmlFor="product"></label>
      <input
        type="text"
        placeholder="Nome do produto"
        name='product'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description"></label>
      <textarea
        placeholder="Descrição do produto"
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="price"></label>
      <input
        type="number"
        name='price'
        placeholder="Valor do produto"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>
        Disponível para venda:
        <select
          value={available}
          onChange={(e) => setAvailable(e.target.value === 'true')}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

      </label>
      <button type="submit">Cadastrar</button>
    </form>
    </div> 
  );
};

export default ProductForm;
