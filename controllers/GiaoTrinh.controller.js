const giaoTrinhModel = require("../models/GiaoTrinh.model.js");

exports.timDanhSachGiaoTrinhTheoCha = async (req, res, next) => {
  var parent_id = "";
  parent_id = req.query.parent_id;

  try {
    const result = await giaoTrinhModel.timDanhSachGiaoTrinhTheoCha(parent_id);
    res.json({ status: "200", data: result })
  } catch (err) {
    console.log(err);
    res.json({ message: err.status || "500", data: error })
  }
}