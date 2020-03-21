if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb+srv://user:user123@appraisal-db-8wrlx.mongodb.net/test'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/staff-db'
    }
}