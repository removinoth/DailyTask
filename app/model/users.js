/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
    client: {
        type: String,
        trim: true,
    },
    project: {
        type: String,
        trim: true
    },
    task: {
        type: String,
        trim: true
    },
    subtask: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
        //required: 'User Name Required'
    },
    hours: {
        type: String,
        trim: true
        
    },
    taskType: {
        type: String,
        trim: true
    },
    taskStatus: {
        type: String,
        trim: true
    }
});



// UserSchema.plugin(uniqueValidator, { message: 'User Name already exists!' });
