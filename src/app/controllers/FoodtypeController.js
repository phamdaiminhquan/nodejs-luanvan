const Foodtype = require('../models/Foodtype');
const { mongooseToObject } = require('../../util/mongoose');
class FoodtypeController {

        
    showfoodtype(req, res, next) {
        Foodtype.find({})
            .then((foodtype) => {
                foodtype = foodtype.map(foodtype => foodtype.toObject())
                res.render('foodtype/foodtypelist', { 
                    foodtype,
                    layout: 'admain'
                })
            })
            .catch(next);
    }
    
    createtype(req, res, next) {
        res.render("foodtype/createtype")
    }
    store(req, res) {
        const formData = req.body;
        const foodtype = new Foodtype(formData);
        foodtype.save();
        res.render('foodtype/store');
    }
    edit(req, res, next) {
        Foodtype.findById({_id: req.params.id})
            .then((foodtype)=>{
                res.render('foodtype/edit',{
                    foodtype: mongooseToObject(foodtype) 
                })
            })
            .catch(next);
    }
    update(req, res, next) {
        Foodtype.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/foodtypelist'))
            .catch(next);
    }
    delete(req, res, next) {
        Foodtype.deleteOne({ _id: req.params.id },req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new FoodtypeController();  