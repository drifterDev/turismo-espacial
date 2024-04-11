// Autor: Mateo Álvarez Murillo
// Fecha de creación: 2023

// Este código se proporciona bajo la Licencia MIT.
// Para más información, consulta el archivo LICENSE en la raíz del repositorio.

"use strict";

const title = document.getElementById("title-tecno");
const description = document.getElementById("description-tecno");
const img = document.getElementById("imagen-tecno");
const radios = document.getElementsByName("tecno");
const logo = document.getElementById("logo");
let radioActual = 0;

logo.addEventListener("click", () => {
  window.location.href = "home.html";
});

window.addEventListener("load", () => {
  img.src =
    window.innerWidth > 1024
      ? "../assets/technology/image-launch-vehicle-portrait.jpg"
      : "../assets/technology/image-launch-vehicle-landscape.jpg";
});

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    changeInfo(radio.value, index);
  });
});

window.addEventListener("resize", () => {
  changeInfo(radios[radioActual].value, radioActual);
});

async function changeInfo(value, index) {
  try {
    let data = await getInfo(value);
    title.textContent = value;
    description.textContent = data.description;
    img.src =
      window.innerWidth > 1024 ? data.images.portrait : data.images.landscape;
    radioActual = index;
  } catch (err) {
    console.error("Error: " + err);
  }
}

async function getInfo(value) {
  try {
    const response = await fetch("../js/data.json");
    if (!response.ok) {
      throw new Error("Error get Info: " + response.status);
    }
    const data = await response.json();
    let obj = await data.technology.find((objeto) => objeto.name === value);
    return obj;
  } catch (error) {
    console.error("Error load JSON:", error);
    throw error;
  }
}
