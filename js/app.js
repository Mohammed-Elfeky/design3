let basket=[]
let total=0

if(JSON.parse(localStorage.getItem('basket'))==null){
    
    basket=[]
    total=0
    hideCounter()
}else{
    basket=JSON.parse(localStorage.getItem('basket'))
    total=localStorage.getItem('total')
    if(basket.length === 0){
        hideCounter()
    }else{
        showCounter()
    }
    $('#counter').html(basket.length)
    display()

}

$(function () {
    'use strict';
    var winH   = $(window).height(),
        navH   = $('.navbar').innerHeight();
    $('.head,.head .item').innerHeight(winH-navH);
});

$('.add').click(function(){
    const product=$(this)
    add(product)
    display()
    addToLocalStorage()
    showCounter()
})

function remove(id){
    
    removing=basket.filter(ele=>{
        return ele.id !== id.toString()
    })
    basket=removing
    display()
    addToLocalStorage()
    if(basket.length === 0){
        hideCounter()
    }
}

function add(product){

    const productObject={
        id:product.attr('id'),
        price:parseInt(product.attr("data-price")),
        title:product.attr("data-title"),
        photo:product.attr('data-photo'),
        quantity:1,
        totalPrice:parseInt(product.attr("data-price"))
    }

    // if the product is already in the basket dont add it 
    for(let i=0;i<basket.length;i++){
        if(basket[i].id === productObject.id){
            return;
        }
    }

    basket.push(productObject)
    $('#counter').html(basket.length)
}

function display(){
    $('.products-container').html('')
    basket.forEach(ele=>{
        $('.products-container').append(
            `<div class="row my-3">

                <!-- product img -->
                <div class="col-md-2 text-center">
                <div class="img-container">
                    <img src="${ele.photo}" alt="" class="img-fluid">
                </div>
                </div>
                <!-- end product img -->
    
            
                <!-- product name -->
                <div class="col-md-4 text-center d-flex justify-content-center">
                <p class="text-uppercase m-0 my-3 align-self-center">
                    ${ele.title}
                </p>
                </div>
                <!-- end product name -->
    
                
                <!-- product price -->
                <div class="col-md-2 text-center d-flex justify-content-center">
                <p class="text-uppercase m-0 my-3 align-self-center">
                    $${ele.price}
                </p>
                </div>
                <!-- end product price -->
    
                <!-- product quantity -->
                <div class="col-md-2 text-center d-flex justify-content-center">
                    <div class="align-self-center ">
                    <span href=""  onclick='addOne(${ele.id})' class="mystore mb-2">+</span>
                    <span href="" class="mystore mb-2">${ele.quantity}</span>
                    <span href="" onclick='removeOne(${ele.id})' class="mystore mb-2">-</span>
                    <span href=""  onclick='remove(${ele.id})' class="mystore">remove</span>
                    </div>
                </div>
                <!-- end product quantity -->
    
                <!-- product total -->
                <div class="col-md-2 text-center d-flex justify-content-center">
                <p class="text-uppercase m-0 my-3 align-self-center">
                    $${ele.totalPrice}
                </p>
                </div>
                <!-- end product total -->
          </div>
            `
        )
    })
    changeAndShowTotal()
    addToLocalStorage()
}

function addOne(id){
    for(let i=0;i<basket.length;i++){
        if(basket[i].id === id.toString()){
            basket[i].quantity++
            basket[i].totalPrice=basket[i].quantity*basket[i].price
        }
    }
    display()
    addToLocalStorage()
}

function removeOne(id){
    for(let i=0;i<basket.length;i++){
        if(basket[i].id === id.toString()){
            if(basket[i].quantity !== 1){
                basket[i].quantity--
                basket[i].totalPrice=basket[i].quantity*basket[i].price
            }
        }
    }
    display()
    addToLocalStorage()
}

function changeAndShowTotal(){
    let theTotal=0
    basket.forEach(ele=>{
        theTotal=theTotal+ele.totalPrice
    }) 
    $('.total').html(theTotal)
}

function addToLocalStorage(){
    let theTotal=0
    basket.forEach(ele=>{
        theTotal=theTotal+ele.totalPrice
    })
    localStorage.setItem('basket',JSON.stringify(basket))
    localStorage.setItem('total',theTotal)
}


function showCounter(){
    $('#basket-counter-container').css('display','block')
}

function hideCounter(){
    $('#basket-counter-container').css('display','none')
}

