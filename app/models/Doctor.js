var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Doctor = new Schema({
    DoctorID: {
        type: Int,
        unique: true,
        required: true
    },
    Doctor_Lname: {
        type: String,
        required: true,
    },
    Doctor_Fname: {
        type: String,
        reuired: yes,
    },
    Doctor_Hiredate: {
        type: Date,
        required: yes,
    },
    Doctor_Contact: {
        type: String,
        required: yes,
    },
    Doctor_Qualification: {
    	type: String,
    	required: yes,
    },
    Doctor_Salary {
    	type: String,
    	required: yes,
    }
    
});

module.exports=mongoose.model('Doctors Information', PatientSchema);