/**
 * Generate sitemap in XML format for article, pages, courses.
 */

const sm = require('sitemap');
const fs = require('fs');
const path = require('path');
const nconf = require('nconf');
const models = require('./models');

function generatePostSitemap() {
    models.getAllArticlesforSitemap((err, articles) => {
        if(err) {
            console.log('error generating sitemap');
            // send email or something
            return;
        }
        // generate sitemap
        let urls = [];
        articles.forEach((singleArticle) => {
            urls.push({
                url: singleArticle.url,
                changefreq: 'daily',
                lastmod: new Date(singleArticle.date),
                priority: 0.9
            })
        });
        let sitemap = sm.createSitemap({
            hostname: 'https://codeforgeek.com',
            urls: urls
        });

        fs.writeFileSync(path.join(nconf.get('sitemapPath'), 'sitemap-posts.xml'), sitemap.toString());    
    });
}

function generatePageSitemap() {
    var sitemap = sm.createSitemap({
        hostname: 'https://codeforgeek.com',        
        urls: [
            { url: '/' , changefreq: 'daily', priority: 0.8 },
            { url: '/articles/' , changefreq: 'daily', priority: 0.8 },
            { url: '/courses/' , changefreq: 'daily', priority: 0.8 },
            { url: '/start-here/', changefreq: 'daily', priority: 0.8 },
            { url: '/about/', changefreq: 'daily', priority: 0.8 },
            { url: '/terms-service/' , changefreq: 'daily', priority: 0.8 },
            { url: '/advertise-on-codeforgeek-media-kit/' , changefreq: 'daily', priority: 0.8 },
            { url: '/best-programming-tutorial-of-the-blog/', changefreq: 'daily', priority: 0.8 },
            { url: '/request-programming-tutorial/', changefreq: 'daily', priority: 0.8 },
            { url: '/contact/', changefreq: 'daily', priority: 0.8 },
            { url: '/privacy-policy/', changefreq: 'daily', priority: 0.8 }
        ]
    });

    fs.writeFileSync(path.join(nconf.get('sitemapPath'), 'sitemap-pages.xml'), sitemap.toString());
}

function generateCourseSitemap() {
    models.getAllCoursesforSitemap((err, result) => {
        if(err) {
            console.log('error generating sitemap');
            // send email or something
            return;
        }
        // generate sitemap
        let urls = [];
        result.course.forEach((singleCourse) => {
            urls.push({
                url: singleCourse.url,
                changefreq: 'daily',
                lastmod: new Date(singleCourse.date),
                priority: 0.9
            })
        });
        result.lessons.forEach((singleLesson) => {
            urls.push({
                url: singleLesson.url,
                changefreq: 'daily',
                priority: 0.9
            })
        });
        let sitemap = sm.createSitemap({
            hostname: 'https://codeforgeek.com',
            urls: urls
        });

        fs.writeFileSync(path.join(nconf.get('sitemapPath'), 'sitemap-courses.xml'), sitemap.toString());    
    });
}

function generateAuthorSitemap() {
    models.getAllAuthorsforSitemap((err, authors) => {
        if(err) {
            console.log('error generating sitemap');
            // send email or something
            return;
        }
        // generate sitemap
        let urls = [];
        authors.forEach((singleAuthor) => {
            urls.push({
                url: singleAuthor.url,
                changefreq: 'weekly',
                priority: 0.7
            })
        });
        let sitemap = sm.createSitemap({
            hostname: 'https://codeforgeek.com',
            urls: urls
        });

        fs.writeFileSync(path.join(nconf.get('sitemapPath'), 'sitemap-authors.xml'), sitemap.toString());    
    });
}

function generateSiteMaps() {
    setTimeout(() => {
        generatePostSitemap();
        generatePageSitemap();
        generateCourseSitemap();
        generateAuthorSitemap();
    }, 1000)
}

module.exports = {
    generateSiteMaps: generateSiteMaps,
}