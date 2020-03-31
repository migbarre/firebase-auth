import express from 'express'
import bodyParser from 'body-parser'
import userAgent from 'express-useragent'
import chalk from 'chalk'

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(userAgent.express());
app.use(
    bodyParser.json({
        limit: '20mb'
    })
);
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
);
app.use(require('./auth'));

app.listen(app.get('port'), () => {
    console.log(
        chalk.bold.cyanBright(
            `\n🚀   Server running on port ${app.get('port')}.\n`
        )
    )
});