//@ts-check
const blockModel = require("../models/Block.model");

/**
 * Tìm kiếm Block theo id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.timKiemBlock = async (req, res, next) => {
  try {
    var id = req.query.id;
    const result = await blockModel.timKiemBlock({ id });
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.themBlock = async (req, res, next) => {
  try {
    var id = req.body.id;
    var content = req.body.content;
    const result = await blockModel.themBlock({ id, content });
    res.json({ status: "200", data: result });
  } catch(err) {
    console.log(err);
    res.json({ status: err.status || "500", data: err });
  }
}


exports.capNhatBlock = async (req, res, next) => {
  try {
    var id = req.body.id;
    var content = req.body.content;
    const result = await blockModel.capNhatBlock({ id, content });
    res.json({ status: "200", data: result });
  } catch(err) {
    console.log(err);
    res.json({ status: err.status || "500", data: err });
  }
}
