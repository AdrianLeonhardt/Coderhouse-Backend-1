class CartDTO {
    constructor(cart){
        this.id = cart._id;
        this.products = cart.products;
    }
}

export default CartDTO;