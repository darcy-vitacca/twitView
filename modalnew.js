
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
    modal.appendChild(logo);
    
    //image
    let imgLogo = document.createElement("IMG");  //need to declare and give permission etc.
    img.src = chrome.runtime.getURL(twitLogo);
    logo.appendChild(imgLogo); 

  }
}
addModal();





    // let Modal = document.createElement("div");
    // let Header = document.createElement("div");
    // let body = document.createElement("div");

    // let imgnode = document.createElement("img");
    // imgnode.src = chrome.runtime.getURL(greyTwit);
    // imgnode.style.cssText = "padding:50%;";
    // node.style.cssText = "min-height: 1.875rem;";
    // node.setAttribute("class", "modalDiv");
    // imgnode.setAttribute("id", "Modal ");
    // node.appendChild(imgnode);// add the node to the new div
    // elements.appendChild(node);// tweetbar div add on the div

