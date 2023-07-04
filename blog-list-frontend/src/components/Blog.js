import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog, user, remove }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      remove(blog.id);
    }
  };

  const addLike = () => {
    setLikes(likes + 1);
    blogService.update(blog.id, { ...blog, likes: likes + 1 });
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button type="button" onClick={handleRemove}>
        delete
      </button>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}{" "}
      </button>
      {visible && (
        <>
          {blog.url}
          <br />
          {likes}{" "}
          <button type="button" onClick={addLike}>
            like
          </button>
          <br />
          {user.name}
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default Blog;
