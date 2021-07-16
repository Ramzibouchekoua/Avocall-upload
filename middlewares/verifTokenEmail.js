import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, Authorization deniedd" });

    const verified = jwt.verify(token, process.env.MAIL_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ message: "Token verification failed, Authorization denied" });
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
