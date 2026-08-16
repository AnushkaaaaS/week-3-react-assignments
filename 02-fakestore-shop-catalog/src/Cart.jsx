function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity,0
  );
 
  return (
    <div className="cart">
      <h2>Your Cart</h2>
 
      {cart.length === 0 ? (
        <p>Cart is empty. Add products</p>
      ) : (cart.map((item) => (<div className="cartItem" key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>${item.price}</p>
          </div>
        ))
      )}
 
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
 
export default Cart;