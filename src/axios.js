import axios from "axios";

const instance = axios.create({
  baseURL: "https://stormy-reef-75572.herokuapp.com/",
});

export default instance;
