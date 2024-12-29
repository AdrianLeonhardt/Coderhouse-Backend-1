import userRepository from "../repository/user.repository.js";
import CartModel from "../dao/models/cart.model.js";
import { createHash, isValidPassword } from "../utils/util.js";

class UserService {

    async registerUser(userData){
        const existeUsuario = await userRepository.getUserByEmail(userData.email);

        if (existeUsuario) {
            throw new Error("El usuario ya existe");
        }

        // Crear un carrito para el usuario
        const newCart = new CartModel();
        await newCart.save(); 
        console.log("Carrito creado con ID:", newCart._id);

        // userData.password = createHash(userData.password);
        // return await userRepository.createUser(userData);
        // Asociar el carrito con el usuario
        userData.password = createHash(userData.password);
        userData.cart = newCart._id;

        const newUser = await userRepository.createUser(userData);
        console.log("Usuario creado con carrito asociado:", newUser.cart);

        return newUser;
    }

    async loginUser(email, password){
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error("El usuario no existe");
        }

        if (!isValidPassword(password, user)) {
            throw new Error("Contraseña incorrecta");
        }

        return user
    }

}

export default new UserService();