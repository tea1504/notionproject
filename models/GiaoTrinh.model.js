require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

const utils = require("./Utils.model");

exports.NAME = {
  TEN:"Tên"
}

exports.layNameID = async (page_id) => {
  const result = await notion.pages.retrieve({ page_id });
  var ten = {...utils.notion.rich_text}
  var res = {...utils.IDName};

  ten = result.properties[this.NAME.TEN];
  res.id = result.id;
  res.name = ten.rich_text[0].plain_text;
  return res;
}