
const productdom=document.querySelector(".section");
const cartbtn=document.querySelector(".cart-btn");
const cartscreen=document.querySelector('.cart-screen');
const cartlayout=document.querySelector('.cart-layout');
const clearcart=document.querySelector('.clear-cart');
const cartcontent=document.querySelector('.cart-box');
const cartPrice = document.querySelector(".amount");
const itemincart =document.querySelector('.item-in-cart');
const thankyou=document.querySelector('.buy-item');
const thankuclose=document.querySelector('.cross');




let cart = [];
let cartitem=0;

class products{
    async getdata(){
        try{
            const url="data.json";
            const response=await fetch(url);
            let data=await response.json();
            let arr=data.items;
            arr=arr.map((item)=>{
                const {name,discription,prise,rating}=item.files;
                const image=item.files.image.url;
                const id=item.sys.id;
                return {name,discription,prise,rating,image,id}
            })
            return arr
        }catch(error){
            console.log(error)
        }  
    }
}


class uiinterface{
    insertproductindom(products){
        let result="";
        products.forEach((element) => {
            
            result+=`<div class="container">
            <div class="Data">
                <div class="Box">
                    <img class="box_img" src="${element.image}">
                </div>  
                <div class="Box_details">
                    <div class="detail_div">
                        <h2 class="nameh2" >${element.name}</h2>
                        <p class="box_detail_p">${element.discription}</p>
                        <div class="Prise">
                            <span class="material-symbols-outlined">
                                currency_rupee
                                </span>
                            
                            <h4>${element.prise}</h4>
                        </div>
                        
                        <h4 class="box_rating"> Rating ${element.rating}</h4>
                        <div class="btn_div">
                            <button data-id=${element.id} class="Box_button_add">Add to cart</button>
                            <button data-id=${element.id} class="Box_button_buy">Buy</button>
                        </div>
                    </div>
    
                </div>
            </div>

        </div>`

        productdom.innerHTML=result;

        
            
        });

        
    }

    countcartitem(){
        cartitem+=1;
        console.log(cartitem);
        itemincart.textContent=cartitem;
        
    }



    setCartValues(cart){
        let totalprise = 0;
        let totalitem = 0;
        cart=cart.map((cartitem)=>{
            totalprise+=cartitem.prise*cartitem.amount;
            totalitem+=cartitem.amount;
        });

        cartPrice.innerHTML=totalprise;
    }

    initialSetup() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.addCartItems(cart);
    }


    addCartItems(cart) {
        console.log("inside this fun");
        let cartHtml = "";
        cart.forEach((selectproduct) => {
            cartHtml += `<div class="cart-detail">
                    <div class="cart-item-img">
                <img class="cart-img" src="${selectproduct.image}">
     
                        </div>
                <div class="cart-detail-text">
                    <div class="cart-decr">
         <h3>Name <span class="item-name">${selectproduct.name}</span></h3>
         <h4>Prise     <span class="item-prise">${selectproduct.prise}</span></h4>
                    </div>
                <div class="cart-btn-div">
         
         <div class="btn-inc">
             <button class="btn-cart">-</button>
             <h4>0</h4>
             <button class="btn-cart">+</button>
         </div>
         
         <button class="btn-remove">Remove</button>
                    </div>

              </div>
                    </div>`;
        });
        cartcontent.innerHTML = cartHtml;
        this.countcartitem();
    }
    


    

    showCart() {

        cartscreen.classList.add("show-cart");
        cartlayout.classList.add("transform");

        // cartscreen.style.visibility = "visible";
        // cartlayout.style.transform= "translateX(0)";
        
    }

    clearcart(){
        cartscreen.classList.remove("show-cart");
        cartlayout.classList.remove("transform");

        // cartscreen.style.visibility = "hidden";
        // cartlayout.style.transform = "";

    }

    thankyouwindow(){
        thankyou.style.visibility="visible";
    }
    thankclose(){
        thankyou.style.visibility="hidden";

    }

    buybutton(){
        let buybtn=[...document.querySelectorAll('.Box_button_buy')];
        
        buybtn.forEach((btn)=>{
            let id =btn.dataset.id;
            btn.addEventListener('click',(event)=>{
                event.target.innerHTML="sold"
                event.target.disabled=true;
                this.thankyouwindow();
                

                

                
            })

        })

        

    }

    

    btn_all_addtocart(){
        let btn=[...document.querySelectorAll('.Box_button_add')];
            
            btn.forEach((button)=>{
                let id=button.dataset.id;
                button.addEventListener('click',(event)=>{
                    event.target.innerHTML='IN cart'
                    event.target.disabled=true;
                    console.log("add btn clicked"+id); 
                    let selectproduct=Storage.get_fromlocal(event.target.dataset.id);
                    selectproduct={...selectproduct,amount:1};
                    cart = [...cart, selectproduct];
                    Storage.setCartItems(cart);

                    this.addCartItems(cart);

                    this.setCartValues(cart);

                    
                    this.showCart();

                })
            })
    }

    element_addtocart(){
       
        console.log("element added");


    }
    

}


class Storage{
    static savedata(products){
        localStorage.setItem("Products",JSON.stringify(products));
    }

    static get_fromlocal(id){
        return JSON.parse(localStorage.getItem("Products")).find(
            (prod) => prod.id === id
          );
        
    }
    static satcartitems(item){
        localStorage.setItem("item".JSON.parse(item));
    }
    static takecartitems(id){
        let cartdata=localStorage.getItem("item").find((ele)=>{
            ele.id===id
        })

        return JSON.parse(cartdata);
    }

    static setcart(product){
        localStorage.setItem("product".JSON.stringify(product));
    }

    static setCartItems(cart) {
        localStorage.setItem("Cart", JSON.stringify(cart));
        }
    static getCart() {
        return localStorage.getItem("Cart")
          ? JSON.parse(localStorage.getItem("Cart"))
          : [];
        }
    

}

document.addEventListener("DOMContentLoaded",()=>{
    const p=new products();
    const ui=new uiinterface();


    p.getdata()
        .then((data)=>{
            ui.insertproductindom(data);
            ui.buybutton();
            ui.btn_all_addtocart();
            Storage.savedata(data);

           
            
        });
    
});


thankuclose.addEventListener('click',()=>{
    const ui=new uiinterface();
    ui.thankclose();

})

cartbtn.addEventListener('click',()=>{
    const ui=new uiinterface();
    ui.showCart();
})


clearcart.addEventListener('click',()=>{
    const ui=new uiinterface();
    ui.clearcart();
})

