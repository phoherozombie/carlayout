const express = require('express');										
const path = require('path');										
const hbs = require('hbs');						
const bodyParser = require('body-parser');			
const pageRoutes = require('./routes/pageRoutes');										
										
const app = express();										
const PORT = process.env.PORT || 3000;										
										
// Cấu hình view engine										
app.set('view engine', 'hbs');										
app.set('views', path.join(__dirname, 'views'));										
hbs.registerPartials(path.join(__dirname, 'views/partials'));										

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

// Sử dụng các routes										
app.use('/', pageRoutes);										
										
// Bắt đầu server										
app.listen(PORT, () => {										
console.log(`Server is running on http://localhost:${PORT}`);										
});					


hbs.registerHelper('range', function(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
});

hbs.registerHelper('eq', function(a, b) {
    return a === b;
});

hbs.registerHelper('gt', function(a, b) {
    return a > b;
});

hbs.registerHelper('lt', function(a, b) {
    return a < b;
});

hbs.registerHelper('add', function(a, b) {
    return a + b;
});

hbs.registerHelper('subtract', function(a, b) {
    return a - b;
});