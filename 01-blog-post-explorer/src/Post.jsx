function Post({ post, handlePostClick }) {
  return (
    <div className="card" onClick={() => handlePostClick(post)}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
 
export default Post;