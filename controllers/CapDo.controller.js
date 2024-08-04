const capDoModel = require("../models/CapDo.model");

exports.layDanhSachCapDo = async (req, res, next) => {
  try {
    const result = await capDoModel.layDanhSachCapDo();
    res.json({ status: "200", data: result })
  } catch (err) {
    console.log(err);
    res.json({ message: err.status || "500", data: err })
  }
}

exports.timDanhSachCapDo = async (req, res, next) => {
  const name = req.query.name;
  try {
    const result = await capDoModel.timDanhSachCapDo(name);
    res.json({ status: "200", data: result })
  } catch (err) {
    console.log(err);
    res.json({ message: err.status || "500", data: err })
  }
}