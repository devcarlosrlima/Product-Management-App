import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import './App.css'

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div> 
      <h1 className='listTitle'>Produtos Cadastrados</h1>
     
      <div>
        {showForm ? (
          <ProductForm onProductAdded={() => setShowForm(false)} />
        ) : (
          <ProductList onNewProduct={() => setShowForm(true)} />
        )}
      </div>
    </div>
  );
};

export default App;
