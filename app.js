/*
==================================
1-Check for the elements exist or not
===================================
  */
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  } else {
    throw console.error(`please double check the class name, this ${selector} does not exist.`);
  }
}

/*
====================
Grab Elements
====================
 */

// NAV Bar Element
const navBtn = getElement(".navBtn");

// FORM Elements
const form = getElement(".drink-form");
const submit = getElement(".input-submit");
const feedBack = getElement(".drink-form-feedback");
const customer_Name = getElement(".input-name");
const customer_Lastname = getElement(".input-lastName");
const customer_email = getElement(".input-email");

// VIDEO Elements
const videoBtn = getElement(".video-switch-btn");
const videoSwitch = getElement(".video-switch");
const videoItem = getElement(".video-item");

// CardList of Persons 
let cardList = getElement(".drink-card-list");

// image Gallery
const iconList = document.querySelectorAll(".work-item-icon");
const closeBtn = getElement(".work-modal-close");

/*
    ====================
      Utility Functions
    ====================
*/

/*
=============
2- Hide PreLoader
=============
 */

function hidePreloader() {
  const preLoader = getElement(".preloader-container");
  preLoader.style.display = "none";

}
/*
====================
3- show and hide navbar
====================
 */
navBtn.addEventListener("click", navBar);

function navBar() {
  const navBar = getElement(".nav");
  navBar.classList.toggle("nav-show");
}

/*
====================
4- Play and Pause Video
====================
 */

function video() {
  if (!videoBtn.classList.contains("slideBtn")) {
    videoBtn.classList.add("slideBtn");
    videoItem.pause();
  } else {
    videoBtn.classList.remove("slideBtn");
    videoItem.play();

  }
}

/*
====================
5- Submit form
====================
*/

function submitForm(e) {
  e.preventDefault();
  const firstName = customer_Name.value;
  const lastName = customer_Lastname.value;
  const email = customer_email.value;
  const result = checkFormFields(firstName, lastName, email);

  // check if all fields are filled with values show success message
  if (result) {
    showMessage("Congratulation! successfully add to the list", "success");
    addCustomer(firstName, lastName, email);
    clearFields();

  }
  // check if values are empty show error
  else {
    showMessage("Each field input is required", "error");
  }

}

/*
==================================
6- Check Form Fileds are EMPTY or NOT
==================================
 */
function checkFormFields(name, lastName, email) {
  let result = false;
  if (name === "" || lastName === "" || email === "") {
    return result;
  }
  else {
    result = true;
  }
  return result;
}
/*
============
7- ShowMessage
============
 */
function showMessage(text, type) {

  if (type === "error" || type === "success") {
    feedBack.textContent = `${text}`;
    feedBack.classList.add(type);
  }

  setTimeout(() => {
    feedBack.classList.remove(type);
  }, 3000);
}
/*
===============
8- ADD Customer
===============
 */
function addCustomer(name, lastName, email) {
  let person = {
    name: name,
    lastName: lastName,
    email: email
  };
  console.log(person);
  const randomNumber = random();
  console.log(randomNumber);

  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML =
    `<img src="./images/person${randomNumber}.jpg" alt="" class="person-thumbnail">
                        <h4 class="person-name">${person.name}</h4>
                        <h4 class="person-lastName">${person.lastName}</h4>`;
  cardList.appendChild(div);
  console.log(div);
}
/*
===============
9- Generate Random Number
===============
 */
function random() {
  let images = [1, 2, 3, 4];
  let random = Math.floor(Math.random() * images.length);
  return random;
}
/*
======================
10- clear Input Fields
======================
*/
function clearFields() {
  customer_Name.value = "";
  customer_Lastname.value = "";
  customer_email.value = "";
}
/*
======================
11- traverse Nodelist of icons
======================
*/
function iconListTraverse(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("work-item-icon")) {

      const id = e.target.parentElement.dataset.id;
      console.log(id);
      const modalShow = getElement(".work-modal");
      const modalItem = getElement(".work-modal-item");
      modalShow.classList.add("work-modal-show");
      modalItem.style.backgroundImage = `url(./images/work${id}.jpg)`;

    }
  }
/*
======================
12- close work modal
======================
*/
function closeModal() {
  const modalShow = getElement(".work-modal");
  modalShow.classList.remove("work-modal-show");

}
/*
====================
Event Listeners
====================
 */

//1- preLoader
window.addEventListener("load", hidePreloader);

//2- video
videoSwitch.addEventListener("click", video);

//3- submit Form
form.addEventListener("submit", submitForm);

//4- iconList
iconList.forEach(function (item) {
  item.addEventListener("click", iconListTraverse)});

//5- submit Form
closeBtn.addEventListener("click", closeModal);
