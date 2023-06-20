import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await handleAdd({ title, author, url });
    if (response === "success") {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export default BlogForm;
