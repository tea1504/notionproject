const tuVungModel = require("../models/TuVung.model");

exports.layTuVungPage = async (req, res, next) => {
  res.render('TuVung/TuVung', { title: 'Từ vựng' });
}

exports.layTuVungPageChiTiet = async (req, res, next) => {
  res.render('TuVung/Detail', { title: 'Từ vựng' });
}
