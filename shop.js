import { ItemData } from "./Items.js";

//////?Varaiables
const CardItem = document.querySelector(".Cart");
const Modal = document.querySelector(".Modal");
const DropShadow = document.querySelector(".DropShadow");



//////?Get Products
class Items {
   GetProducts(){
      return ItemData;
   }
}


//////?Display Products
class UI {

}

//////?Storage 
class Storage {
}

document.addEventListener("DOMContentLoaded" , () => {
   const AllItems = new Items();
   const ItemsData = AllItems.GetProducts();
   console.log(ItemsData);
})










//////?Cart Item modal 
function ShowModalOfCart(){
   Modal.style.top = "50%";
   DropShadow.style.filter = "blur(1px)";
   DropShadow.style.display = "block"
}
function CloseModalOfCart(){
   Modal.style.top = "-50%";
   DropShadow.style.background = "none";
   DropShadow.style.display = "none"
}

//////?AddEventListener
CardItem.addEventListener("click",ShowModalOfCart);
DropShadow.addEventListener("click",CloseModalOfCart);