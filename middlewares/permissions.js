import jwt from 'jsonwebtoken';


const roles = permissions => {
  return (req, res, next) => {
    try {
      const token = req.header('x-auth-token');
      if (!token) return res.status(401).json({ message: 'No authentication token, Permission deniedd' });

      const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
      if (!permissions.includes(role))
        return res.status(401).json({ message: 'Role verification failed, Permission denied' });
      req.user = id;

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};


export default roles