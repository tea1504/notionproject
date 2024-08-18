//@ts-check
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
//#endregion

//#region Khởi tạo
$(document).ready(async () => {
  // @ts-ignore
  Loader(false);
  try {
    await KhoiTao();
    //await btnLuu_ClickAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
});
txtDanhSach_ref.on("change", txtDanhSach_Change);
$(document).on("click", "#lstDanhSach_TV_Detail", lstDanhSach_ClickAsync);
//#endregion

//#region Sự kiện
/**
 * Sự kiện khi textbox Danh Sách thay đổi
 * @param {*} args 
 */
// @ts-ignore
// @ts-ignore
// @ts-ignore
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
    // @ts-ignore
    txtTimKiem_ref.val(txtTu_value ?? "");
    // @ts-ignore
    await KhoiTao();
    await btnLuu_ClickAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
}
//#endregion
