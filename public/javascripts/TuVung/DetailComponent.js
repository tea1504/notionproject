//#region Dữ liệu mẫu
var duLieuPhanTuTrongDanhSach = { id: "", name: "" }
var duLieuDanhSach = [{ ...duLieuPhanTuTrongDanhSach }];
var duLieuNhanDuoc = {
  id: "", url: "", name: "", furigana: "",
  dongNghia: [], traiNghia: [], lienQuan: [],
  slug: "", nghia: "",
  tuLoai: [], chuDe: [], giaoTrinh: [],
  hanTu: [], troTu: [], viDu: []
}
//#endregion

//#region Biến
// txtTu
var txtTu_ref = $("#txtTu_TV_Detail");
// txtID
var txtID_ref = $("#txtID_TV_Detail");
// btnID
var btnID_ref = $("#btnID_TV_Detail");
// txtFurigana
var txtFurigana_ref = $("#txtFurigana_TV_Detail");
var txtFurigana_Mazii_ref = $("#txtFurigana_Mazii_TV_Detail");
// txtSlug
var txtSlug_ref = $("#txtSlug_TV_Detail");
var txtSlug_Mazii_ref = $("#txtSlug_Mazii_TV_Detail");
// txtNghia
var txtNghia_ref = $("#txtNghia_TV_Detail");
var txtNghia_Mazii_ref = $("#txtNghia_Mazii_TV_Detail");
// TuLoai
var lstTuLoai_ref = $("#lstTuLoai_TV_Detail");
var lstTuLoai_box_ref = $("#lstTuLoai_TV_Detail_box");
var slcTuLoai_ref = $("#slcTuLoai_TV_Detail");
var lstTuLoai_list = [...duLieuDanhSach];
lstTuLoai_list = [];
// GiaoTrinh
var lstGiaoTrinh_ref = $("#lstGiaoTrinh_TV_Detail");
var lstGiaoTrinh_box_ref = $("#lstGiaoTrinh_TV_Detail_box");
var slcGiaoTrinh_ref = $("#slcGiaoTrinh_TV_Detail");
var lstGiaoTrinh_list = [...duLieuDanhSach];
lstGiaoTrinh_list = [];
// HanTu
var lstHanTu_ref = $("#lstHanTu_TV_Detail");
var lstHanTu_box_ref = $("#lstHanTu_TV_Detail_box");
var txtHanTu_ref = $("#txtHanTu_TV_Detail");
var lstHanTu_list = [...duLieuDanhSach];
lstHanTu_list = [];
// DongNghia
var lstDongNghia_ref = $("#lstDongNghia_TV_Detail");
var lstDongNghia_box_ref = $("#lstDongNghia_TV_Detail_box");
var txtDongNghia_ref = $("#txtDongNghia_TV_Detail");
var lstDongNghia_list = [...duLieuDanhSach];
lstDongNghia_list = [];
// TraiNghia
var lstTraiNghia_ref = $("#lstTraiNghia_TV_Detail");
var lstTraiNghia_box_ref = $("#lstTraiNghia_TV_Detail_box");
var txtTraiNghia_ref = $("#txtTraiNghia_TV_Detail");
var lstTraiNghia_list = [...duLieuDanhSach];
lstTraiNghia_list = [];
// LienQuan
var lstLienQuan_ref = $("#lstLienQuan_TV_Detail");
var lstLienQuan_box_ref = $("#lstLienQuan_TV_Detail_box");
var txtLienQuan_ref = $("#txtLienQuan_TV_Detail");
var lstLienQuan_list = [...duLieuDanhSach];
lstLienQuan_list = [];
// ViDu
var lstViDu_ref = $("#lstViDu_TV_Detail");
var lstViDu_box_ref = $("#lstViDu_TV_Detail_box");
var txtViDu_ref = $("#txtViDu_TV_Detail");
var lstViDu_list = [...duLieuDanhSach];
lstViDu_list = [];
//#endregion

//#region Khởi tạo
/**
 * Lấy dữ liệu từ vựng
 * @returns {Promise<duLieuNhanDuoc>}
 */
async function LayDuLieuTuVungAsync() {
  var name = txtTu_ref.val();
  if (!name) {
    throw ("LayDuLieuTuVungAsync: Nhập từ vựng");
  }
  // @ts-ignore
  const result = await GET(`/tu-vung/tim-kiem?name=${name}`);
  if (result.status == "404") {
    return {...duLieuNhanDuoc}
  }
  // Nếu không tìm thấy thì thông báo lỗi và dừng lại
  if (result.status != "200") {
    throw ("Lỗi khi lấy dữ liệu");
  }
  return result.data;
}

/**
 * 
 * @returns 
 */
async function LayDuLieuTuVungMaziiAsync() {
  var name = txtTu_ref.val();
  var duLieuMazzi = { ...duLieuNhanDuoc }
  duLieuMazzi = {};

  if (!name) {
    throw ("LayDuLieuTuVungMaziiAsync: Nhập từ vựng");
  }
  const result = await POST("https://mazii.net/api/search", {
    dict: "javi",
    type: "word",
    query: name,
    page: 1,
    limit: 1
  })
  if (result.status != "200") {
    throw ("Lỗi khi lấy dữ liệu từ mazzi")
  }
  if (result.data && result.data.length > 0) {
    duLieuMazzi.furigana = "";
    if (result.data[0].phonetic) {
      duLieuMazzi.furigana = result.data[0].phonetic.replace(/ /g, ", ");
    }
    duLieuMazzi.slug = wanakana.toRomaji(duLieuMazzi.furigana);
    duLieuMazzi.nghia = "";
    if (result.data[0].short_mean) {
      duLieuMazzi.nghia = result.data[0].short_mean;
    }
    duLieuMazzi.tuLoai = [];
    if (result.data[0].means.length > 0) {
      for (var item of [...result.data[0].means]) {
        // todo
      }
    }
    duLieuMazzi.hanTu = [];
    const resultHanTu = await POST("https://mazii.net/api/search", {
      dict: "javi",
      type: "kanji",
      query: name,
      page: 1
    })
    if (resultHanTu.status == "200") {
      if (resultHanTu.results.length > 0) {
        duLieuMazzi.hanTu = resultHanTu.results.map(e => {
          return { name: e.kanji, id: "" };
        });
      }
    }
  }
  return duLieuMazzi;
}

/**
 * 
 */
async function KhoiTao() {
  const result = await LayDuLieuTuVungAsync();
  VeDuLieuLenManHinh(result);
  const resultMazii = await LayDuLieuTuVungMaziiAsync();
  VeDuLieuLenManHinh(resultMazii, "mazii");
}

txtHanTu_ref.on("focusout", () => Text_Focusout(txtHanTu_ref, lstHanTu_box_ref));
txtDongNghia_ref.on("focusout", () => Text_Focusout(txtDongNghia_ref, lstDongNghia_box_ref));
txtTraiNghia_ref.on("focusout", () => Text_Focusout(txtTraiNghia_ref, lstTraiNghia_box_ref));
txtLienQuan_ref.on("focusout", () => Text_Focusout(txtLienQuan_ref, lstLienQuan_box_ref));
txtViDu_ref.on("focusout", () => Text_Focusout(txtViDu_ref, lstViDu_box_ref));
txtFurigana_Mazii_ref.on("click", () => Mazii_Click(txtFurigana_ref, txtFurigana_Mazii_ref));
txtSlug_Mazii_ref.on("click", () => Mazii_Click(txtSlug_ref, txtSlug_Mazii_ref));
txtNghia_Mazii_ref.on("click", () => Mazii_Click(txtNghia_ref, txtNghia_Mazii_ref));
$(document).on("contextmenu", "#lstHanTu_TV_Detail_box .badge", (event) => lstHanTu_Oncontextmenu(event));
$(document).on("contextmenu", "#lstDongNghia_TV_Detail_box .badge", (event) => TuVung_Oncontextmenu(event));
$(document).on("contextmenu", "#lstTraiNghia_TV_Detail_box .badge", (event) => TuVung_Oncontextmenu(event));
$(document).on("contextmenu", "#lstLienQuan_TV_Detail_box .badge", (event) => TuVung_Oncontextmenu(event));
//#endregion

//#region Sự kiện
/**
 * 
 * @param {any} ref
 * @param {any} box_ref
 */
function Text_Focusout(ref, box_ref) {
  var val = ref.val();
  var list = [];
  if (val) {
    for (var name of val.split(",")) {
      if (name) {
        list.push({id:"", name})
      }
    }
  }
  VeThemDanhSach(box_ref, list, "badge");
  ref.val("");
}

/**
 * 
 * @param {any} notion
 * @param {any} mazii
 */
function Mazii_Click(notion, mazii) {
  notion.val(mazii.val());
}

/**
 * 
 * @param {MouseEvent} event
 */
function lstHanTu_Oncontextmenu(event) {
  event.preventDefault();
  var id = $(event.target).data("id");
  window.open(`/han-tu?id=${id}`, `popUpWindow${id}`, "resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
}

/**
 * 
 * @param {MouseEvent} event
 */
function TuVung_Oncontextmenu(event) {
  event.preventDefault();
  var name = $(event.target).text();
  window.open(`/tu-vung/chi-tiet?modal=1&name=${name}`, `popUpWindow${name}`, "resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
}
//#endregion

//#region Hàm xử lý
/**
 * 
 * @param {duLieuNhanDuoc} duLieu
 * @param {string} type
 */
function VeDuLieuLenManHinh(duLieu, type = "notion") {
  switch (type) {
    case "notion":
      if (duLieu.name) {
        txtTu_ref.val(duLieu.name);
      }
      txtID_ref.val(duLieu.id);
      btnID_ref.prop("href", duLieu.url);
      txtFurigana_ref.val(duLieu.furigana);
      txtSlug_ref.val(duLieu.slug);
      txtNghia_ref.val(duLieu.nghia);
      lstTuLoai_list = duLieu.tuLoai ?? [];
      VeDanhSach(lstTuLoai_box_ref, lstTuLoai_list, "badge");
      lstGiaoTrinh_list = duLieu.giaoTrinh ?? [];
      VeDanhSach(lstGiaoTrinh_box_ref, lstGiaoTrinh_list, "badge");
      lstHanTu_list = duLieu.hanTu ?? [];
      VeDanhSach(lstHanTu_box_ref, lstHanTu_list, "badge");
      lstDongNghia_list = duLieu.dongNghia ?? [];
      VeDanhSach(lstDongNghia_box_ref, lstDongNghia_list, "badge");
      lstTraiNghia_list = duLieu.traiNghia ?? [];
      VeDanhSach(lstTraiNghia_box_ref, lstTraiNghia_list, "badge");
      lstLienQuan_list = duLieu.lienQuan ?? [];
      VeDanhSach(lstLienQuan_box_ref, lstLienQuan_list, "badge");
      lstViDu_list = duLieu.viDu ?? [];
      VeDanhSach(lstViDu_box_ref, lstViDu_list, "badge");
      break;
    case "mazii":
      txtFurigana_Mazii_ref.val(duLieu.furigana);
      if (!txtFurigana_ref.val()) {
        txtFurigana_ref.val(duLieu.furigana);
      }
      txtSlug_Mazii_ref.val(duLieu.slug);
      if (!txtSlug_ref.val()) {
        txtSlug_ref.val(duLieu.slug);
      }
      txtNghia_Mazii_ref.val(duLieu.nghia);
      if (!txtNghia_ref.val()) {
        txtNghia_ref.val(duLieu.nghia);
      }
      VeThemDanhSach(lstHanTu_box_ref, duLieu.hanTu, "badge");
      break;
    default:
      break;
  }
}
//#endregion
