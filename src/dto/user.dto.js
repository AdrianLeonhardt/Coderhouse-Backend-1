//Aca ocultamos datos sensibles
class UserDTO {
    constructor(user) {
        // this.id = user.id;
        this.name = user.user;
        this.email = user.email;
        // this.password = user.password;
        // this.role = user.role;
        this.cart = user.cart;
    }
}

export default UserDTO;