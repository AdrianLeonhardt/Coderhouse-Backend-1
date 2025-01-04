import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {

    async register (request, response) {
        const { user, email, password } = request.body;

        try {
            const newUser = await userService.registerUser({user, email, password});

            const token = jwt.sign({
                user: newUser.user, 
                email: newUser.email, 
                rol: newUser.role,
                cart: newUser.cart}, 
                process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

                response.cookie("preEntregaToken", token, {
                               maxAge: 3600000,
                               httpOnly: true 
                            });

                response.redirect("/api/sessions/current");

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            response.status(500).send("Problema al registrar el usuario");
        }

    }

    async login (request, response) {
        const { user, email, password } = request.body;

        try {
            const userFound = await userService.loginUser( email ,password);

            const token = jwt.sign({
                user: userFound.user, 
                email: userFound.email, 
                rol: userFound.role,
                cart: userFound.cart}, 
                process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

                response.cookie("preEntregaToken", token, {
                               maxAge: 3600000,
                               httpOnly: true 
                            });

                response.redirect("/api/sessions/current");
        } catch (error) {
            console.error("Error al iniciar sesion:", error);
            response.status(500).send("Problema al iniciar sesión");
        }

    }

    async logout (request, response) {
        response.clearCookie("preEntregaToken");
        response.redirect("/login");
    }

    async current (request, response) {
        if (request.user) {
            console.log(request.user);

            const userDTO = new UserDTO(request.user);

            console.log(userDTO);
            response.render("home", { user: userDTO });
        }else {
            response.send("No autorizado");
        }
    }

}


export default UserController;