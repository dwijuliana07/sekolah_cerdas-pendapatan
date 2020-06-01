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

exports.createTambahPendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/create-pendapatan-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var sql = `INSERT INTO sekolah_cerdas.income (
            inc_head_id,
            name,
            invoice_no,
            date,
            amount,
            note,
            is_active,
            is_deleted,
            created_at,
            documents
      ) 
      VALUES
        (
        '`+ req.body.incHead + `',
        '`+ req.body.name + `',
        '`+ req.body.invoiceNo + `',
        '`+ req.body.date + `',
        '`+ req.body.amount + `',
        '`+ req.body.note + `',
        'yes',
        'no',
        NOW(),
        '`+ req.body.documents + `'
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

exports.readTambahPendapatan = function (req, res) {
    perf.start();
    var total = 0;
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/read-pendapatan-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPendapatan != null || req.body.idPendapatan != undefined) {
        condition = " AND id = " + req.body.idPendapatan;
    }
    var sql = `SELECT 
            inc_head_id,
            name,
            invoice_no,
            date,
            amount,
            note,
            is_active,
            is_deleted,
            created_at,
            updated_at,
            documents
        FROM
            sekolah_cerdas.income
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

exports.updateTambahPendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/update-pendapatan-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPendapatan != null || req.body.idPendapatan != undefined) {
        condition = " AND id = " + req.body.idPendapatan;
    }
    var sql = `UPDATE 
        sekolah_cerdas.income
     SET
            inc_head_id = '`+ req.body.incHead + `',
            name = '`+ req.body.name + `',
            invoice_no = '`+ req.body.invoiceNo + `',
            date = '`+ req.body.date + `',
            amount = '`+ req.body.amount + `',
            note = '`+ req.body.note + `',
            is_active = 'yes',
            is_deleted = 'no',
            updated_at = NOW(),
            documents = '`+ req.body.documents + `'
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

exports.deleteTambahPendapatan = function (req, res) {
    perf.start();
    console.log(dateFormat(dt.now(), "dd mmmm yyyy HH:MM:ss"));
    console.log("api-name : /services/delete-pendapatan-tambah");
    console.log("body sent : ");
    console.log(req.body);

    var condition = "";

    if (req.body.idPendapatan != null || req.body.idPendapatan != undefined) {
        condition = " AND id = " + req.body.idPendapatan;
    }

    var sql = `DELETE 
        FROM
            sekolah_cerdas.income
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

