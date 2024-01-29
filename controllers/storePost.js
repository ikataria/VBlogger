const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  try {
    let image = req.files.image;

    image.mv(path.resolve(__dirname, "..", "public/assets/img", image.name),async (err) => {
        try {
          await BlogPost.create({...req.body,image: "/assets/img/" + image.name, userid: req.session.userId});
          res.redirect("/");
        } catch (err) {
          let validationErrors = Object.keys(err.errors).map((key) => err.errors[key].message);
          req.flash("validationErrors", validationErrors);
          req.flash('data', req.body);
          return res.redirect("/posts/new");
        }
      }
    );
  } catch (err) {
    let validationErrors = "Please provide image";
    req.flash("validationErrors", validationErrors);
    req.flash('data', req.body)
    res.redirect("/posts/new");
  }
};
