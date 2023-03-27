import { ItemsData } from "./Items.js";

//////?Varaiables
const CardItem = document.querySelector(".Cart");
const Modal = document.querySelector(".Modal");
const DropShadow = document.querySelector(".DropShadow");


const TopHouse = document.querySelector(".Top-House");
const CartTotal = document.querySelector(".Price");
const Cart_Items = document.querySelector(".Cart-Items");

const UserItems = document.querySelector(".YourShopping");

let Cart = [];
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
               ${Item.price}$
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
   GetAddToCartBtns(){
      const AddToCartBtns = document.querySelectorAll(".AddBtn");
      const Buttons = [...AddToCartBtns];
      Buttons.forEach((Btn) => {
         const IdBtn = Btn.dataset.id;
         // Check If This Product ID Is In Cart Or Not?
         const IsInCart = Cart.find((I) => I.id === IdBtn)
         if (IsInCart) {
            Btn.innerText = "In Cart";
            Btn.Disabled = true;
         }
         Btn.addEventListener("click" , (event) => {
            event.target.innerText = "In Cart";
            event.target.Disabled = true;
            // Get Item From Items...
            const AddedItem = {...Storage.GetItem(IdBtn) , quantity: 1};
            // Add To Cart...
            Cart = [...Cart , AddedItem];
            // Save Cart To Local Storage...
            Storage.SaveCart(Cart);
            // Update Cart Value...
            this.SetCartValue(Cart);
            // Show Item In Cart...
            this.ShowCartItem(Cart);
         })
      })
   }
   SetCartValue(Cart){
      // Cart Items
      // Cart Total Price
      let TempCartItems = 0;
      const TotalPrice = Cart.reduce((acc , curr) => {
         TempCartItems += curr.quantity;
         return acc + curr.price * curr.quantity;
      } , 0);
      CartTotal.innerText = `${TotalPrice}$`;
      Cart_Items.innerText = TempCartItems;
   }
   ShowCartItem(Cart){
      let Result = ``;
      Cart.forEach((Item) => {
         console.log(Item);
         Result += 
         `<div class="ItemCart">
         <img src="${Item.imageUrl}" alt="">
         <div class="CaptionCart">
            <h4>${Item.title}</h4>
            <p>${Item.price}</p>
         </div>
         <div class="Counter">
            <div class="Up">
               <i class="fa fa-angle-up"></i>
            </div>
            <div class="NumberOfItem">1</div>
            <div class="Down">
               <i class="fa fa-angle-down"></i>
            </div>
         </div>
         <div class="DeleteBtn">
            <button>
               <i class="fa fa-trash-o"></i>
            </button>
         </div>
         </div>`
         UserItems.innerHTML = Result;
      })
   }
}

//////?Storage 
class Storage {
   static SaveItems(Items){
      localStorage.setItem("Items" , JSON.stringify(Items))
   }
   static GetItem(Id){
      const _Items = JSON.parse(localStorage.getItem("Items"));
      return _Items.find((I) => I.id === parseInt(Id));
   }
   static SaveCart(Cart){
      localStorage.setItem("Cart" , JSON.stringify(Cart));
   }
}

document.addEventListener("DOMContentLoaded" , () => {
   const AllItems = new Items();
   const ItemsData = AllItems.GetItems();
   const ui = new UI();
   ui.DisplayItems(ItemsData);
   ui.GetAddToCartBtns(ItemsData);
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