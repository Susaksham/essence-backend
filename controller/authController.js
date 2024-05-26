import User from "../model/UserModel.js";

// @desc  POST:To create a new User
// @route /api/register
// @payload   {username, authId, email, stats, goals}
// @access    private
export const registerUser = async (req, res) => {
  try {
    const { userName, authId, email } = req.body;
    console.log(req.body);
    if (!userName || !authId || !email) {
      throw new Error("paramaters missing");
    }
    const user = new User({
      userName: userName,
      authId: authId,
      email: email,
      stats: [],
      goals: [],
    });
    user
      .save()
      .then((userInfo) => {
        res.status(200).json({
          data: {
            authId: userInfo.authId,
            userId: userInfo["_id"],
            userName: userName,
          },
          message: "Registered Successfully",
          code: 1,
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message, code: 0 });
      });
  } catch (err) {
    res.status(401).json({ error: err.message, code: 0 });
  }
};

// @desc  POST:To verify login and return user details
// @route /api/login
// @payload   user from getUser middleware
// @access    private
export const loginUser = async (req, res) => {
  const user = req.user;
  const { userName, email, authId, stats, goals } = user;
  const data = {
    userId: user["_id"],
    userName,

    authId,
  };
  return res.status(200).json({ message: "User Found!", data: data, code: 1 });
};
