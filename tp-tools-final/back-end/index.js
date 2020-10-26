require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const properties = require('./properties/properties')
const port = properties.PORT
const app = express()
const requestIp = require('request-ip');
const router = express.Router()
const routes = require('./routes/router')
const { logger, middleware, errorHandler } = require('./controllers/err.handler')
const { exceptionHandler } = require('./controllers/csrf.handler')
const { jwt } = require('./controllers/jwt.controller')
const { configure } = require('./controllers/configure')
const path = require('path')
const helmet = require('helmet');
const fs = require('fs');
const http = require("http").Server(app);
const corsOptions = { origin: '*' }
const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
}
const https = require("https").createServer(options, app);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(requestIp.mw());
configure((call) => { app.use(jwt()) });
app.use(logger);
app.use(express.static(path.join(__dirname, '/dist')));

app.use(middleware);
app.use(cookieParser());
app.use(exceptionHandler);
app.use('/api', router);
routes(router);

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html')) })

app.use(errorHandler);

/*
app.listen(port, function() {
    console.log(properties.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString());
});
*/

if (process.env.ENV1 === 'Production') {
    app.use(helmet());
    https.listen(port, function() {
        console.log(process.env.ENV1, ':HTTPS Listening on port', port, '- start:', Date(Date.now()).toString());
    });
} else {
    http.listen(port, function() {
        console.log(process.env.ENV1, ':HTTP Listening on port', port, '- start:', Date(Date.now()).toString());
    });
}