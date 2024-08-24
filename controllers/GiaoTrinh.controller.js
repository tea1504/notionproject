const giaoTrinhModel = require("../models/GiaoTrinh.model.js");

exports.timDanhSachGiaoTrinhPage = async (req, res, next) => {
  res.render("GiaoTrinh/GiaoTrinhTimKiem.view.pug")
} 

exports.timDanhSachGiaoTrinhTheoCha = async (req, res, next) => {
  var parent_id = req.query.parent_id;
  var id = req.body.id;
  var name = req.body.name;
  var slug = req.body.slug;

  try {
    var result = {};
    if (id || name || slug) {
      result = await giaoTrinhModel.timKiemGiaoTrinh({ id, name, slug });
    }
    else {
      result = await giaoTrinhModel.timDanhSachGiaoTrinhTheoCha(parent_id);
    }
    res.json({ status: "200", data: result })
  } catch (err) {
    console.error(err);
    res.json({ message: err.status || "500", data: err })
  }
}
