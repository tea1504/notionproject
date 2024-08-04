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

exports.layHanTuTuName = async (req, res, next) => {
  const name = req.query.name;
  console.log("LayHanTuTuName", name);
  
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

exports.themMoiHanTu = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await hanTuModel.themMoiHanTu(data);
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

exports.capNhatHanTu = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await hanTuModel.capNhatHanTu(data);
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