/**
 * Created by ashok on 31/10/15.
 * © Vymo Solutions Pvt. Ltd.
 */

var services = require('../services/');
var _ = require('lodash');
var async = require('async');
var request = require('request')
exports.createProperty = function (req, res) {
    var record = req.body;
    var callback = function (err, response) {
        if (err) {
            console.error(err)
        }
        res.redirect('/properties/list')
    };
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + record.address, function (err, result) {
            if (err) {
                console.error(err);
                return services.createProperty(record, callback)
            }
            record.googleMaps = JSON.parse(result.body).results;
            return services.createProperty(record, callback)
        }
    )
}
;

exports.getProperties = function (req, res, next) {
    var page = Number(req.params.page);
    if (!page || isNaN(page)) {
        page = 1;
    }
    var callback = function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(obj)
    };
    services.getProperties(page, callback)

};

exports.createPropertiesPage = function (req, res) {
    res.render('properties-new');
};
exports.listPropertiesPage = function (req, res) {
    var callback = function (err, properties) {
        res.render('properties-list', {list: properties});
    };
    services.getProperties(1, callback)
};