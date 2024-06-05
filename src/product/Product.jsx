import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, nextProduct, prevProduct } from './productSlice';
import styles from './Product.module.css';

const Product = () => {
  const dispatch = useDispatch();
  const { product, status, error, currentProductId } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(currentProductId));
  }, [currentProductId, dispatch]);

  const handleNext = () => {
    dispatch(nextProduct());
  };

  const handlePrev = () => {
    dispatch(prevProduct());
  };

  let content;

  if (status === 'loading') {
    content = <p>Загрузка...</p>;
  } else if (status === 'succeeded') {
    content = (
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <img src={product.thumbnail} alt={product.title} />
      </div>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className={styles.product}>
      {content}
      <div className={styles.buttons}>
        <button onClick={handlePrev} disabled={currentProductId === 1}>
          Назад
        </button>
        <button onClick={handleNext}>
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Product;

