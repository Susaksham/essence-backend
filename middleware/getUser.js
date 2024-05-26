import User from "../model/UserModel.js";

// @desc  POST:To verify login and return user details
// @route /api/login
// @payload   {authId}
// @access    private
const getUser = async (req, res, next) => {
  try {
    const authId = req.body.authId;
    if (!authId) {
      throw new Error("authId is missing");
    }
    const user = await User.findOne({ authId: authId });
    if (!user) {
      res.status(403).send({ error: "No User Found!", code: 0 });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send({ error: error.message, code: 0 });
  }
};
export default getUser;
