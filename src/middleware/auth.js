export function role (roles) {
    return (request, response, next) => {
        if (request.user && request.user.rol == roles){
            return next();
        }else {
            return response.status(403).send(`No autorizado, solo ${roles}`);
        }
    }
}