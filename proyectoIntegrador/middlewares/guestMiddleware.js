// Matias dijo: "Esto lo hice a partir del video de session del playground"

// NOTA: FALTA MODIFICAR EL ELSE PARA QUE TE REENVIE A (SUPONGO) LA MISMA PAGINA DONDE ESTAS PARADO (Si es que no sos invitado)

function guestMiddleware(req, res, next) {

    if(req.session.usuarioLogueado == undefined) {
        next();
    } else {
        res.send('Esta pagina es solo para invitados')
    }

}

module.exports = guestMiddleware;