'use strict';

var response = require('../res');
var connection = require('../conn');

const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
var time = "";

exports.index = function (req, res) {
    response.ok("403 Forbidden (You don't have permission to access this API)", res)
};

exports.createTipePendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pendapatan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.income_head (
            income_category,
            description,
            is_active,
            is_deleted,
            created_at
      ) 
      VALUES
        (
        '`+ req.body.incomeCategory + `',
        '`+ req.body.description + `',
        'yes',
        'no',
        NOW()
        ) ;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.readTipePendapatan = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pendapatan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTipe != null || req.body.idTipe != undefined) {
        condition = " AND id = " + req.body.idTipe;
    }
    var sql = `SELECT 
            income_category,
            description,
            is_active,
            is_deleted,
            created_at,
            updated_at
        FROM
            sekolah_cerdas.income_head
     WHERE 1=1  
       `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successGet(status_code, time, messages, total, result, res);
        }
    });
};

exports.updateTipePendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pendapatan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTipe != null || req.body.idTipe != undefined) {
        condition = " AND id = " + req.body.idTipe;
    }
    var sql = `UPDATE 
        sekolah_cerdas.income_head
     SET
            income_category = '`+ req.body.incomeCategory + `',
            description  = '`+ req.body.description + `',
            is_active = 'yes',
            is_deleted  = 'no',
            updated_at = NOW()
     WHERE 1 = 1
     `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};

exports.deleteTipePendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pendapatan-tipe");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idTipe != null || req.body.idTipe != undefined) {
        condition = " AND id = " + req.body.idTipe;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.income_head
        WHERE 1 = 1 
        `+ condition + `;`;

    connection.query(sql, function (error, result, fields) {
        if (error) {
            status_code = "500"
            messages = "Internal server error";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.error(status_code, time, messages, error, res);
        } else {
            status_code = "200";
            messages = "Success";
            elapseTime = perf.stop();
            time = elapseTime.time.toFixed(2);
            response.successPost(status_code, time, messages, res);
        }
    });
};
