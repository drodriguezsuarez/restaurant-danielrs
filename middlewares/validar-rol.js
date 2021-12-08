const validarRoles = (...roles) => {
    return (req, res, next) => {
        //||x  req.usuario.rol !== roles || 
        if (!roles.includes(req.usuario.rol)) {
            console.log(roles.includes(req.usuario.rol));
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}
export default validarRoles;