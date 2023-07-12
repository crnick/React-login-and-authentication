import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500", // could be resued for the full application
});
