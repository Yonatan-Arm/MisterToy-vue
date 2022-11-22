import Axios from "axios";
import { utilService } from "./util-service.js";
import {httpService} from "./http.service.js"

const URL =
  process.env.NODE_ENV !== "development"
    ? "/api/toy/"
    : "//localhost:3030/api/toy/";

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
};

async function query(filterBy) {
  return httpService.get(`toy` , filterBy)
}

async function getById(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`toy/${toyId}`)
  // return axios.delete(URL + toyId);
    // return storageService.delete('review', reviewId)
  
}

async function save(toy) {
  if (toy._id) {
    const addedReview = await httpService.put(`toy/${toy._id}`, JSON.parse(JSON.stringify(toy)))
    return addedReview
  } else {
    const addedReview = await httpService.post(`toy`, toy)
    return addedReview
  }
}


function getEmptyToy() {
  return {
    name: "",
    price: 0,
    labels: [],
    createdAt: new Date(),
    inStock: true,
    reviews: [],
    img: `../src/assets/images/${_getRandomInt(0, 11)}.png`,
  };
}

function _getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}



