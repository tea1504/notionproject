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
