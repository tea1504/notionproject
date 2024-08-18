//#region Dữ liệu mẫu
var duLieuPhanTuTrongDanhSach = { id: "", name: "" }
var duLieuDanhSach = [{ ...duLieuPhanTuTrongDanhSach }];
var duLieuNhanDuoc = {
  id: "", url: "", ame: "", furigana: "",
  dongNghia: [], traiNghia: [], lienQuan: [],
  slug: "", nghia: "",
  tuLoai: [], chuDe: [], giaoTrinh: [],
  hanTu: [], troTu: [], viDu: []
}
//#endregion

//#region Biến
// txtTimKiem
var txtTimKiem_ref = $("#txtTimKiem_TV_Detail");
// btnTimKiem
var btnTimKiem_ref = $("#btnTimKiem_TV_Detail");
// btnLuu
var btnLuu_ref = $("#btnLuu_TV_Detail");
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
 * @returns {Promise<typeof duLieuNhanDuoc>}
 */
async function LayDuLieuTuVungAsync() {
  var name = txtTimKiem_ref.val();
  if (!name) {
    throw ("Nhập từ vựng");
  }
  // @ts-ignore
  const result = await GET(`/tu-vung/tim-kiem?name=${name}`);
  // Nếu không tìm thấy thì thông báo lỗi và dừng lại
  if (result.status === "404") {
    throw ("Không tìm thấy từ vựng");
  }
  console.log(result);

  return result.data;
}

/**
 * 
 */
async function KhoiTao() {
  const result = await LayDuLieuTuVungAsync();
  VeDuLieuLenManHinh(result);
}

btnTimKiem_ref.on("click", btnTimKiem_ClickAsync);
txtHanTu_ref.on("focusout", txtHanTu_Focusout);
txtDongNghia_ref.on("focusout", txtDongNghia_Focusout);
txtTraiNghia_ref.on("focusout", txtTraiNghia_Focusout);
txtLienQuan_ref.on("focusout", txtLienQuan_Focusout);
txtViDu_ref.on("focusout", txtViDu_Focusout);
//#endregion

//#region Sự kiện
/**
 * 
 */
async function btnTimKiem_ClickAsync() {
  try {
    // @ts-ignore
    Loader(false);
    await KhoiTao();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
}

/**
 * 
 */
function lstHanTuBox_Change(event) {
  $(event.target).remove();
}

/**
 * 
 */
function txtHanTu_Focusout() {
  var val = txtHanTu_ref.val();
  if (val) {
    for (var v of val.split(",")) {
      if (v) {
        lstHanTu_box_ref.append(VeBadgeElement("", v, "text-bg-secondary"));
      }
    }
  }
  txtHanTu_ref.val("");
}

/**
 * 
 */
function txtDongNghia_Focusout() {
  var val = txtDongNghia_ref.val();
  if (val) {
    for (var v of val.split(",")) {
      if (v) {
        lstDongNghia_box_ref.append(VeBadgeElement("", v, "text-bg-secondary"));
      }
    }
  }
  txtDongNghia_ref.val("");
}

/**
 * 
 */
function txtTraiNghia_Focusout() {
  var val = txtTraiNghia_ref.val();
  if (val) {
    for (var v of val.split(",")) {
      if (v) {
        lstTraiNghia_box_ref.append(VeBadgeElement("", v, "text-bg-secondary"));
      }
    }
  }
  txtTraiNghia_ref.val("");
}

/**
 * 
 */
function txtLienQuan_Focusout() {
  var val = txtLienQuan_ref.val();
  if (val) {
    for (var v of val.split(",")) {
      if (v) {
        lstLienQuan_box_ref.append(VeBadgeElement("", v, "text-bg-secondary"));
      }
    }
  }
  txtLienQuan_ref.val("");
}

/**
 * 
 */
function txtViDu_Focusout() {
  var val = txtViDu_ref.val();
  if (val) {
    for (var v of val.split(",")) {
      if (v) {
        lstViDu_box_ref.append(VeBadgeElement("", v, "text-bg-secondary"));
      }
    }
  }
  txtViDu_ref.val("");
}
//#endregion

//#region Hàm xử lý
/**
 * 
 * @param {typeof duLieuNhanDuoc} duLieu 
 */
function VeDuLieuLenManHinh(duLieu) {
  txtTu_ref.val(duLieu.name);
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
}
//#endregion
