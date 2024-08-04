require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model.js");
const capDoModel = require("./CapDo.model.js");
const giaTrinhModel = require("./GiaoTrinh.model.js");

exports.NAME = {
  CAP_DO: "Cấp độ",
  GIAO_TRINH: "Giáo trình",
  LA_BO_THU: "Là bộ thủ"
}

exports.layNameID = async (page_id) => {
  const result = await notion.pages.retrieve({ page_id });
  var res = { ...utils.IDName };
  res.id = result.id;
  res.name = result.properties.Name.title[0].plain_text;
  return res;
}

exports.layHanTuTuID = async (page_id) => {
  const result = await notion.pages.retrieve({ page_id });
  return await this.LayDuLieu(result);
}

exports.layHanTuTuName = async (name) => {
  const database_id = process.env.HAN_TU;

  const result = await notion.databases.query({
    database_id,
    filter: {
      property: "Name",
      rich_text: {
        equals: name,
      },
    }
  });

  if (result.results.length > 0) {
    return await this.LayDuLieu(result.results[0]);
  }

  return null;
}

exports.LayDuLieu = async (result = { ...utils.hanTu.page }) => {
  var properties = { ...utils.hanTu.page.properties }
  var capDo = [...utils.IDNames];
  var giaoTrinh = [...utils.IDNames];
  var laBoThu = [...utils.IDNames];
  var coBoThu = [...utils.IDNames];
  var chuDe = [...utils.IDNames];
  var viDu = [...utils.IDNames];
  var relations = [...utils.relations];

  properties = result.properties;

  // capDo
  capDo = [];
  relations = properties["Cấp độ"].relation;
  for (var relation of relations) {
    capDo.push(await capDoModel.layNameID(relation.id))
  }

  // giaoTrinh
  giaoTrinh = [];
  relations = properties["Giáo trình"].relation;
  for (var relation of relations) {
    giaoTrinh.push(await giaTrinhModel.layNameID(relation.id))
  }

  // laBoThu
  laBoThu = [];
  relations = properties["Là bộ thủ"].relation;
  for (var relation of relations) {
    laBoThu.push(await this.layNameID(relation.id))
  }

  // coBoThu
  coBoThu = [];
  relations = properties["Có bộ thủ"].relation;
  for (var relation of relations) {
    coBoThu.push(await this.layNameID(relation.id))
  }

  // // chuDe
  // coBoThu = [];
  // relations = properties["Có bộ thủ"].relation;
  // for (var relation of relations) {
  //   coBoThu.push(await this.layNameID(relation.id))
  // }

  // // viDu
  // coBoThu = [];
  // relations = properties["Có bộ thủ"].relation;
  // for (var relation of relations) {
  //   coBoThu.push(await this.layNameID(relation.id))
  // }

  return {
    id: result.id,
    url: result.url,
    name: properties.Name.title[0].plain_text,
    capDo,
    giaoTrinh,
    hanViet: properties["Hán Việt"].rich_text.length > 0 ? properties["Hán Việt"].rich_text[0].plain_text : "",
    nghia: properties.Nghĩa.rich_text.length > 0 ? properties.Nghĩa.rich_text[0].plain_text : "",
    kun: properties.訓.multi_select,
    on: properties.音.multi_select,
    amDacBiet: properties.特別.multi_select,
    laBoThu,
    coBoThu,
    soNet: properties["Số nét"].number,
    lucThu: properties["Lục thư"].multi_select,
  }
}