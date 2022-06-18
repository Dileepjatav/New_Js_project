
const productdom=document.querySelector(".section");
const cartbtn=document.querySelector(".cart-btn");
const cartscreen=document.querySelector('.cart-screen');
const cartlayout=document.querySelector('.cart-layout');
const clearcart=document.querySelector('.clear-cart');
const cartcontent=document.querySelector('.cart-box');

// cartbtn.addEventListener('click',()=>{
//     cartscreen.classList.add("show-cart");
//     cartlayout.classList.add("transform");
// })


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
                            <button class="Box_button_buy">Buy</button>
                        </div>
                    </div>
    
                </div>
            </div>

        </div>`

        productdom.innerHTML=result;

        
            
        });

        
    }

    showCart() {
        // cartscreen.classList.add("show-cart");
        // cartlayout.classList.add("transform");

        cartscreen.style.visibility = "visible";
        cartlayout.style.transform= "translateX(0)";
        
    }

    clearcart(){
        cartscreen.style.visibility = "hidden";
        cartlayout.style.transform= "";

    }

}

document.addEventListener("DOMContentLoaded",()=>{
    const p=new products();
    const ui=new uiinterface();


    p.getdata()
        .then((data)=>{
            ui.insertproductindom(data);

            localStorage.setItem("datafromapi",JSON.stringify(data));

            let btn=[...document.querySelectorAll('.Box_button_add')];
            
            btn.forEach((element)=>{
                let id=element.dataset.id;
                element.addEventListener('click',(event)=>{
                    event.target.innerHTML='IN cart'
                    event.target.disabled=true;


                    let selectproduct=data.find((products)=>products.id===id);
                    console.log(selectproduct)
                    let carthtml=`<div class="cart-detail">
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
                        </div>`

                    cartcontent.innerHTML= cartcontent.innerHTML+carthtml;




                })


            })
            
        });
    
});


cartbtn.addEventListener('click',()=>{
    const ui=new uiinterface();
    ui.showCart();
})


clearcart.addEventListener('click',()=>{
    const ui=new uiinterface();
    ui.clearcart();
})

