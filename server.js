const Express = require('express');

const app = new Express();

app.use(Express.static(`${__dirname}/dist`));

app.listen(process.env.PORT || 3000);
