let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('#container')



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Event Listener to submit new toy 
document.addEventListener('submit', (event) => {
  event.preventDefault()
  addNewToy(
    event.target.name.value,
    event.target.image.value
  )
})

//Get Fetch for all toys
function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => createDiv(toy)))
}

function createDiv(toy) {
  //build Toy Card
  let card = document.createElement('div')
  card.className = 'card'
  toyCollection.append(card)
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
`

  //Like a toy
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1;
    card.querySelector('p').textContent = toy.likes
  })
}

//Add a New Toy
function addNewToy(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then(function (event) {
      createDiv(event)
    })
}



//Get Data and Render Toys to the DOM
function initialize() {
  getAllToys()
}
initialize()

