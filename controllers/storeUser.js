const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    if(err){
      const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
      // req.session.validationErrors = validationErrors; //-> Session is permanent, it means errors msg will be there until we destroy the session. We will use the FLUSHING technique instead.
      req.flash("validationErrors", validationErrors);
      req.flash('data', req.body);
        return res.redirect('/auth/register');
    }
  }
};
