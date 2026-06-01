import jwt from "jsonwebtoken";

const userAuth = async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token) {
        return res.json({return: false, message:'Not Authorized. Login Again'});
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);


        if(tokenDecode.id){
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({return:false, message:'Not Authorized. Login again'});
        }

        next();

    }catch(error){
        return res.json({Success: false, message: error.message});
    }
}
export default userAuth;