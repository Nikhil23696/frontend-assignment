'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // client side caching
  useEffect(() => {
    const key = `product-${product.id}`
    const cached = localStorage.getItem(key);
    if(!cached){
      localStorage.setItem(key, JSON.stringify(product))
    }
  },[product.id])
  const prod =  product;

  // BUG 1: No default color selected
  const [selectedColor, setSelectedColor] = useState( prod.variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState('');

  // BUG 2: Always shows first variant's sizes regardless of selected color
  const variantForColor = prod.variants.find(
    (v) => v.color === selectedColor
  );
  const availableSizesForColor = variantForColor?.sizes || [];

  // BUG 6: Empty dependency array - won't reset when color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  // BUG 5: Only checks size, not color
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };
  // save to recently viewed
  useEffect(() => {
    let viewed = JSON.parse(localStorage.getItem('recent') || '[]')
    viewed = [
       { id: prod.id, name: prod.name, imageUrl: prod.imageUrl, price: prod.price },
      ...viewed.filter((p) => p.id !== prod.id)
    ].slice(0,3);
    localStorage.setItem('recent', JSON.stringify(viewed));
  },[prod.id])

  return (
    <>
      <ProductDetails
        product={prod}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
