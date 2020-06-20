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
    global.db.collection('courses').find({isPublished: true}).sort({
        date: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving courses.');
        }
        let courseIds = [];
        result.forEach((singleCourse) => {
            courseIds.push(singleCourse.id);
        });
        global.db.collection('lessons').find({courseId : { $in: courseIds } } ).toArray((err, lessonData) => {
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
    global.db.collection('authors').find({}).sort({
        id: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving users.');
        }
        callback(false, result);
    });
}

function getAllBitsforSitemap(callback) {
    global.db.collection('bits').find({}).sort({
        date: -1
    }).toArray((err, result) => {
        if (err) {
            return callback(true, 'error retrieving bits.');
        }
        callback(false, result);
    });
}

module.exports = {
    getAllArticlesforSitemap: getAllArticlesforSitemap,
    getAllCoursesforSitemap: getAllCoursesforSitemap,
    getAllAuthorsforSitemap: getAllAuthorsforSitemap,
    getAllBitsforSitemap: getAllBitsforSitemap,
}
