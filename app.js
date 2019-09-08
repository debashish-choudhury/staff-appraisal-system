const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/staff-db', {
    useNewUrlParser: true
})
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(err => console.log(err));

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//index route
app.get('/', (req, res) => { 
    var title = "Welcome"
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));