//Trabajamos con la estrategia de Passport con JWT: 

//1) npm install passport-jwt
//2) Importamos passport y jwt: 

import passport from "passport";
import jwt from "passport-jwt";
import dotenv from "dotenv"; 

dotenv.config();

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 

//Creamos el cookieExtractor: 
const cookieExtractor = req => {
    let token = null; 
    //Corroboramos que hay alguna cookie para tomar: 
    if(req && req.cookies) {
        token = req.cookies["preEntregaToken"]; 
        //Tomamos la cookie que necesitemos:
    }
    return token; 
}

const initializePassport = () => {
    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: process.env.JWT_SECRET_KEY, 
        //palabra secreta que se puede cambiar
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error);
        }
    }))
}


export default initializePassport; 