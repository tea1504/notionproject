require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model.js");
const capDoModel = require("./CapDo.model.js");
const giaTrinhModel = require("./GiaoTrinh.model.js");

exports.NAME = {
  CAP_DO: "Cấp độ",
  GIAO_TRINH: "Giáo trình",
  LA_BO_THU: "Là bộ thủ",
  KUN: "訓",
  ON: "音",
  HAN_VIET: "Hán Việt",
  NGHIA: "Nghĩa",
  SO_NET: "Số nét",
  CO_BO_THU: "Có bộ thủ",
  CHU_DE: "Chủ đề",
  LUC_THU: "Lục thư",
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

/**
 * 
 * @param {{
 * id?:string,
 * name?:string
 * }} data 
 * @param {boolean} isRelation 
 * @returns 
 */
exports.timKiemHanTu = async (data, isRelation = true) => {
  const database_id = process.env.HAN_TU;
  var id = data.id;
  var name = data.name;
  var filter = {}
  if (id) {
    const result = await notion.pages.retrieve({
      page_id: id
    })
    // @ts-ignore
    return await this.LayDuLieu(result, isRelation);
  }
  else {
    if (name) {
      filter = {
        property: "Name",
        rich_text: {
          equals: name ?? "",
        },
      }
    }
    const result2 = await notion.databases.query({
      // @ts-ignore
      database_id: database_id,
      // @ts-ignore
      filter: filter
    });

    if (result2.results.length > 0) {
      // @ts-ignore
      return await this.LayDuLieu(result2.results[0], isRelation);
    }
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

  // chuDe
  chuDe = [];
  relations = properties["Chủ đề"].relation
  for (var relation of relations) {
    chuDe.push(await this.layNameID(relation.id))
  }

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
    chuDe,
  }
}

exports.themMoiHanTu = async (data = { ...utils.hanTu.data }) => {
  var database_id = process.env.HAN_TU;
  var properties = await this.makeProperties(data);

  const result = await notion.pages.create({
    "parent": {
      "type": "database_id",
      database_id
    },
    properties
  });

  return this.LayDuLieu(result);
}

exports.capNhatHanTu = async (data = { ...utils.hanTu.data }) => {
  var properties = {
    "Cấp độ": {
      relation: []
    },
    "Giáo trình": {
      relation: []
    },
    "Hán Việt": {
      "rich_text": [
        {
          "text": {
            "content": ""
          }
        }
      ]
    },
    "Nghĩa": {
      "rich_text": [
        {
          "text": {
            "content": ""
          }
        }
      ]
    },
    "訓": {
      multi_select: []
    },
    "音": {
      multi_select: []
    },
    "Số nét": {
      "number": 0
    },
  };

  properties = await this.makeProperties(data);

  const result = await notion.pages.update({
    page_id: data.id,
    properties
  })

  return this.LayDuLieu(result);
}

exports.makeProperties = async (data = { ...utils.hanTu.data }) => {
  var properties = {};

  if (data.name) {
    properties["Name"] = {
      "title": [
        {
          "text": {
            "content": data.name
          }
        }
      ]
    };
  }

  if (data.capDo) {
    properties[this.NAME.CAP_DO] = { relation: [] };
    for (var item of data.capDo) {
      if (await capDoModel.timDanhSachCapDo(item.name)) {
        properties[this.NAME.CAP_DO].relation.push({ id: item.id });
      };
    }
  }

  if (data.giaoTrinh) {
    properties[this.NAME.GIAO_TRINH] = { relation: [] };
    for (var item of data.giaoTrinh) {
      if (await giaTrinhModel.timDanhSachGiaoTrinh(item.name)) {
        properties[this.NAME.GIAO_TRINH].relation.push({ id: item.id });
      };
    }
  }

  if (data.hanViet) {
    properties[this.NAME.HAN_VIET] = {
      "rich_text": [
        {
          "text": {
            "content": data.hanViet
          }
        }
      ]
    };
  }

  if (data.nghia) {
    properties[this.NAME.NGHIA] = {
      "rich_text": [
        {
          "text": {
            "content": data.nghia
          }
        }
      ]
    }
  }

  if (data.kun) {
    properties[this.NAME.KUN] = { multi_select: [] };
    properties[this.NAME.KUN].multi_select = [...new Set(data.kun.map(e => e.name))].map(e => { return { name: e } });
  }

  if (data.on) {
    properties[this.NAME.ON] = { multi_select: [] };
    properties[this.NAME.ON].multi_select = [...new Set(data.on.map(e => e.name))].map(e => { return { name: e } });
  }

  if (data.soNet) {
    properties[this.NAME.SO_NET] = {
      "number": parseInt(data.soNet)
    }
  }

  if (data.coBoThu) {
    properties[this.NAME.CO_BO_THU] = { relation: [] };
    for (var item of data.coBoThu) {
      var itemCheck = await this.layHanTuTuName(item.name)
      if (itemCheck) {
        properties[this.NAME.CO_BO_THU].relation.push({ id: itemCheck.id });
      }
      else {
        var r = await this.themMoiHanTu(item);
        properties[this.NAME.CO_BO_THU].relation.push({ id: r.id });
      }
    }
  }

  // chu de

  if (data.lucThu) {
    properties[this.NAME.LUC_THU] = { multi_select: [] };
    properties[this.NAME.LUC_THU].multi_select = [...new Set(data.lucThu.map(e => e.name))].map(e => { return { name: e } });
  }

  return properties
}