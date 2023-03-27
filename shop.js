import { ItemsData } from "./Items.js";

//////?Varaiables
const CardItem = document.querySelector(".Cart");
const Modal = document.querySelector(".Modal");
const DropShadow = document.querySelector(".DropShadow");

const TopHouse = document.querySelector(".Top-House") ;

//////?Get Products
class Items {
   GetItems(){
      return ItemsData;
   }
}


//////?Display Products
class UI {
   DisplayItems(Items){
      let Result = "";
      Items.forEach((Item)=> {
         Result += 
         `<div class="Card-Item">
         <img src="${Item.imageUrl}" alt="">
         <div class="Caption">
            <h3>
               ${Item.title}
            </h3>
            <p>
               ${Item.price}
            </p>
            <div class="ShopBtn">
               <button class="BuyBtn">Buy Now</button>
               <button class="AddBtn" data-id="${Item.id}">Add to Card</button>
            </div>
         </div>
         </div>`;
         TopHouse.innerHTML = Result;
      });
   }
}

//////?Storage 
class Storage {
   static SaveItems(Items){
      localStorage.setItem("Items" , JSON.stringify(Items))
   }
}

document.addEventListener("DOMContentLoaded" , () => {
   const AllItems = new Items();
   const ItemsData = AllItems.GetItems();
   const ui = new UI();
   ui.DisplayItems(ItemsData);
   Storage.SaveItems(ItemsData);
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