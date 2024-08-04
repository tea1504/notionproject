require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model");

exports.NAME = {
}

exports.layNameID = async (page_id) => {
  const result = await notion.pages.retrieve({ page_id });
  var res = { ...utils.IDName };
  res.id = result.id;
  res.name = result.properties.Name.title[0].plain_text;
  return res;
}

exports.layDanhSachCapDo = async () => {
  var res = [...utils.IDNames];
  const database_id = process.env.CAP_DO;
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
  var item = { ...utils.capDo.page };
  for (item of result.results) {
    var temp = { ...utils.IDName }
    temp.id = item.id;
    temp.name = item.properties.Name.title[0].plain_text;
    res.push(temp)
  }

  return res;
}