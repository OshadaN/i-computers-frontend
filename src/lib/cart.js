export function getCart(){
    
    const cartInString = localStorage.getItem("cart");

    if(cartInString == null){

        localStorage.setItem("cart" , "[]")
        return[]
    }else{

        const cart = JSON.parse(cartInString);
        return cart
    }
}

export function addToCart( product, qty ){

    const cart = getCart()

    let newCartInString = ""

    //check if product already existis in cart

    const productIndex = cart.findIndex(
        (item)=>{

            return item.product.productId == product.productId

        }
    )

    if (productIndex == -1 ){
        if(qty<1){
            return
        }

        cart.push(
            {
                product:{
                    productId : product.productId,
                    name : product.name,
                    image : product.images[0],
                    price : product.price,
                    labelledPrice : product.labelledPrice,
                },
                qty : qty
            }
        )

        newCartInString = JSON.stringify(cart)
    }else{

        const item = cart[productIndex].qty += qty

        if(
            cart[productIndex].qty < 1){
                cart.splice(productIndex, 1)
            }
        

    }

    const cartInString = JSON.stringify(cart);

    localStorage.setItem("cart" , cartInString)

}

export function getCartTotal(cart){ 

    let total = 0

    for(let i = 0 ; i < cart.length ; i++){

        total += cart[i].product.price * cart[i].qty

    }

    return total

}