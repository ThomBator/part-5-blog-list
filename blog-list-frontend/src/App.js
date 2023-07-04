import React from "react";
import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notifications";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notificationMSG, setNotificationMSG] = useState(null);
  const [notificationColor, setNotificationColor] = useState("");

  const blogFormRef = useRef();

  const handleAdd = async (noteObject) => {
    if (user) {
      blogFormRef.current.toggleVisibility();
      blogService
        .create({
          title: noteObject.title,
          author: noteObject.author,
          url: noteObject.url,
        })
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));

          setNotificationMSG("New Blog Added");
          setNotificationColor("green");
          return "success";
        });

      setTimeout(() => {
        setNotificationMSG(null);
        setNotificationColor("");
      }, 5000);
    } else {
      setNotificationMSG("wrong credentials");
      setNotificationColor("red");

      setTimeout(() => {
        setNotificationMSG(null);
      }, 5000);
      return "fail";
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
      setNotificationMSG("wrong credentials");
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

  const removeBlog = (id) => {
    blogService.remove(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
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

  return (
    <div>
      <h2>Blogs</h2>
      {notificationMSG && (
        <Notification message={notificationMSG} color={notificationColor} />
      )}
      {!user && (
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}

      {user && (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </p>
          <h3>Add New Blog</h3>
          <Toggleable buttonLabel="Add Blog" ref={blogFormRef}>
            <BlogForm handleAdd={handleAdd} />
          </Toggleable>

          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} remove={removeBlog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
