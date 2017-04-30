var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var RecordSchema = new Schema({
    RecordNum: {
        type: Int,
        unique: true,
        required: true
    },
    patientid: {
        type: String,
        required: true,
    },
    Doctorid: {
        type: String,
        reuired: yes,
    },
    Appointment: {
        type: Date,
        required: yes,
    },
    patientLastVisit: {
        type: Date,
        required: yes,
    },
    Symptomps: {
        type: String,
        required: yes,
    }
});

module.exports=mongoose.model('Record', RecordSchema);