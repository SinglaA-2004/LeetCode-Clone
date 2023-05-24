let jwt = require('jsonwebtoken');
const JWS_SECRET= 'aand_mand_ka_tola_jo_na_nacha_bhen_ka_loda!___NACHO!';

module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader){
            return res.status(403).json({msg : "Missing authorization header"});
        }
        const decoded = jwt.verify(authHeader, JWS_SECRET);
        if(decoded && decoded.id){
            req.userId = decoded.id;
            next();
        }
        else{
            return res.status(403).json({msg : "Incorrect authorization token"});
        }
    }
}