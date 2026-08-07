const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access Denied. Admin Only.",
    });
  }
};

module.exports = {
  adminOnly,
};