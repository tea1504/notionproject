//@ts-check
//#region Dữ liệu mẫu
var duLieuPhanTuTrongDanhSach = { id: "", name: "" }
var duLieuDanhSach = [{...duLieuPhanTuTrongDanhSach}];
//#endregion

//#region Biến
// txtDanhSach
var txtDanhSach_ref = $("#txtDanhSach_FlowChart");
// lstDanhSach
var lstDanhSach_ref = $("#lstDanhSach_FlowChart");
var lstDanhSach_list = [...duLieuDanhSach];
lstDanhSach_list = [];
//#endregion

//#region Khởi tạo
$(document).ready(async () => {
  // @ts-ignore
  Loader(false);
  try {
    // @ts-ignore
    KhoiTaoDuLieu();
    // @ts-ignore
    var result1 = await LayDuLieuTuVungAsync();
    // @ts-ignore
    VeDuLieuLenManHinh(result1);
    // @ts-ignore
    var result2 = await LayDuLieuBlockAsync(result1.id);
    if(result2.id) {
      // @ts-ignore
      result_ref.text(result2.content);
      // @ts-ignore
      result_ref.attr("data-id", result2.id);
    }
    // @ts-ignore
    TaoChart();
    // @ts-ignore
    await btnLuu_ClickAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
});
txtDanhSach_ref.on("change", txtDanhSach_Change);
$(document).on("click", "#lstDanhSach_FlowChart", lstDanhSach_ClickAsync);
//#endregion

//#region Sự kiện
/**
 * Sự kiện khi textbox Danh Sách thay đổi
 * @param {*} args 
 */
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
    Loader(false);
    lstDanhSach_ref.children().removeClass("active");
    $(args.target).addClass("active");
    $(args.target).addClass("check");
    var txtTuVung_value = $(args.target).data("name");
    // @ts-ignore
    txtTuVung_ref.val(txtTuVung_value ?? "");
    // @ts-ignore
    KhoiTaoDuLieu();
    // @ts-ignore
    var result1 = await LayDuLieuTuVungAsync();
    // @ts-ignore
    VeDuLieuLenManHinh(result1);
    // @ts-ignore
    var result2 = await LayDuLieuBlockAsync(result1.id);
    if(result2.id) {
      // @ts-ignore
      result_ref.text(result2.content);
      // @ts-ignore
      result_ref.attr("data-id", result2.id);
    }
    // @ts-ignore
    TaoChart();
    // @ts-ignore
    await btnLuu_ClickAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    Loader(true);
  }
}
//#endregion
