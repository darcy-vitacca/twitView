// const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
// const modals = document.querySelectorAll(".modal");
// const modalCloseButtons = document.querySelectorAll(".modal-close");

// modalTriggerButtons.forEach(elem => {
//   elem.addEventListener("click", event => toggleModal(event.currentTarget.getAttribute("data-modal-target")));
// });
// modalCloseButtons.forEach(elem => {
//   elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
// });
// modals.forEach(elem => {
//   elem.addEventListener("click", event => {
//     if(event.currentTarget === event.target) toggleModal(event.currentTarget.id);
//   });
// });

// // Maybe also close with "Esc"...
// document.addEventListener("keydown", event => {
//   if(event.keyCode === 27 && document.querySelector(".modal.modal-show")) {
//     toggleModal(document.querySelector(".modal.modal-show").id);
//   }
// });

// function toggleModal(modalId) {
//   const modal = document.getElementById(modalId);

//   if(getComputedStyle(modal).display==="flex") { // alternatively: if(modal.classList.contains("modal-show"))
//     modal.classList.add("modal-hide");
//     setTimeout(() => {
//       document.body.style.overflow = "initial"; // Optional: in order to enable/disable page scrolling while modal is hidden/shown - in this case: "initial" <=> "visible"
//       modal.classList.remove("modal-show", "modal-hide");
//       modal.style.display = "none";      
//     }, 200);
//   }
//   else {
//     document.body.style.overflow = "hidden"; // Optional: in order to enable/disable page scrolling while modal is hidden/shown
//     modal.style.display = "flex";
//     modal.classList.add("modal-show");
//   }
// }
let button =  document.getElementsByClassName('btn');


 button.addEventListener('click', console.log("click"));




addModal = function() {
  console.log("check");
  let elements = document.querySelector("main");
  console.log(elements);
  if (elements) {

    //overall div
    let modal = document.createElement("DIV");
    modal.setAttribute("class", "modal-content");
    elements.appendChild(modal);
    
    //exit symbol
    let exit = document.createElement("SPAN");
    exit.setAttribute("class", "modal-close");
    exit.innerHTML = "&times;";
    modal.appendChild(exit);
    
    //logo header
    let logo = document.createElement("DIV");
    logo.setAttribute("class", "logo");
    elements.appendChild(node);
    modal.appendChild(logo);
    
    //image
    let imgLogo = document.createElement("IMG");  //need to declare and give permission etc.
    img.src = chrome.runtime.getURL(twitLogo);
    logo.appendChild(imgLogo); 

  }
}
addModal();