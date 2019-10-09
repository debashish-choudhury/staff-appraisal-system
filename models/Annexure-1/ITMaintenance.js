const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ITMaintenance = new Schema({
    class_name: {
        type: String,
        required: true
    },
    IT_maintenance_desc: {
        type: String,
        required: true
    },
    IT_maintenance_task: {
        type: String,
        required: true
    },
    it_maintenance_date: {
        type: Date,
        required: true
    }
});

mongoose.model('itmaintenance', ITMaintenance);