import { useEffect, useState } from "react";
import User from "./User";
import "./App.css";
 
function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("name")

 
  const [selectedUser, setSelectedUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [todos, setTodos] = useState([])
 
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false)
  const [todosLoading, setTodosLoading] = useState(false)
 
  const [error, setError] = useState("")
  const [postsError, setPostsError] = useState("")
  const [todosError, setTodosError] = useState("")
 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);
 
  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    let cancelled = false;
    setPostsLoading(true);
    setTodosLoading(true);
    setPostsError("");
    setTodosError("");
    fetch(
      `https://jsonplaceholder.typicode.com/users/${selectedUser.id}/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })


      
      
         
      
      
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setPostsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPostsError("Failed to load posts");
          setPostsLoading(false);
        }
      });
 
    fetch(


      `https://jsonplaceholder.typicode.com/users/${selectedUser.id}/todos`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setTodos(data);
          setTodosLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTodosError("Failed to load todos");
          setTodosLoading(false);
        }
      });
 
    return () => {
      cancelled = true;
    };
  }, [selectedUser]);
 
  function handleUserClick(user) {
    setSelectedUser(user);
  }
 
  function closeUser() {
    setSelectedUser(null);
    setPosts([]);
    setTodos([]);
  }
 
  let filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase())
  );
 
  filteredUsers = [...filteredUsers].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
 
    return a.company.name.localeCompare(b.company.name);
  });
 
  if (loading) {
    return <h2>Loading...</h2>;
  }
 
  if (error) {
    return <h2>{error}</h2>;
  }

  
 
  if (selectedUser) {
    return (
      <div className="container">
        <button onClick={closeUser}>Close</button>
 
        <div className="details">
          <h1>{selectedUser.name}</h1>
          <p><b>Company:</b> {selectedUser.company.name}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>City:</b> {selectedUser.address.city}</p>
        </div>
 
        <h2>Posts</h2>
 
        {postsLoading && <p>Loading posts...</p>}
 
        {postsError && <p>{postsError}</p>}
 
        {!postsLoading &&
          !postsError &&
          posts.map((post) => (
            <div className="box" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
 
        <h2>Todos</h2>
 
        {todosLoading && <p>Loading todos...</p>}
 
        {todosError && <p>{todosError}</p>}
 
        {!todosLoading &&
          !todosError &&
          todos.map((todo) => (
            <div className="box" key={todo.id}>
              <p>{todo.title}</p>
              <p>
                {todo.completed ? "Done" : "Not Done"}
              </p>
            </div>
          ))}
      </div>
    );
  }
 
  return (
    <div className="container">
      <h1>Team Directory</h1>
 
      <input
        type="text"
        placeholder="Search by name or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
 


      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="company">Sort by Company</option>
      </select>
 
      <div className="users">
        {filteredUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            handleUserClick={handleUserClick}
          />
        ))}
      </div>
    </div>
  );
}
 
export default App;