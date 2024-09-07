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
var danhSachGiaoTrinh = [
  [{ id: "", name: "" }],
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
  VeDanhSach(danhSachCapDo, LayDanhSachTuLocal("#boxCapDo"), "#slCapDo");
  VeDanhSach(danhSachLucThu, LayDanhSachTuLocal("#boxLucThu"), "#slLucThu");
  VeDanhSach(danhSachChuDe, LayDanhSachTuLocal("#boxChuDe"), "#slChuDe");
  VeDanhSach(danhSachGiaoTrinh[0], [], "#slChuDe0");
  await LayDuLieuTuMazzi();
  VeDuLieuMazzi();
}

$(document).ready(async () => {
  Loader(false);
  ResetData();
  var id = $("#txtTimKiem").data("id");
  await LayDuLieuTuAPI(id, "");
  danhSachCapDo = await LayDanhSachCapDoTuAPI();
  danhSachChuDe = await LayDanhSachChuDeTuAPI()
  danhSachGiaoTrinh = [];
  danhSachGiaoTrinh.push(await LayDanhSachGiaoTrinhTuAPI());
  await TimKiem();

  duLieu.hanViet = $("#txtHanViet").val();
  duLieu.nghia = $("#txtNghia").val();
  duLieu.soNet = $("#txtSoNet").val();
  var val = $(`#boxSLGiaoTrinh > [data-check="1"]`).val();
  if (val) {
    duLieu.giaoTrinh.push({
      id: val.split("/")[0],
      name: val.split("/")[1],
    })
  }
  console.log(duLieu);
  if (duLieu.id) {
    result = await POST(`han-tu/cap-nhat`, duLieu);
  }
  else {
    result = await POST(`han-tu/them-moi`, duLieu);
  }
  ResetData();
  duLieu = result.data;
  await TimKiem()
  Loader(true);
});

$(document).on("click", "#btnTimKiem", async function (e) {
  Loader(false);
  ResetData();
  var name = $("#txtTimKiem").val();
  await LayDuLieuTuAPI("", name);
  await TimKiem()
  Loader(true);
})

$(document).on("click", "#btnLuu", async function (e) {
  var result;
  Loader(false);
  duLieu.hanViet = $("#txtHanViet").val();
  duLieu.nghia = $("#txtNghia").val();
  duLieu.soNet = $("#txtSoNet").val();
  var val = $(`#boxSLGiaoTrinh > [data-check="1"]`).val();
  if (val) {
    duLieu.giaoTrinh.push({
      id: val.split("/")[0],
      name: val.split("/")[1],
    })
  }
  console.log(duLieu);
  if (duLieu.id) {
    result = await POST(`han-tu/cap-nhat`, duLieu);
  }
  else {
    result = await POST(`han-tu/them-moi`, duLieu);
  }
  ResetData();
  duLieu = result.data;
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
  if (result.status != "200") {
    duLieu = {
      id: "", url: "", name: name,
      capDo: [], giaoTrinh: [],
      hanViet: "", nghia: "", kun: [],
      on: [], amDatBiet: [],
      laBoThu: [], coBoThu: [], soNet: "",
      chuDe: [], lucThu: [],
      viDu: []
    }
  }
  else {
    duLieu = result.data;
  }

  if (isLoad) Loader(true);
  return true;
}

function VeDuLieu() {
  $(`a#link`).removeClass("d-none");
  $(`a#link`).attr("href", duLieu.url);
  $(`a#link`).text(duLieu.id);
  $("#txtName").val(duLieu.name);
  window.document.title = `${duLieu.name} | Hán tự`;
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

async function LayDanhSachChuDeTuAPI(isLoad = false) {
  if (isLoad) Loader(false);
  var res = [{ id: "", name: "" }];
  const result = await GET("/chu-de/danh-sach");

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

async function LayDanhSachGiaoTrinhTuAPI(parent_id = "", isLoad = false) {
  if (isLoad) Loader(false);
  var res = [{ id: "", name: "" }];
  const result = await POST(`/giao-trinh/tim-kiem?parent_id=${parent_id}`);

  res = [];
  if (result.data) {
    for (var item of result.data) {
      res.push({
        id: item.id,
        name: item.name,
      })
    }
  }

  if (isLoad) Loader(true);
  return res;
}

function LayDanhSachTuLocal(id = "") {
  var danhSach = [{ id: "", name: "" }];
  danhSach = LayDanhSach([...$(`${id}`).children()]);
  return danhSach;
}

function VeDanhSach(danhSach = [{ id: "", name: "" }], danhSachLoaiTru = [{ id: "", name: "" }], id = "") {
  $(`${id} > option`).remove();
  $(`${id}`).append(`<option value="" data-id="" data-name="">Chọn</option>`);
  for (var item of danhSach) {
    if (danhSachLoaiTru.filter(i => i.name == item.name).length == 0) {
      $(`${id}`).append(`<option value="${item.id}/${item.name}" data-id="${item.id}" data-name="${item.name}">${item.name}</option>`);
    }
  }
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

  if (result.results.length) {
    res = result.results[0];
    duLieuMazzi.name = res.kanji;
    duLieuMazzi.capDo = []
    if (res.level) {
      duLieuMazzi.capDo = res.level.map(e => {
        var find = danhSachCapDo.map(e => e.name).indexOf(e);
        if (find != -1)
          return { ...danhSachCapDo[find] }
        return {
          id: e,
          name: e
        }
      })
    }
    duLieu.capDo.push(...duLieuMazzi.capDo);
    duLieuMazzi.hanViet = res.mean;
    duLieuMazzi.nghia = res.detail;
    duLieuMazzi.soNet = res.stroke_count;
    if (res.kun) {
      duLieuMazzi.kun = XuLyAm(res.kun);
    } else {
      duLieuMazzi.kun = []
    }
    duLieu.kun.push(...duLieuMazzi.kun);
    if (res.on) {
      duLieuMazzi.on = XuLyAm(res.on)
    } else {
      duLieuMazzi.on = []
    }
    duLieu.on.push(...duLieuMazzi.on);
    if (res.compDetail) {
      duLieuMazzi.coBoThu = res.compDetail.map(e => {
        return { id: e.w, name: e.w };
      });
      duLieu.coBoThu.push(...duLieuMazzi.coBoThu);
    }
  }
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
        color: "red",
        name: e,
        id: e
      }
    });
}

function VeDuLieuMazzi() {
  if (Object.keys(duLieuMazzi).length === 0) return;
  for (var item of duLieuMazzi.capDo) {
    VeMotBadge(item, "#boxCapDo", "light");
    VeDanhSach(danhSachCapDo, duLieu.capDo, "#slCapDo");
  }

  $("#btnHanViet").removeClass("disabled");
  $("#btnHanViet").text(duLieuMazzi.hanViet);
  $("#btnHanViet").data("val", duLieuMazzi.hanViet);
  if (!$("#txtHanViet").val()) {
    $("#txtHanViet").val(duLieuMazzi.hanViet);
  }

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
  if (!$("#txtSoNet").val()) {
    $("#txtSoNet").val(duLieuMazzi.soNet);
  }
}

$(document).on("click", "span.badge", async function (e) {
  Loader(false);
  switch ($(e.target).data("type")) {
    case "#boxCapDo":
      var index = duLieu.capDo.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.capDo.splice(index, 1);
      VeDanhSach(danhSachCapDo, duLieu.capDo, "#slCapDo");
      break;

    case "#boxChuDe":
      var index = duLieu.chuDe.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.chuDe.splice(index, 1);
      VeDanhSach(danhSachChuDe, duLieu.chuDe, "#slChuDe");
      break;

    case "#boxLucThu":
      var index = duLieu.lucThu.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.lucThu.splice(index, 1);
      VeDanhSach(danhSachLucThu, duLieu.lucThu, "#slLucThu");
      break;

    case "#boxKUN":
      var index = duLieu.kun.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.kun.splice(index, 1);
      break;

    case "#boxON":
      var index = duLieu.on.map(e => e.id).indexOf($(e.target).data("id"));
      duLieu.on.splice(index, 1);
      break;

    default:
      break;
  }
  $(e.target).remove();
  Loader(true);
})

$(document).on("change", "select", async function (e) {
  Loader(false);
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

    case "#boxChuDe":
      duLieu.chuDe.push(item);
      VeMotBadge(item, type, "secondary")
      VeDanhSach(danhSachChuDe, duLieu.chuDe, "#slChuDe");
      break;

    case "#boxLucThu":
      duLieu.lucThu.push(item);
      VeMotBadge(item, type, "secondary")
      VeDanhSach(danhSachLucThu, duLieu.lucThu, "#slLucThu");
      break;

    case "#boxGiaoTrinh":
      var index = $(e.target).data("i");
      $("#slChuDe" + index).attr("data-check", "1");
      danhSachGiaoTrinh.splice(index, danhSachGiaoTrinh.length - index - 1);
      var l = [...$("#boxSLGiaoTrinh").children()].length
      for (var i = 0; i < l; i++) {
        if (i > index) {
          $("#slChuDe" + i).remove();
        }
      }

      length = danhSachGiaoTrinh.length;
      if (val) {
        if (parseInt(index) == length - 1) {
          var list = await LayDanhSachGiaoTrinhTuAPI(item.id);
          if (list.length > 0) {
            $("#boxSLGiaoTrinh").append(
              `<select id="slChuDe${length}" class="col form-control form-control-sm mx-2" ` +
              `name="slChuDe${length}" data-type="#boxGiaoTrinh" data-i="${length}" data-check="1"></select>`
            )
            $("#slChuDe" + index).attr("data-check", "0");
            danhSachGiaoTrinh.push(await LayDanhSachGiaoTrinhTuAPI(item.id));
            VeDanhSach(danhSachGiaoTrinh[danhSachGiaoTrinh.length - 1], [], "#slChuDe" + (index + 1));
          }
        }
      }
      break;

    default:
      break;
  }
  Loader(true);
})

$(document).on("click", ".mazzi", async function (e) {
  Loader(false);
  var id = $(e.target).data("type");
  $("#" + id).val($(e.target).text());
  Loader(true);
})

function ResetData() {
  duLieu = {
    id: "", url: "", name: name,
    capDo: [], giaoTrinh: [],
    hanViet: "", nghia: "", kun: [],
    on: [], amDatBiet: [],
    laBoThu: [], coBoThu: [], soNet: "",
    chuDe: [], lucThu: [],
    viDu: []
  };
  duLieuMazzi = {
    id: "", url: "", name: name,
    capDo: [], giaoTrinh: [],
    hanViet: "", nghia: "", kun: [],
    on: [], amDatBiet: [],
    laBoThu: [], coBoThu: [], soNet: "",
    chuDe: [], lucThu: [],
    viDu: []
  };
  $("#txtName").val("");
  $("a#link").text("");
  $("a#link").prop("href", "#");
  $("#boxCapDo > span").remove();
  $("#boxGiaoTrinh > span").remove();
  $("#boxGiaoTrinh > span").remove();
  $("#txtHanViet").val("");
  $("#txtNghia").val("");
  $("#boxKUN > span").remove();
  $("#boxON > span").remove();
  $("#boxKhac > span").remove();
  $("#boxLaBoThu > span").remove();
  $("#boxCoBoThu > span").remove();
  $("#txtSoNet").val("");
  $("#boxLucThu > span").remove();
}

$(document).on("contextmenu", "#boxCoBoThu .badge", (event) => lstHanTu_Oncontextmenu(event));
$(document).on("contextmenu", "#boxLaBoThu .badge", (event) => lstHanTu_Oncontextmenu(event));

function lstHanTu_Oncontextmenu(event) {
  event.preventDefault();
  var id = $(event.target).data("id");
  var mhHanTu = popupwindow(`/han-tu?id=${id}`, `HanTu${id}`, 800, 400);
}