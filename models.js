function getAllArticlesforSitemap(callback) {
    global.db.collection('posts').find({}).sort({
        date: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving posts.');
        }
        callback(false, result);
    });
}

function getAllCoursesforSitemap(callback) {
    global.db.collection('courses').find({}).sort({
        date: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving courses.');
        }
        global.db.collection('lessons').find({}).toArray((err, lessonData) => {
            if (err) {
                return callback(true, 'error retrieving courses.');
            }
            let response = {
                course: result,
                lessons: lessonData
            }
            callback(false, response);
        });
    });
}

function getAllAuthorsforSitemap(callback) {
    global.db.collection('users').find({}).sort({
        id: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving users.');
        }
        callback(false, result);
    });
}

module.exports = {
    getAllArticlesforSitemap: getAllArticlesforSitemap,
    getAllCoursesforSitemap: getAllCoursesforSitemap,
    getAllAuthorsforSitemap: getAllAuthorsforSitemap,
}