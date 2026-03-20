// Auth middleware removed — no authentication required
export const authenticateUser = (req, res, next) => {
  next();
};
