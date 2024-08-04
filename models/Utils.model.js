exports.IDName = { id: "", name: "" }
exports.IDNames = [this.IDName]
exports.relation = { id: "" }
exports.relations = [this.relation]

// notion
exports.notion = {
  user: {
    "object": "",
    "id": ""
  },
  file: {
    "type": "file",
    file: {
      "url": "",
      "expiry_time": ""
    }
  },
  database_id: {
    "type": "database_id",
    "database_id": ""
  },
  relation: {
    "id": "",
    "type": "relation",
    "relation": [
      this.relation
    ],
    "has_more": true
  },
  number: {
    "id": "",
    "type": "number",
    "number": 0
  },
  rich_text: {
    "id": "Acvd",
    "type": "rich_text",
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Đứng",
          "link": null
        },
        "annotations": {
          "bold": false,
          "italic": false,
          "strikethrough": false,
          "underline": false,
          "code": false,
          "color": "default"
        },
        "plain_text": "Đứng",
        "href": null
      }
    ]
  },
  multi_select: {
    "id": "GbGz",
    "type": "multi_select",
    "multi_select": [
      {
        "id": "62bab535-8a5d-4a3a-8f11-031958785398",
        "name": "リツ",
        "color": "blue"
      }
    ]
  },
  title: {
    "id": "title",
    "type": "title",
    "title": [
      {
        "type": "text",
        "text": {
          "content": "立",
          "link": null
        },
        "annotations": {
          "bold": true,
          "italic": false,
          "strikethrough": false,
          "underline": false,
          "code": false,
          "color": "default"
        },
        "plain_text": "立",
        "href": null
      }
    ]
  },
  last_edited_time: {
    "id": "_cWt",
    "type": "last_edited_time",
    "last_edited_time": "2024-03-02T08:51:00.000Z"
  },
  created_time: {
    "id": "QwKf",
    "type": "created_time",
    "created_time": "2024-02-05T13:55:00.000Z"
  }
}

// han tu
exports.hanTu = {
  page: {
    "object": "",
    "id": "",
    "created_time": "",
    "last_edited_time": "",
    "created_by": this.notion.user,
    "last_edited_by": this.notion.user,
    "cover": this.notion.file,
    "icon": this.notion.file,
    "parent": this.notion.database_id,
    "archived": true,
    "in_trash": true,
    "properties": {
      "Là bộ thủ": this.notion.relation,
      "Số nét": this.notion.number,
      "Chủ đề": this.notion.relation,
      "Nghĩa": this.notion.rich_text,
      "Lục thư": this.notion.multi_select,
      "音": this.notion.multi_select,
      "Ví dụ": this.notion.relation,
      "特別": this.notion.multi_select,
      "Hán Việt": this.notion.rich_text,
      "Cấp độ": this.notion.relation,
      "Created": this.notion.created_time,
      "Phân loại 3": this.notion.multi_select,
      "Giáo trình": this.notion.relation,
      "Last edited time": this.notion.last_edited_time,
      "Phân loại 1": this.notion.multi_select,
      "Cách nhớ": this.notion.rich_text,
      "訓": this.notion.multi_select,
      "Có bộ thủ": this.notion.relation,
      "Phân loại 2": this.notion.multi_select,
      "Name": this.notion.title
    },
    "url": "",
    "public_url": "",
    "request_id": ""
  }
}

// giao trinh
exports.giaoTrinh = {
  page: {
    "object": "",
    "id": "",
    "created_time": "",
    "last_edited_time": "",
    "created_by": this.notion.user,
    "last_edited_by": this.notion.user,
    "cover": this.notion.file,
    "icon": this.notion.file,
    "parent": this.notion.database_id,
    "archived": true,
    "in_trash": true,
    "properties": {
    },
    "url": "",
    "public_url": "",
    "request_id": ""
  }
}

// cap do
exports.capDo = {
  page: {
    "object": "page",
    "id": "ed37e0f7-7aef-4b43-9fb8-b96f1ace7dd3",
    "created_time": "2024-07-20T02:13:00.000Z",
    "last_edited_time": "2024-07-20T02:13:00.000Z",
    "created_by": {
      "object": "user",
      "id": "0057a200-ab9b-4b95-8b04-04aec4982cb0"
    },
    "last_edited_by": {
      "object": "user",
      "id": "0057a200-ab9b-4b95-8b04-04aec4982cb0"
    },
    "cover": null,
    "icon": {
      "type": "emoji",
      "emoji": "3️⃣"
    },
    "parent": {
      "type": "database_id",
      "database_id": "525e04c4-26d1-4ab5-9047-f0a6de17d2ae"
    },
    "archived": false,
    "in_trash": false,
    "properties": {
      "Tags": {
        "id": "uAoR",
        "type": "multi_select",
        "multi_select": []
      },
      "Created": {
        "id": "ulNX",
        "type": "created_time",
        "created_time": "2024-07-20T02:13:00.000Z"
      },
      "Name": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "N3",
              "link": null
            },
            "annotations": {
              "bold": false,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "N3",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/N3-ed37e0f77aef4b439fb8b96f1ace7dd3",
    "public_url": null
  }
}