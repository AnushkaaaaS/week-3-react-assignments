import { useState,useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";
import "./App.css"
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products"),
      fetch("https://fakestoreapi.com/products/categories")
    ])
      .then(async ([productsRes, categoriesRes]) => {

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error();
        }
              const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
 
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);



      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });

  }, []);
 
  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id);
 
    if (found) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  let filteredProducts = products;
 
  if (category !== "all") {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }
 
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }
 
  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }
 
  if (sort === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
  }
 
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
 
  if (loading) {
    return <h2>Loading...</h2>;
  }
 
  if (error) {
    return <h2>{error}</h2>;
  }
 
  return (
    <div className="container">
      <h1> Online Shop</h1>
 
  <div className="top">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
 
    {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
    </select>
 
      <select
       value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>
 
        <h3>Cart: {cartCount}</h3>
      </div>
 
      <div className="main">
        <div className="products">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
 
        <Cart cart={cart} />
      </div>
    </div>
  );
}
 
export default App;