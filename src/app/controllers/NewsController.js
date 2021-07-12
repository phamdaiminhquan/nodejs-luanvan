const Course = require('../models/Course');

class NewsController {
    // [GET] /news
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                courses = courses.map(course => course.toObject())
                res.render('news', { courses })
            })
            .catch(next);
    }
}

module.exports = new NewsController();
