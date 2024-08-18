//@ts-check
// @ts-ignore
require("dotenv").config()
// @ts-ignore
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model.js");
const tuLoaiModel = require("./TuLoai.model.js");
const chuDeModel = require("./ChuDe.model.js");
const giaoTrinhModel = require("./GiaoTrinh.model.js");
const hanTuModel = require("./HanTu.model.js");
const viDuModel = require("./ViDu.model.js");

exports.NAME = {
  NGHIA: "Nghĩa",
  CHU_DE: "Chủ đề",
  LIEN_QUAN: "Liên quan",
  DONG_NGHIA: "Đồng nghĩa",
  TRO_TU: "Trợ từ",
  TU_LOAI: "Từ loại",
  TRAI_NGHIA: "Trái nghĩa",
  SLUG: "slug",
  HAN_TU: "Hán tự",
  FURIGANA: "ふりがな",
  NAME: "Name",
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
exports.timKiemTuVung = async (data, isRelation = true) => {
  const database_id = process.env.TU_VUNG;
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
  }

  return null;
}

/**
 * 
 * @param {typeof utils.tuVung.page} result 
 * @param {boolean} isRelation 
 * @returns {Promise<typeof utils.tuVung.data>}
 */
exports.LayDuLieu = async (result, isRelation = true) => {
  var relations = [...utils.relations];
  var properties = result.properties;
  var dongNghia = [...utils.IDNames];
  var traiNghia = [...utils.IDNames];
  var lienQuan = [...utils.IDNames];
  var tuLoai = [...utils.IDNames];
  var chuDe = [...utils.IDNames];
  var giaoTrinh = [...utils.IDNames];
  var hanTu = [...utils.IDNames];
  var viDu = [...utils.IDNames];

  dongNghia = [];
  if (isRelation) {
    dongNghia = await this.LayRealtion(properties["Đồng nghĩa"].relation, 1);
  }

  traiNghia = [];
  if (isRelation) {
    traiNghia = await this.LayRealtion(properties["Trái nghĩa"].relation, 1);
  }

  lienQuan = [];
  if (isRelation) {
    lienQuan = await this.LayRealtion(properties["Liên quan"].relation, 1);
  }

  tuLoai = [];
  if (isRelation) {
    tuLoai = await this.LayRealtion(properties["Từ loại"].relation, 2);
  }

  chuDe = [];
  if (isRelation) {
    chuDe = await this.LayRealtion(properties["Chủ đề"].relation, 3);
  }

  giaoTrinh = [];
  if (isRelation) {
    giaoTrinh = await this.LayRealtion(properties["Giáo trình"].relation, 4);
  }

  hanTu = [];
  if (isRelation) {
    hanTu = await this.LayRealtion(properties["Hán tự"].relation, 5);
  }

  viDu = [];
  if (isRelation) {
    viDu = await this.LayRealtion(properties["Ví dụ"].relation, 6);
  }

  return {
    id: result.id,
    url: result.url,
    name: properties.Name.title[0].plain_text,
    furigana: properties.ふりがな.rich_text.length > 0 ? 
              properties.ふりがな.rich_text[0].plain_text : "",
    dongNghia, traiNghia,lienQuan,
    slug: properties.slug.rich_text.length > 0 ?
          properties.slug.rich_text[0].plain_text : "",
    nghia: properties.Nghĩa.rich_text.length > 0 ?
            properties.Nghĩa.rich_text[0].plain_text : "",
    tuLoai, chuDe, giaoTrinh, hanTu, 
    troTu: properties["Trợ từ"].multi_select,
    viDu,
  }
}

/**
 * 
 * @param {typeof utils.relations} relations 
 * @param {Number} loai 
 * @returns {Promise<typeof utils.IDNames>}
 */
exports.LayRealtion = async (relations, loai) => {
  var result = [...utils.IDNames];
  result = []
  var temp;
  for (var rel of relations) {
    switch(loai){
      case 1:
        temp = await this.timKiemTuVung({ id: rel.id }, false);
        break
      case 2:
        temp = await tuLoaiModel.timKiemTuLoai({ id: rel.id }, false);
        break
      case 3:
        temp = await chuDeModel.timKiemChuDe({ id: rel.id }, false);
        break
      case 4:
        temp = await giaoTrinhModel.timKiemGiaoTrinh({ id: rel.id }, false);
        break
      case 5:
          temp = await hanTuModel.timKiemHanTu({ id: rel.id }, false);
          break
      case 6:
          temp = await viDuModel.timKiemViDu({ id: rel.id }, false);
          break
    }
    result.push({
      id: rel.id,
      name: temp?.name ?? ""
    });
  }
  return result;
}

exports.themMoiTuVung = async (data = {...utils.tuVung.data}) => {
  var database_id = process.env.TU_VUNG ?? "";
  var properties = await this.makeProperties(data);

  const result = await notion.pages.create({
    "parent": {
      "type": "database_id",
      database_id
    },
    // @ts-ignore
    properties
  });
  
  // @ts-ignore
  return this.LayDuLieu(result);
}

exports.capNhatTuVung = async (data = {...utils.tuVung.data}) => {
  var properties = {};
  properties = await this.makeProperties(data);

  const result = await notion.pages.update({
    page_id: data.id,
    // @ts-ignore
    properties
  });

  // @ts-ignore
  return this.LayDuLieu(result);
}

/**
 * 
 * @param {typeof utils.tuVung.data} data 
 * @returns 
 */
exports.makeProperties = async (data = {...utils.tuVung.data}) => {
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

  if (data.furigana) {
    properties[this.NAME.FURIGANA] = {
      "rich_text": [
        {
          "text": {
            "content": data.furigana
          }
        }
      ]
    };
  }

  if (data.slug) {
    properties[this.NAME.SLUG] = {
      "rich_text": [
        {
          "text": {
            "content": data.slug
          }
        }
      ]
    };
  }

  if (data.slug) {
    properties[this.NAME.SLUG] = {
      "rich_text": [
        {
          "text": {
            "content": data.slug
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
    };
  }

  // tuLoai
  // giaoTrinh
  
  // hanTu
  if (data.hanTu) {
    properties[this.NAME.HAN_TU] = { relation: [] };
    for (var item of data.hanTu) {
      var resHanTu = await hanTuModel.timKiemHanTu({name: item.name}, false)
      if (resHanTu) {
        properties[this.NAME.HAN_TU].relation.push({ id: resHanTu.id });
      }
      else {
        // @ts-ignore
        resHanTu = await hanTuModel.themMoiHanTu({name: item.name});
        properties[this.NAME.HAN_TU].relation.push({ id: resHanTu.id });
      }
    }
  }

  // dongNghia
  if (data.dongNghia) {
    properties[this.NAME.DONG_NGHIA] = { relation: [] };
    for (var item of data.dongNghia) {
      var resDongNghia = await this.timKiemTuVung({name: item.name}, false)
      if (resDongNghia) {
        properties[this.NAME.DONG_NGHIA].relation.push({ id: resDongNghia.id });
      }
      else {
        // @ts-ignore
        resDongNghia = await this.themMoiTuVung({name: item.name});
        properties[this.NAME.DONG_NGHIA].relation.push({ id: resDongNghia.id });
      }
    }
  }

  // traiNghia
  if (data.traiNghia) {
    properties[this.NAME.TRAI_NGHIA] = { relation: [] };
    for (var item of data.traiNghia) {
      var resTraiNghia = await this.timKiemTuVung({name: item.name}, false)
      if (resTraiNghia) {
        properties[this.NAME.TRAI_NGHIA].relation.push({ id: resTraiNghia.id });
      }
      else {
        // @ts-ignore
        resTraiNghia = await this.themMoiTuVung({name: item.name});
        properties[this.NAME.TRAI_NGHIA].relation.push({ id: resTraiNghia.id });
      }
    }
  }

  // lienQuan
  if (data.lienQuan) {
    properties[this.NAME.LIEN_QUAN] = { relation: [] };
    for (var item of data.lienQuan) {
      var resLienQuan = await this.timKiemTuVung({name: item.name}, false)
      if (resLienQuan) {
        properties[this.NAME.LIEN_QUAN].relation.push({ id: resLienQuan.id });
      }
      else {
        // @ts-ignore
        resLienQuan = await this.themMoiTuVung({name: item.name});
        properties[this.NAME.LIEN_QUAN].relation.push({ id: resLienQuan.id });
      }
    }
  }
  // viDu

  return properties;
}
