const chuDeModel = require("../models/ChuDe.model");

exports.layDanhSachChuDe = async (req, res, next) => {
  try {
    const result = await chuDeModel.layDanhSachChuDe();
    res.json({ status: "200", data: result })
  } catch (err) {
    console.log(err);
    res.json({ message: err.status || "500", data: error })
  }
}
