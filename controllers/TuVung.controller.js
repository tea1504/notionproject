//@ts-check
const tuVungModel = require("../models/TuVung.model");

exports.layTuVungPage = async (req, res, next) => {
  res.render('TuVung/TuVung', { title: 'Từ vựng' });
}

exports.layTuVungPageChiTiet = async (req, res, next) => {
  res.render('TuVung/Detail', { title: 'Từ vựng' });
}

exports.layTuVungPageFlowChart = async (req, res, next) => {
  var name = req.query.name;
  res.render('TuVung/FlowChart', { title: 'Vẽ sơ đồ flowchart', name });
}

exports.timKiemTuVung = async (req, res, next) => {
  try {
    var id = req.query.id;
    var name = req.query.name;
    const result = await tuVungModel.timKiemTuVung({ id, name });
    if (result) {
      res.json({ status: "200", data: result });
    }
    else {
      res.json({ status: "404", data: result });
    }
  } catch(err) {
    console.log(err);
    res.json({ status: err.status || "500", data: err });
  }
}
