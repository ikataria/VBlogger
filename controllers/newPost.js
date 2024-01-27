module.exports = (req, res) => {
    let title = "";
    let body = "";
    let image = "";
    const data = req.flash('data')[0];

    console.log(`
    data: ${JSON.stringify(data)}
    data type: ${typeof data}`);

    if(req.session.userId){
        if(typeof data != "undefined"){
            console.log('inside11')
            title = data.title
            body = data.body
            image = data.image
        }

        res.render('create', {
            errors: req.flash('validationErrors'),
            title,
            body,
            image
        });
    }else{
        res.redirect('/auth/login')
    }
}