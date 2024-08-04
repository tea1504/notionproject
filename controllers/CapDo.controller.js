const hanTuModel = require("../models/CapDo.model");

exports.layDanhSachCapDo = async (req, res, next) => {
  try {
    const result = await hanTuModel.layDanhSachCapDo();
    res.json({ status: "200", data: result })
  } catch (err) {
    console.log(err);
    res.json({ message: err.status || "500", data: error })
  }
}