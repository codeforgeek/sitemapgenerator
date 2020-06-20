const mongo = require('mongodb');
const nconf = require('nconf');
const chalk = require('chalk');
const cron = require('node-cron');

// load config file
nconf.argv().env().file({ file: __dirname + '/config.json' });
const sitemap = require('./sitemap');

// connect to MongoDB
var dbo = null;
mongo.connect(nconf.get('mongodbURL'), {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    dbo = db.db('codeforgeek');
    global.db = dbo;
    console.log(`${chalk.green('✓')} Connected to ${chalk.green('MongoDB')} database`);
});

// run sitemap generation every 24 hour at 12:00 AM
cron.schedule('0 0 0 * * *', () => {
    // start sitemap generation process
    sitemap.generateSiteMaps();
});
