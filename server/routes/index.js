const express = require('express');


const app = express();
app.use(require('./usuario'));
app.use(require('./producto'));
app.use(require('./categoria'));
app.use(require('./bodega'));
app.use(require('./productoBodega'));
app.use(require('./HistorialOrden'));
app.use(require('./distribucion'));
app.use(require('./historialMovimiento'));
app.use(require('./countBodega'));
app.use(require('./login'));

module.exports = app;