function Product({ product, addToCart }) {
  return (
    <div className="product">
      <img src={product.image} />
 
      <h3>{product.title}</h3>
 
      <p>Price: ${product.price}</p>
 
      <p>Rating: {product.rating.rate}</p>
 
      <button onClick={() => addToCart(product)}>Add to Cart
      </button>
    </div>
  );
}
 
export default Product;