require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model");

exports.NAME = {
  TEN: "Tên"
}

exports.layNameID = async (page_id) => {
  const result = await notion.pages.retrieve({ page_id });
  var ten = { ...utils.notion.rich_text }
  var res = { ...utils.IDName };

  ten = result.properties[this.NAME.TEN];
  res.id = result.id;
  res.name = ten.rich_text[0].plain_text;
  return res;
}

exports.timDanhSachGiaoTrinh = async (name) => {
  const database_id = process.env.GIAO_TRINH;
  
  const result = await notion.databases.query({
    database_id,
    filter: {
      property: "Tên",
      rich_text: {
        equals: name
      }
    }
  })

  if (result.results.length > 0) {
    var res = []
    for (var item of result.results) {
      res.push(await this.LayDuLieu(item))
    }
    return res;
  }

  return null;
}

exports.timDanhSachGiaoTrinhTheoCha = async (parent_id) => {
  const database_id = process.env.GIAO_TRINH;
  var result;

  if (!parent_id) {
    result = await notion.databases.query({
      database_id,
      filter: {
        property: "Giáo trình cha",
        relation: {
          is_empty: true
        }
      }
    });
  }
  else {
    result = await notion.databases.query({
      database_id,
      filter: {
        property: "Giáo trình cha",
        relation: {
          contains: parent_id
        }
      }
    });
  }

  if (result.results.length > 0) {
    var res = []
    for (var item of result.results) {
      res.push(await this.LayDuLieu(item))
    }
    return res;
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
exports.timKiemGiaoTrinh = async (data, isRelation = true) => {
  const database_id = process.env.GIAO_TRINH;
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

exports.LayDuLieu = async (result = { ...utils.giaoTrinh.page }) => {
  var properties = { ...utils.giaoTrinh.page.properties }

  properties = result.properties;

  return {
    id: result.id,
    name: properties.Tên.rich_text.length > 0 ? properties.Tên.rich_text[0].plain_text : "",
  }
}