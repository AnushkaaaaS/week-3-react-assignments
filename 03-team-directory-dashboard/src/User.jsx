function User({ user, handleUserClick }) {
  return (
    <div className="user" onClick={() => handleUserClick(user)}>
       
       
       <h2>{user.name}</h2>
      <p>{user.company.name}</p>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
    </div>
  );
}
 
export default User;