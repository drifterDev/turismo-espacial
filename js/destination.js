// Autor: Mateo Álvarez Murillo
// Fecha de creación: 2023

// Este código se proporciona bajo la Licencia MIT.
// Para más información, consulta el archivo LICENSE en la raíz del repositorio.

"use strict";

const radios = document.getElementsByName("destination");
const img = document.getElementById("imagen-destination");
const title = document.getElementById("title");
const description = document.getElementById("description");
const distance = document.getElementById("distance");
const travel = document.getElementById("travel");
const logo = document.getElementById("logo");

logo.addEventListener("click", () => {
  window.location.href = "home.html";
});

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    changeInfo(radio.value);
  });
});

async function changeInfo(value) {
  try {
    let data = await getInfo(value);
    img.src = data.images.png;
    title.textContent = value;
    description.textContent = data.description;
    distance.textContent = data.distance;
    travel.textContent = data.travel;
  } catch (err) {
    console.error("Error: " + err);
  }
}

async function getInfo(value) {
  try {
    const response = await fetch("../js/data.json");
    if (!response.ok) {
      throw new Error("Error get info: " + response.status);
    }
    const data = await response.json();
    let obj = await data.destinations.find(
      (objeto) =>
        objeto.name ===
        value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()
    );
    return obj;
  } catch (error) {
    console.error("Error load JSON:", error);
    throw error;
  }
}
