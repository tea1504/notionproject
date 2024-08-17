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
    KhoiTaoDuLieu();
    var result1 = await LayDuLieuTuVungAsync();
    VeDuLieuLenManHinh(result1);
    var result2 = await LayDuLieuBlockAsync(result1.id);
    if(result2.id) {
      result_ref.text(result2.content);
      result_ref.attr("data-id", result2.id);
    }
    TaoChart();
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
    txtTuVung_ref.val(txtTuVung_value ?? "");
    KhoiTaoDuLieu();
    var result1 = await LayDuLieuTuVungAsync();
    VeDuLieuLenManHinh(result1);
    var result2 = await LayDuLieuBlockAsync(result1.id);
    if(result2.id) {
      result_ref.text(result2.content);
      result_ref.attr("data-id", result2.id);
    }
    TaoChart();
    await btnLuu_ClickAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    Loader(true);
  }
}
//#endregion
