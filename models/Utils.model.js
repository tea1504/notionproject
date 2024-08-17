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
  },
  data: {
    id: "", url: "", name: "",
    capDo: [{ id: "", name: "" }], giaoTrinh: [{ id: "", name: "" }],
    hanViet: "", nghia: "", kun: [{ id: "", name: "", color: "" }],
    on: [{ id: "", name: "", color: "" }], amDatBiet: [{ id: "", name: "", color: "" }],
    laBoThu: [{ id: "", name: "" }], coBoThu: [{ id: "", name: "" }], soNet: "",
    chuDe: [{ id: "", name: "" }], lucThu: [{ id: "", name: "", color: "" }],
    viDu: [{ id: "", name: "" }]
  }
}

// giao trinh
exports.giaoTrinh = {
  page: {
    "object": "page",
    "id": "406f3a15-aef6-434c-b417-834cf0812c11",
    "created_time": "2024-07-20T02:13:00.000Z",
    "last_edited_time": "2024-07-21T15:59:00.000Z",
    "created_by": {
      "object": "user",
      "id": "0057a200-ab9b-4b95-8b04-04aec4982cb0"
    },
    "last_edited_by": {
      "object": "user",
      "id": "0057a200-ab9b-4b95-8b04-04aec4982cb0"
    },
    "cover": {
      "type": "file",
      "file": {
        "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/19992552-1e42-43cd-8737-70076046bcaa/6762e8a5-1b68-49d9-84a1-ebb84c27d85c/81cJiUYnf9L._AC_UF10001000_QL80_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240804%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240804T045148Z&X-Amz-Expires=3600&X-Amz-Signature=61c9260bb6986b0b7a5a8abd94f4cd4b9c2b78ec5b2464d94792828096ed3547&X-Amz-SignedHeaders=host&x-id=GetObject",
        "expiry_time": "2024-08-04T05:51:48.056Z"
      }
    },
    "icon": {
      "type": "emoji",
      "emoji": "📓"
    },
    "parent": {
      "type": "database_id",
      "database_id": "c2bdf572-d0ed-4385-aaf3-9417ba5bb52b"
    },
    "archived": false,
    "in_trash": false,
    "properties": {
      "Created": {
        "id": "%3EbmO",
        "type": "created_time",
        "created_time": "2024-07-20T02:13:00.000Z"
      },
      "Giáo trình con": {
        "id": "BUbb",
        "type": "relation",
        "relation": [
          {
            "id": "97456f3d-0ff6-46fc-a3e1-d62e34fa9b0b"
          }
        ],
        "has_more": false
      },
      "Tên": {
        "id": "Jd%3ET",
        "type": "rich_text",
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "漢字マスター",
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
            "plain_text": "漢字マスター",
            "href": null
          }
        ]
      },
      "Giáo trình cha": {
        "id": "T%7C%3FC",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "Last edited time": {
        "id": "%5BMj%60",
        "type": "last_edited_time",
        "last_edited_time": "2024-07-21T15:59:00.000Z"
      },
      "Slug": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "KanjiMasuta",
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
            "plain_text": "KanjiMasuta",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/KanjiMasuta-406f3a15aef6434cb417834cf0812c11",
    "public_url": null
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

// chu de
exports.chuDe = {
  page: {
    "object": "page",
    "id": "392daf23-4529-4817-a738-6520ab8ade22",
    "created_time": "2024-02-18T13:11:00.000Z",
    "last_edited_time": "2024-03-02T13:31:00.000Z",
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
      "emoji": "💼"
    },
    "parent": {
      "type": "database_id",
      "database_id": "cf9530d7-38bd-4238-a657-add9ab9c0b0c"
    },
    "archived": false,
    "in_trash": false,
    "properties": {
      "Created": {
        "id": "O_%7CC",
        "type": "created_time",
        "created_time": "2024-02-18T13:11:00.000Z"
      },
      "Cách đọc": {
        "id": "adVL",
        "type": "rich_text",
        "rich_text": []
      },
      "🧨 Giáo trình": {
        "id": "wU%3Em",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "Tags": {
        "id": "yKVm",
        "type": "multi_select",
        "multi_select": []
      },
      "index": {
        "id": "%7CYOz",
        "type": "number",
        "number": null
      },
      "Nghĩa": {
        "id": "%7CaNM",
        "type": "rich_text",
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "Công việc",
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
            "plain_text": "Công việc",
            "href": null
          }
        ]
      },
      "Name": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "仕事",
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
            "plain_text": "仕事",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/392daf2345294817a7386520ab8ade22",
    "public_url": null
  }
}

// tu vung
exports.tuVung = {
  page: {
    "object": "page",
    "id": "7fec9aed-6203-4194-8d06-caab03e735cc",
    "created_time": "2024-07-20T13:45:00.000Z",
    "last_edited_time": "2024-08-08T14:00:00.000Z",
    "created_by": {
      "object": "user",
      "id": "0057a200-ab9b-4b95-8b04-04aec4982cb0"
    },
    "last_edited_by": {
      "object": "user",
      "id": "597a43d1-4032-4464-aea3-90eaf30d8949"
    },
    "cover": null,
    "icon": null,
    "parent": {
      "type": "database_id",
      "database_id": "7d7e35de-8a8f-48c4-90e8-5208d7528d75"
    },
    "archived": false,
    "in_trash": false,
    "properties": {
      "Phân loai 1": {
        "id": "%3A%60DU",
        "type": "multi_select",
        "multi_select": []
      },
      "Ví dụ": {
        "id": "C%60RP",
        "type": "relation",
        "relation": [
          {
            "id": "caafa9e6-55e4-4528-9a3f-677ab5c2fd67"
          },
          {
            "id": "316e16c4-083b-4f2e-9908-89f3a3531257"
          },
          {
            "id": "8f4d849e-7763-45df-9b4f-8858c9242343"
          }
        ],
        "has_more": false
      },
      "Giáo trình": {
        "id": "E%40sK",
        "type": "relation",
        "relation": [
          {
            "id": "9e3d6aff-668d-4c31-8b79-b4aa04d010bd"
          }
        ],
        "has_more": false
      },
      "Nghĩa": {
        "id": "GfW%5E",
        "type": "rich_text",
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "Tuổi tác",
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
            "plain_text": "Tuổi tác",
            "href": null
          }
        ]
      },
      "Chủ đề": {
        "id": "L%7DZy",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "Last edited time": {
        "id": "Nub%5B",
        "type": "last_edited_time",
        "last_edited_time": "2024-08-08T14:00:00.000Z"
      },
      "Liên quan": {
        "id": "ODx%40",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "Phân loại 3": {
        "id": "O_pL",
        "type": "multi_select",
        "multi_select": []
      },
      "Date": {
        "id": "RKs%7D",
        "type": "date",
        "date": null
      },
      "Đồng nghĩa": {
        "id": "TMxV",
        "type": "relation",
        "relation": [
          {
            "id": "6efc974e-5612-4a5e-938c-528629c65fcd"
          }
        ],
        "has_more": false
      },
      "Trợ từ": {
        "id": "TRm%3D",
        "type": "multi_select",
        "multi_select": []
      },
      "Từ loại": {
        "id": "Uuim",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "Trái nghĩa": {
        "id": "Y%3C%7Dn",
        "type": "relation",
        "relation": [],
        "has_more": false
      },
      "index": {
        "id": "YzRu",
        "type": "number",
        "number": null
      },
      "slug": {
        "id": "aShG",
        "type": "rich_text",
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "nenrei",
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
            "plain_text": "nenrei",
            "href": null
          }
        ]
      },
      "Hán tự": {
        "id": "f%7Cz%7C",
        "type": "relation",
        "relation": [
          {
            "id": "31f46034-ef2f-462c-9d4c-27cd5986555f"
          },
          {
            "id": "74c1838b-5d8d-4fbe-9d2a-6e2ecf10e854"
          }
        ],
        "has_more": false
      },
      "Created time": {
        "id": "hhaN",
        "type": "created_time",
        "created_time": "2024-07-20T13:45:00.000Z"
      },
      "ふりがな": {
        "id": "wKwd",
        "type": "rich_text",
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "ねんれい",
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
            "plain_text": "ねんれい",
            "href": null
          }
        ]
      },
      "Phân loại 2": {
        "id": "zWuh",
        "type": "multi_select",
        "multi_select": []
      },
      "Name": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "年齢",
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
            "plain_text": "年齢",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/7fec9aed620341948d06caab03e735cc",
    "public_url": null
  },
  data: {
    id: "",
    url: "",
    name: "",
    furigana: "",
  }
}

// tu loai
exports.tuLoai = {
  page: {},
  data: {
    id: "",
    name: "",
  }
}


// chu de
exports.chuDe = {
  page: {},
  data: {
    id: "",
    name: "",
  }
}
