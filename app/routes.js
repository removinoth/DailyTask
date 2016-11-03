var user = require('./model/users');
var Excel = require('exceljs');
var mongoose = require('mongoose');
var mailer = require('nodemailer');
var config = require('../config/config');
var fs = require('fs');
var smtpTransport = require('nodemailer-smtp-transport');
var User = mongoose.model('User');
var email = require("../node_modules/emailjs/email");

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendfile("index.html");
    });
    app.post('/cwttaskdetails', function(req, res) {
        console.log('here');
        user = new User(req.body);
        user.save(req.body, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.end("yes");
            }
        })

    });
    app.get('/sendEmail/', function(req, res) {
        var options = {
            filename: './dailyTask.xlsx',
            useStyles: true,
            useSharedStrings: true
        };
        var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
        var sheet = workbook.addWorksheet('My Sheet1');
        sheet.columns = [
            { header: 'S.No', key: 'sno', width: 10 },
            { header: 'client', key: 'client', width: 32 },
            { header: 'project', key: 'project', width: 20, outlineLevel: 1 },
            { header: 'task', key: 'task', width: 32, outlineLevel: 1 },
            { header: 'subtask', key: 'subtask', width: 32, outlineLevel: 1 },
            { header: 'date', key: 'date', width: 15, outlineLevel: 1 },
            { header: 'hours', key: 'hours', width: 10, outlineLevel: 1 },
            { header: 'taskType', key: 'taskType', width: 10, outlineLevel: 1 },
            { header: 'taskStatus', key: 'taskStatus', width: 10, outlineLevel: 1 }
        ];
        User.find(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data)
                var row = [];
                for (var i = 0; i < data.length; i++) {
                    row = sheet.addRow({
                        sno: i,
                        client: data[i].client,
                        project: data[i].project,
                        task: data[i].task,
                        subtask: data[i].subtask,
                        date: data[i].date,
                        hours: data[i].hours,
                        taskType: data[i].taskType,
                        taskStatus: data[i].taskStatus
                    });
                    sheet.getCell("D" + (i + 2)).alignment = { wrapText: true };
                    sheet.getCell("E" + (i + 2)).alignment = { wrapText: true };
                }
                //sheet.getCell("D1").alignment = { wrapText: true };

                row.commit();


                sheet.commit();

                workbook.commit();
                sendEmail();
            }
        })
    });


    function sendEmail() {
        var server = email.server.connect({
            user: config.mailer.options.auth.user,
            password: config.mailer.options.auth.pass,
            host: config.mailer.options.host,
            ssl: true
        });

        var message = {
            text: "Hi All, \n   Hereby I have attached testing daily sheet along with this mail.",
            from: "test@mail.com",
            to: "test@mail.com",
            //cc:      "sathish@canwin.com",
            subject: "testing Android App",
            attachment: [
                //{data:"<html>i <i>hope</i> this works!</html>", alternative:true},
                { path: "./dailyTask.xlsx", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name: "Dailysheet.xlsx" }
            ]
        };

        // send the message and get a callback with an error or details of the message that was sent
        server.send(message, function(err, message) { console.log(err || message); });
    }
};
