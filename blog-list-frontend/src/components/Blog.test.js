import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog title and author, but not url or number of likes", () => {
  const blog = {
    title: "example title",
    author: "example author",
    url: "example.com",
  };

  const user = {
    name: "Tony",
  };

  render(<Blog blog={blog} user={user} />);

  const element = screen.getByText("example author", { exact: false });

  expect(element).toHaveTextContent("example author");
  expect(element).toHaveTextContent("example title");
});
