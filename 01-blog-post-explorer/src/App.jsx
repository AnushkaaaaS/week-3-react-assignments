import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
 
function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);
 

function handlePostClick(post) {
    setSelectedPost(post);
    setCommentLoading(true);
 
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
    setComments(data);
        setCommentLoading(false);
      });
  }
 
  function closePost() {
  setSelectedPost(null);
    setComments([]);
  }
 
  const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
  );
 
  if (loading) {
    return <h2>Loading...</h2>;
  }
 
 if (error) {
    return <h2>{error}</h2>;
  }
 
if (selectedPost) {
    return (
      <div className="container">
        <button onClick={closePost}>Close</button>
 
        <h1>{selectedPost.title}</h1>
        <p>{selectedPost.body}</p>
 
        <h2>Comments</h2>
 
    {commentLoading ? (
          <p>Loading comments...</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h3>{comment.name}</h3>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  return (
    <div className="container">
      <h1>All Posts</h1>
 
      <input
        type="text"
        placeholder="Search for a post"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="posts">
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handlePostClick={handlePostClick}
          />
        ))}
      </div>
    </div>
  );
}
 
export default App;