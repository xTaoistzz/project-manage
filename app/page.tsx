"use client"
import { useEffect, useState } from 'react';

async function GetData() {
  const res = await fetch('https://dummyjson.com/products/');
  const data = await res.json(); // Parse the response as JSON
  return data.products; // Assuming the data has a "products" field containing the list of products
}

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetData();
      setProducts(data);

    };
    console.log(products)
    fetchData();
  }, []);

  return (
    <div>

    </div>
  );
};

export default Home;