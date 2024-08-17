//@ts-check
require("dotenv").config()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

/**
 * 
 * @param {{id:""}} data 
 * @returns 
 */
exports.timKiemBlock = async (data) => {
  const blockId = data.id
  const result = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50
  });

  if (result.results.length == 0) {
    return null;
  }

  return this.LayDuLieu(result.results);
}

exports.LayDuLieu = async (results = []) => {
  var res = results.filter(e => e.type == "code");
  if (res.length == 0) {
    return null;
  }
  return {
    id: res[0].id,
    content: res[0].code.rich_text[0].plain_text
  };
}

/**
 * Thêm một block moi vao id
 * @param {{id: string, content: string}} data 
 * @returns 
 */
exports.themBlock = async (data) => {
  const blockId = data.id
  const result = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        code: {
          language: "mermaid",
          rich_text: [
            {
              text: {
                content: data.content
              }
            }
          ]
        }
      }
    ]
  });

  return result;
}

exports.capNhatBlock = async (data) => {
  const blockId = data.id
  const result = await notion.blocks.update({
    block_id: blockId,
    code: {
      language: "mermaid",
      rich_text: [
        {
          text: {
            content: data.content
          }
        }
      ]
    }
  });

  return result;
}
