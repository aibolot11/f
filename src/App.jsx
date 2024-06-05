import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Product from './product/Product';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Product Slider</h1>
        <Product />
      </div>
    </Provider>
  );
}

export default App;
