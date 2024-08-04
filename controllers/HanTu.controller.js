const hanTuModel = require("../models/HanTu.model");

exports.layHanTuPage = async (req, res, next) => {
  const ID = req.query.id;
  if (ID) {
    var item = await hanTuModel.layNameID(ID);
    res.render('HanTu/Detail', { title: 'Hán tự', name: item.name, id: item.id });
  }
  else {
    res.render('HanTu/HanTu', { title: 'Hán tự' });
  }
}

exports.layHanTuTuID = async (req, res, next) => {
  const ID = req.params.id;
  try {
    const result = await hanTuModel.layHanTuTuID(ID);
    res.json({ status: "200", data: result });
  } catch (err) {
    console.log(err);
    res.json({ status: err.status || "500", data: err });
  }
}

exports.LayHanTuTuName = async (req, res, next) => {
  const name = req.query.name;
  try {
    const result = await hanTuModel.layHanTuTuName(name);
    if (result) {
      res.json({ status: "200", data: result });
    }
    else {
      res.json({ status: "404", data: null });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: err.status || "500", data: err });
  }
}