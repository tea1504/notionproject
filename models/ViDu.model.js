//@ts-check
// @ts-ignore
require("dotenv").config()
// @ts-ignore
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model.js");

/**
 * 
 * @param {{
 * id?:string,
 * name?:string
 * }} data 
 * @param {boolean} isRelation 
 * @returns 
 */
exports.timKiemViDu = async (data, isRelation = true) => {
  const database_id = process.env.VI_DU;
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
        property: "Tiếng Nhật",
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
 * @param {typeof utils.tuLoai.page} result 
 * @param {boolean} isRelation 
 * @returns {Promise<typeof utils.tuLoai.data>}
 */
exports.LayDuLieu = async (result, isRelation = true) => {
  var relations = [...utils.relations];
  var properties = result.properties;

  return {
    id: result.id,
    name: properties["Tiếng Nhật"].title[0].plain_text,
  }
}
