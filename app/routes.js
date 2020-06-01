'use strict';

module.exports = function (app) {
    var control = require('./controller/tambahPendapatan');
    var cors = require('cors')

    app.use(cors())
    //Default API Access
    app.route('/services').get(control.index);

    //Tambah Pendapatan
    app.route('/services/create-pendapatan-tambah').post(control.createTambahPendapatan);
    app.route('/services/read-pendapatan-tambah').get(control.readTambahPendapatan);
    app.route('/services/update-pendapatan-tambah').post(control.updateTambahPendapatan);
    app.route('/services/delete-pendapatan-tambah').post(control.deleteTambahPendapatan);
    
    //Tipe Pendapatan
    var tipe = require('./controller/tipePendapatan');
    app.route('/services/create-pendapatan-tipe').post(tipe.createTipePendapatan);
    app.route('/services/read-pendapatan-tipe').get(tipe.readTipePendapatan);
    app.route('/services/update-pendapatan-tipe').post(tipe.updateTipePendapatan);
    app.route('/services/delete-pendapatan-tipe').post(tipe.deleteTipePendapatan);

    //Cari Pendapatan
    var cari = require('./controller/cariPendapatan.js');
    app.route('/services/read-pendapatan-cari-tanggal').get(cari.findPendapatan);
    app.route('/services/read-pendapatan-cari-text').get(cari.findPendapatanText);

};
