const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const same = await bcrypt.compare(req.body.password, user.password);
      if (same) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    if (err) {
      return res.redirect("/auth/register");
    }
  }
};
