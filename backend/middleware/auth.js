import jsonwebtoken from 'jsonwebtoken';

export default (req, res, next)=>{
    //GET TOKEN FROM HEADER
    const token = req.header('x-auth-token');

    //CHECK IF NOT TOKEN
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }
    //VERIFY TOKEN
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWTS);

        req.user = decoded.user;
        next();
    } catch (error) {
        
        res.status(401).json({msg: 'Token is not valid'});
    }
}