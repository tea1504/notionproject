//#region Dữ liệu mẫu
var duLieuPhanTuTrongDanhSach = { id: "", name: "" }
var duLieuDanhSach = [{ ...duLieuPhanTuTrongDanhSach }];
//#endregion

//#region Biến
// txtDanhSach
var txtDanhSach_ref = $("#txtDanhSach_TV_Detail");
// lstDanhSach
var lstDanhSach_ref = $("#lstDanhSach_TV_Detail");
var lstDanhSach_list = [...duLieuDanhSach];
lstDanhSach_list = [];
// txtTimKiem
var txtTimKiem_ref = $("#txtTimKiem_TV_Detail");
// btnTimKiem
var btnTimKiem_ref = $("#btnTimKiem_TV_Detail");
// btnLuu
var btnLuu_ref = $("#btnLuu_TV_Detail");
// btnFlowChart
var btnFlowChart_ref = $("#btnFlowChart_TV_Detail");
//#endregion

//#region Khởi tạo
$(document).ready(async () => {
  // @ts-ignore
  Loader(false);
  try {
    await KhoiTao();
    await btnLuu_ClickAsync();
  } catch (error) {
    console.log(error);
    popupError(error);
  }
});

txtDanhSach_ref.on("change", txtDanhSach_Change);
$(document).on("click", "#lstDanhSach_TV_Detail", lstDanhSach_ClickAsync);
$(document).on("contextmenu", "#lstDanhSach_TV_Detail", (event) => lstDanhSach_Contextmenu(event));
btnTimKiem_ref.on("click", btnTimKiem_ClickAsync);
btnLuu_ref.on("click", btnLuu_ClickAsync);
btnFlowChart_ref.on("click", btnFlowChart_Click)
//#endregion

//#region Sự kiện
/**
 * Sự kiện khi textbox Danh Sách thay đổi
 * @param {*} args 
 */
function txtDanhSach_Change(args) {
  try {
    var txtDanhSach_value = txtDanhSach_ref.val();
    lstDanhSach_list = [];

    var listDanhSach_value = txtDanhSach_value?.toString()
      .split(" ");
    for (var itemDanhSach_value of listDanhSach_value ?? []) {
      lstDanhSach_list.push({
        id: "",
        name: itemDanhSach_value
      })
    }

    // @ts-ignore
    VeDanhSach(lstDanhSach_ref, lstDanhSach_list, "li");
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  }
}

/**
 * Sự kiện khi click vào list [Danh Sách]
 * @param {*} args 
 */
async function lstDanhSach_ClickAsync(args) {
  try {
    // @ts-ignore
    Loader(false);
    lstDanhSach_ref.children().removeClass("active");
    $(args.target).addClass("active");
    $(args.target).addClass("check");
    var txtTu_value = $(args.target).data("name");
    document.title = `${txtTu_value} | Chi tiết từ vựng`;
    // @ts-ignore
    txtTimKiem_ref.val(txtTu_value ?? "");
    txtTu_ref.val(txtTimKiem_ref.val());
    // @ts-ignore
    await KhoiTao();
    await btnLuu_ClickAsync();
    Loader(true);
  } catch (error) {
    popupError(error);
  }
}

/**
 * 
 * @param {MouseEvent} event
 */
function lstDanhSach_Contextmenu(event) {
  event.preventDefault();
  var name = $(event.target).text();
  window.open(`/tu-vung/chi-tiet?modal=1&name=${name}`, `popUpWindow${name}`, "resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
}

/**
 * 
 */
async function btnLuu_ClickAsync() {
  try {
    Loader(false);
    var result = null;
    var duLieu = {};
    duLieu["id"] = txtID_ref.val();
    duLieu["furigana"] = txtFurigana_ref.val();
    duLieu["slug"] = txtSlug_ref.val();
    duLieu["nghia"] = txtNghia_ref.val();
    duLieu["tuLoai"] = LayDanhSach([...lstTuLoai_box_ref.children()]);
    duLieu["giaoTrinh"] = LayDanhSach([...lstGiaoTrinh_box_ref.children()]);
    duLieu["hanTu"] = LayDanhSach([...lstHanTu_box_ref.children()]);
    duLieu["dongNghia"] = LayDanhSach([...lstDongNghia_box_ref.children()]);
    duLieu["traiNghia"] = LayDanhSach([...lstTraiNghia_box_ref.children()]);
    duLieu["lienQuan"] = LayDanhSach([...lstLienQuan_box_ref.children()]);
    duLieu["viDu"] = LayDanhSach([...lstViDu_box_ref.children()]);
    if (duLieu.id) {
      result = await POST("/tu-vung/cap-nhat", duLieu);
    }
    else {
      if (!txtTimKiem_ref.val()) {
        throw ("Chưa nhập tên")
      }
      duLieu["name"] = txtTimKiem_ref.val();
      result = await POST("/tu-vung/them-moi", duLieu);
    }
    if (result) {
      if (result.status != "200") {
        throw ("Lỗi khi cập nhật");
      }
      VeDuLieuLenManHinh(result.data);
    }
    Loader(true);
  } catch (error) {
    popupError(error);
  }
}

/**
 * 
 */
async function btnTimKiem_ClickAsync() {
  try {
    // @ts-ignore
    Loader(false);
    await KhoiTao();
    Loader(true);
  } catch (error) {
    popupError(error);
  }
}

/**
 * 
 */
function btnFlowChart_Click() {
  var name = txtTimKiem_ref.val();
  window.open(`/tu-vung/flowchart?name=${name}`, `popUpWindow${name}`, "resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
}
//#endregion

//#region Hàm xử lý

//#endregion
