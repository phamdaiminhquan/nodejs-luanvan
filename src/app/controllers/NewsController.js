const News = require('../models/News');
const { mongooseToObject } = require('../../util/mongoose');

class NewsController {

    //[GET] /news/:slug
    details(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .then((news) =>
                res.render('news/details', { 
                    news: mongooseToObject(news) 
                })
            )
            .catch(next);
    }

    show(req, res, next) {
        News.find({})
            .then((news) => {
                news = news.map(news => news.toObject())
                res.render('news/newsnew', { news })
            })
            .catch(next);
    }

    createnews(req, res, next) {
        res.render("news/createnews")
    }

    store(req, res) {
        const formData = req.body;
        const news = new News(formData);
        news.save();
        res.render('news/store');
    }

    edit(req, res, next) {
        News.findById({ _id: req.params.id })
            .then((news) => {
                res.render('news/edit', {
                    news: mongooseToObject(news)
                })
            })
            .catch(next);
    }
    update(req, res, next) {
        News.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/news'))
            .catch(next);
    }
    delete(req, res, next) {
        News.deleteOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new NewsController();
