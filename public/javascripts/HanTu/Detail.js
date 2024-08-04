var danhSachCapDo = [{ id: "", name: "" }];
var danhSachGiaoTrinh = [{ id: "", name: "" }];
var danhSachChuDe = [{ id: "", name: "" }];
var danhSachLucThu = [
  { id: "hình thanh", name: "hình thanh" },
  { id: "hội ý", name: "hội ý" },
  { id: "tượng hình", name: "tượng hình" },
  { id: "chỉ sự", name: "chỉ sự" },
  { id: "chuyển chú", name: "chuyển chú" },
  { id: "giả tá", name: "giả tá" },
];
var duLieu = {
  id: "", url: "", name: "",
  capDo: [{ id: "", name: "" }], giaoTrinh: [{ id: "", name: "" }],
  hanViet: "", nghia: "", kun: [{ id: "", name: "", color: "" }],
  on: [{ id: "", name: "", color: "" }], amDatBiet: [{ id: "", name: "", color: "" }],
  laBoThu: [{ id: "", name: "" }], coBoThu: [{ id: "", name: "" }], soNet: "",
  chuDe: [{ id: "", name: "" }], lucThu: [{ id: "", name: "", color: "" }],
  viDu: [{ id: "", name: "" }]
}
var duLieuMazzi = {
  id: "", url: "", name: "",
  capDo: [{ id: "", name: "" }], giaoTrinh: [{ id: "", name: "" }],
  hanViet: "", nghia: "", kun: [{ id: "", name: "", color: "" }],
  on: [{ id: "", name: "", color: "" }], amDatBiet: [{ id: "", name: "", color: "" }],
  laBoThu: [{ id: "", name: "" }], coBoThu: [{ id: "", name: "" }], soNet: "",
  chuDe: [{ id: "", name: "" }], lucThu: [{ id: "", name: "", color: "" }],
  viDu: [{ id: "", name: "" }]
}

async function TimKiem() {
  VeDuLieu();
  VeDanhSach(danhSachCapDo, LayDanhSachCapDo(), "#slCapDo");
  VeDanhSach(danhSachLucThu, LayDanhSachLucThu(), "#slLucThu");
  await LayDuLieuTuMazzi();
  VeDuLieuMazzi();
}

$(document).ready(async () => {
  Loader(false);
  var id = $("#txtTimKiem").data("id");
  await LayDuLieuTuAPI(id, "");
  danhSachCapDo = await LayDanhSachCapDoTuAPI(id);
  await TimKiem();
  Loader(true);
});

$(document).on("click", "#btnTimKiem", async function (e) {
  Loader(false);
  var name = $("#txtTimKiem").val();
  await LayDuLieuTuAPI("", name);
  await TimKiem()
  Loader(true);
})

async function LayDuLieuTuAPI(id = "", name = "", isLoad = false) {
  if (isLoad) Loader(false);

  var result = { status: "", data: [] }
  if (id) {
    result = await GET(`/han-tu/${id}`);
  }
  else {
    result = await GET(`/han-tu/tim-kiem?name=${name}`);
  }
  if (result.status != "200") return false;
  duLieu = result.data;

  if (isLoad) Loader(true);
  return true;
}

function VeDuLieu() {
  console.log("VeDuLieu", duLieu);

  $(`a`).removeClass("d-none");
  $(`a`).attr("href", duLieu.url);
  $(`a`).text(duLieu.id);
  $("#txtName").val(duLieu.name);
  VeBadge(duLieu.capDo, "#boxCapDo");
  VeBadge(duLieu.giaoTrinh, "#boxGiaoTrinh");
  $("#txtHanViet").val(duLieu.hanViet);
  $("#txtNghia").val(duLieu.nghia);
  VeBadge(duLieu.kun, "#boxKUN");
  VeBadge(duLieu.on, "#boxON");
  VeBadge(duLieu.amDacBiet, "#boxKhac");
  VeBadge(duLieu.laBoThu, "#boxLaBoThu");
  VeBadge(duLieu.coBoThu, "#boxCoBoThu");
  $("#txtSoNet").val(duLieu.soNet);
  VeBadge(duLieu.chuDe, "#boxChuDe");
  VeBadge(duLieu.lucThu, "#boxLucThu");
  VeBadge(duLieu.viDu, "#boxViDu");
}

async function LayDanhSachCapDoTuAPI(isLoad = false) {
  if (isLoad) Loader(false);
  var res = [{ id: "", name: "" }];
  const result = await GET("/cap-do/danh-sach");

  res = [];
  for (var item of result.data) {
    res.push({
      id: item.id,
      name: item.name,
    })
  }

  if (isLoad) Loader(true);
  return res;
}

function LayDanhSachCapDo() {
  var danhSach = [{ id: "", name: "" }];
  danhSach = LayDanhSach([...$(`#boxCapDo`).children()]);
  return danhSach;
}

function VeDanhSach(danhSach = [{ id: "", name: "" }], danhSachLoaiTru = [{ id: "", name: "" }], id = "") {
  $(`${id} > option`).remove();
  $(`${id}`).append(`<option value="" data-id="" data-name="">Chọn</option>`);
  for (var item of danhSach) {
    if (danhSachLoaiTru.filter(i => i.id == item.id).length == 0) {
      $(`${id}`).append(`<option value="${item.id}/${item.name}" data-id="${item.id}" data-name="${item.name}">${item.name}</option>`);
    }
  }
}

function LayDanhSachLucThu() {
  var danhSach = [{ id: "", name: "" }];
  danhSach = LayDanhSach([...$(`#boxLucThu`).children()]);
  return danhSach;
}

function VeBadge(danhSach = [{ id: "", name: "" }], id = "", color = "success") {
  $(`${id} > span`).remove();

  for (var item of danhSach) {
    VeMotBadge(item, id, color);
  }
}

function VeMotBadge(item = { id: "", name: "" }, id = "", color = "success") {
  $(`${id}`).append(`<span class="px-3 py-2 mx-1 badge rounded-pill text-bg-${color}" ` +
    `value="${item.id}" data-id="${item.id}" ` +
    `data-name="${item.name}" data-type="${id}" data-other="">${item.name}</span>`);
}

async function LayDuLieuTuMazzi() {
  var res = {
    "freq": 714,
    "mean": "BỘI",
    "stroke_count": "10",
    "label": "ja_vi",
    "level": [
      "N2"
    ],
    "kanji": "倍",
    "detail": "",
    "mobileId": 2222,
    "example_on": {
      "バイ": [
        {
          "w": "二倍",
          "m": "Gấp đôi",
          "p": "にばい"
        }
      ]
    },
    "kun": "",
    "examples": [
      {
        "w": "倍",
        "m": "sự gấp đôi .",
        "h": "BỘI",
        "p": " ばい"
      }
    ],
    "writing": null,
    "on": "バイ",
    "compDetail": [
      {
        "w": "亻",
        "h": "NHÂN"
      }
    ]
  }
  var result = await POST("https://mazii.net/api/search", {
    dict: "javi",
    type: "kanji",
    query: $("#txtTimKiem").val(),
    page: 1
  });

  res = result.results[0];
  duLieuMazzi.name = res.kanji;
  duLieuMazzi.capDo = res.level.map(e => {
    return {
      id: "",
      name: e
    }
  })
  duLieuMazzi.hanViet = res.mean;
  duLieuMazzi.nghia = res.detail;
  duLieuMazzi.soNet = res.stroke_count;
  if (res.kun) {
    duLieuMazzi.kun = XuLyAm(res.kun);
  } else {
    duLieuMazzi.kun = []
  }
  if (res.on) {
    duLieuMazzi.on = XuLyAm(res.on)
  } else {
    duLieuMazzi.on = []
  }
  duLieuMazzi.coBoThu = res.compDetail.map(e => e.w)
}

function XuLyAm(chuoi = "") {
  return chuoi.split(" ")
    .map(e => {
      var res = "";
      res = e.split(".")[0];
      res = res.replace(/-/g, "");
      return res;
    })
    .map(e => {
      return {
        color: "",
        name: e,
        id: ""
      }
    });
}

function VeDuLieuMazzi() {
  for (var item of duLieuMazzi.capDo) {
    VeMotBadge(item, "#boxCapDo", "light");
  }

  $("#btnHanViet").removeClass("disabled");
  $("#btnHanViet").text(duLieuMazzi.hanViet);
  $("#btnHanViet").data("val", duLieuMazzi.hanViet);

  $("#btnNghia").removeClass("disabled");
  $("#btnNghia").text(duLieuMazzi.nghia);
  $("#btnNghia").data("val", duLieuMazzi.nghia);

  for (var item of duLieuMazzi.kun) {
    VeMotBadge(item, "#boxKUN", "light");
  }

  for (var item of duLieuMazzi.on) {
    VeMotBadge(item, "#boxON", "light");
  }

  for (var item of duLieuMazzi.coBoThu) {
    VeMotBadge(item, "#boxCoBoThu", "light");
  }

  $("#btnSoNet").removeClass("disabled");
  $("#btnSoNet").text(duLieuMazzi.soNet);
  $("#btnSoNet").data("val", duLieuMazzi.soNet);
}

$(document).on("click", "span.badge", async function (e) {
  Loader(false);
  switch ($(e.target).data("type")) {
    case "#boxCapDo":
      var index = duLieu.capDo.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.capDo.splice(index, 1);
      VeDanhSach(danhSachCapDo, duLieu.capDo, "#slCapDo");
      break;

    default:
      break;
  }
  $(e.target).remove();
  Loader(true);
})

$(`select`).on("change", function (e) {
  var type = $(e.target).data("type");
  var val = $(e.target).val();
  var item = {
    id: val.split("/")[0],
    name: val.split("/")[1]
  }

  switch (type) {
    case "#boxCapDo":
      duLieu.capDo.push(item);
      VeMotBadge(item, type, "secondary")
      VeDanhSach(danhSachCapDo, duLieu.capDo, "#slCapDo");
      break;
    default:
      break;
  }
})