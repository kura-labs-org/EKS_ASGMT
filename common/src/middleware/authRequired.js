exports.authRequired = () => {
    return (req, res, next) => {
      if (!req.currentUser) {
        return res.status(401).json({ error: 'access denied' });
      }
      next();
    };
};