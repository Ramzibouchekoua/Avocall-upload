import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, Authorization deniedd" });
    // if(token.length<500){
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified)
      return res
      .status(401)
      .json({ message: "Token verification failed, Authorization denied" });
      req.user = verified.id;
    // }else{
    //   const verified = jwt.decode(token);
    //   if (!verified)
    //   return res
    //   .status(401)
    //   .json({ message: "Token verification failed, Authorization denied" });
    //   req.user = verified.sub;
    // }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
