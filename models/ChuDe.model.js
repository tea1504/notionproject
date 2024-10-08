require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model.js");

exports.NAME = {
}

exports.layNameID = async (page_id) => {
  var result = { ...utils.chuDe.page }
  result = await notion.pages.retrieve({ page_id });
  
  var res = { ...utils.IDName };
  res.id = result.id;
  res.name = result.properties.Name.title[0].plain_text;
  return res;
}

exports.layDanhSachChuDe = async () => {
  var res = [...utils.IDNames];
  const database_id = process.env.CHU_DE;
  const result = await notion.databases.query({
    database_id,
    sorts: [
      {
        property: "Name",
        direction: "ascending"
      }
    ]
  })

  res = [];
  var item = { ...utils.chuDe.page };
  for (item of result.results) {
    var temp = { ...utils.IDName }
    temp.id = item.id;
    temp.name = item.properties.Name.title[0].plain_text;
    res.push(temp)
  }

  return res;
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
exports.timKiemChuDe = async (data, isRelation = true) => {
  const database_id = process.env.CHU_DE;
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
 * @returns {Promise<typeof utils.chuDe.data>}
 */
exports.LayDuLieu = async (result, isRelation = true) => {
  var relations = [...utils.relations];
  var properties = result.properties;

  return {
    id: result.id,
    name: properties.Name.title[0].plain_text,
  }
}
