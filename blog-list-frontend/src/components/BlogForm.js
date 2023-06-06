import { useState } from "react";

const BlogForm = ({ handleAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onClick={handleSubmit}>
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

export default BlogForm;
