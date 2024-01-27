const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    console.log(`2. yha aaya try block`, __filename);

    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    if(err){
    console.log(`2. yha aaya error blck main`, __filename);

      const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
      req.flash("validationErrors", validationErrors);
      req.flash('data', req.body);
      // req.session.validationErrors = validationErrors;
      console.log(__filename, validationErrors);
        return res.redirect('/auth/register');
    }
  }
};
