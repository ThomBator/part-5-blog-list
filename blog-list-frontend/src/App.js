import { useState, useEffect } from "react";
import Notification from "./components/Notifications";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notificationMSG, setNotificationMSG] = useState(null);
  const [notificationColor, setNotificationColor] = useState("");

  const handleAdd = async (event) => {
    event.preventDefault();
    if (user) {
      blogService
        .create({
          title: title,
          author: author,
          url: url,
        })
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));
          setTitle("");
          setAuthor("");
          setUrl("");
          setNotificationMSG("New Blog Added");
          setNotificationColor("green");
        });
      setTimeout(() => {
        setNotificationMSG(null);
        setNotificationColor("");
      }, 5000);
    } else {
      setNotificationMSG("Invalid user, please login and try again");
      setNotificationColor("red");
      setTimeout(() => {
        setNotificationMSG(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setNotificationMSG("Logged In Successfully!");
      setNotificationColor("green");
      setTimeout(() => {
        setNotificationMSG(null);
        setNotificationColor("");
      }, 5000);
    } catch (exception) {
      setNotificationMSG("Invalid credenitals");
      setNotificationColor("red");
      setTimeout(() => {
        setNotificationMSG(null);
        setNotificationColor("");
      }, 5000);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    console.log("Logged user", JSON.stringify(loggedUserJSON));
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="Username">username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Password">password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );

  const addBlog = () => {
    return (
      <form onClick={handleAdd}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      {notificationMSG && (
        <Notification message={notificationMSG} color={notificationColor} />
      )}
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </p>

          <h3>Add New Blog</h3>
          {addBlog()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
