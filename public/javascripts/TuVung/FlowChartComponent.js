//@ts-check
// @ts-ignore
//#region Dữ liệu mẫu
var duLieuPhanTuTrongDanhSach = { id: "", name: "" }
var duLieuDanhSach = [{ ...duLieuPhanTuTrongDanhSach }];
var duLieuNhanDuoc = {
  id: "", name: "", url: "", furigana: "", slug: "",
  dongNghia: [...duLieuDanhSach], traiNghia: [...duLieuDanhSach],
  lienQuan: [...duLieuDanhSach], nghia: "",
  hanTu: [...duLieuDanhSach]
}
//#endregion

//#region Biến
// txtTuVung
var txtTuVung_ref = $("#txtTuVung_FlowChart");
var txtTuVung_val = $("#txtTuVung_FlowChart").val();
// btnTimKiem
var btnTimKiem_ref = $("#btnTimKiem_FlowChart");
// txtUrl
var txtUrl_ref = $("#txtUrl_FlowChart");
// btnTruyCap
var btnTruyCap_ref = $("#btnTruyCap_FlowChart");
// txtFurigana
var txtFurigana_ref = $("#txtFurigana_FlowChart");
// txtSLUG
var txtSLUG_ref = $("#txtSLUG_FlowChart");
// lstDongNghia
var lstDongNghia_ref = $("#lstDongNghia_FlowChart");
var lstDongNghia_box_ref = $("#lstDongNghia_FlowChart_box");
var lstDongNghia_list = [...duLieuDanhSach];
lstDongNghia_list = [];
// lstTraiNghia
var lstTraiNghia_ref = $("#lstTraiNghia_FlowChart");
var lstTraiNghia_box_ref = $("#lstTraiNghia_FlowChart_box");
var lstTraiNghia_list = [...duLieuDanhSach];
lstTraiNghia_list = [];
// lstLienQuan
var lstLienQuan_ref = $("#lstLienQuan_FlowChart");
var lstLienQuan_box_ref = $("#lstLienQuan_FlowChart_box");
var lstLienQuan_list = [...duLieuDanhSach];
lstLienQuan_list = [];
// lstHanTu
var lstHanTu_ref = $("#lstHanTu_FlowChart");
var lstHanTu_box_ref = $("#lstHanTu_FlowChart_box");
var lstHanTu_list = [...duLieuDanhSach];
lstHanTu_list = [];
// txtNghia
var txtNghia_ref = $("#txtNghia_FlowChart");
// btnVe
var btnVe_ref = $("#btnVe_FlowChart");
// tnLuu
var btnLuu_ref = $("#btnLuu_FlowChart");
// result
var result_ref = $("#result");
//#endregion

//#region Khởi tạo
/**
 * Khởi tạo dữ liệu
 */
// @ts-ignore
function KhoiTaoDuLieu() {
  txtUrl_ref.val("");
  btnTruyCap_ref.prop("href", "#");
  txtFurigana_ref.val("");
  txtSLUG_ref.val("");
  lstDongNghia_list = [];
  txtNghia_ref.val("");
  $('#graphDiv2').html("");
  result_ref.html("");
  result_ref.attr("data-id", "");
}

/**
 * Lấy dữ liệu từ vựng
 * @returns {Promise<typeof duLieuNhanDuoc>}
 */
async function LayDuLieuTuVungAsync() {
  var name = txtTuVung_ref.val();
  if (!name) {
    throw ("Nhập từ vựng");
  }
  // @ts-ignore
  const result = await GET(`/tu-vung/tim-kiem?name=${name}`);
  // Nếu không tìm thấy thì thông báo lỗi và dừng lại
  if (result.status === "404") {
    throw ("Không tìm thấy từ vựng");
  }
  return result.data;
}

async function LayDuLieuBlockAsync(id) {
  // @ts-ignore
  const result = await GET(`/block/tim-kiem?id=${id}`);
  // Nếu không tìm thấy thì thông báo lỗi và dừng lại
  if (result.status === "404") {
    return { id: "", content: "" };
  }
  return result.data;
}

btnTimKiem_ref.on("click", btnTimKiem_ClickAsync);
btnVe_ref.on("click", btnVe_Click);
btnLuu_ref.on("click", btnLuu_ClickAsync);
//#endregion

//#region Hàm xử lý
/**
 * Vẽ danh sách các từ vựng
 * @param {JQuery<HTMLElement>} ref 
 * @param {typeof duLieuDanhSach} list 
 * @param {string} element 
 */
function VeDanhSach(ref, list, element) {
  console.log(list);
  
  // Xóa danh sách
  for (var item_ref of [...ref.children()]) {
    item_ref.remove();
  }
  // Ve danh sach
  for (var item_list of list) {
    var el;
    switch (element) {
      case "li":
        // @ts-ignore
        el = VeLIElement(item_list.id, item_list.name);
        break;
      default:
        // @ts-ignore
        el = VeBadgeElement(item_list.id, item_list.name);
        break;
    }
    ref.append(el);
  }
}

/**
 * Vẽ dữ liệu lên màn hình
 * @param {typeof duLieuNhanDuoc} duLieu
 */
function VeDuLieuLenManHinh(duLieu) {
  txtUrl_ref.val(duLieu.id);
  btnTruyCap_ref.prop("href", duLieu.url);
  txtFurigana_ref.val(duLieu.furigana);
  txtSLUG_ref.val(duLieu.slug);
  lstDongNghia_list = duLieu.dongNghia ?? [];
  VeDanhSach(lstDongNghia_box_ref, lstDongNghia_list, "badge");
  lstTraiNghia_list = duLieu.traiNghia ?? [];
  VeDanhSach(lstTraiNghia_box_ref, lstTraiNghia_list, "badge");
  lstLienQuan_list = duLieu.lienQuan ?? [];
  VeDanhSach(lstLienQuan_box_ref, lstLienQuan_list, "badge");
  lstHanTu_list = duLieu.hanTu ?? [];
  VeDanhSach(lstHanTu_box_ref, lstHanTu_list, "badge");
  txtNghia_ref.val(duLieu.nghia);
}

/**
 * 
 */
function TaoChart() {
  var result = [
    "flowchart",
    "classDef 類 fill:#34568B, stroke:#FFFFFF, stroke-width:0.5px, color:#FFFFFF",
    "classDef 関 fill:#00A170, stroke:#FFFFFF, stroke-width:0.5px, color:#FFFFFF",
    "classDef 対 fill:#E0B589, stroke:#000000, stroke-width:0.5px, color:#000000",
    "classDef 言葉 fill:#363945, stroke:#363945, stroke-width:0.5px, color:#FFFFFF",
    "classDef 漢字 fill:#BC243C, stroke:#000000, stroke-width:0.5px, color:#FFFFFF, font-size:10px",
    "類((類)):::類",
    "関((関)):::関",
    "対((対)):::対",
  ];

  txtTuVung_val = txtTuVung_ref.val();
  // @ts-ignore
  lstDongNghia_list = LayDanhSach([...lstDongNghia_box_ref.children()]);
  // @ts-ignore
  lstTraiNghia_list = LayDanhSach([...lstTraiNghia_box_ref.children()]);
  // @ts-ignore
  lstLienQuan_list = LayDanhSach([...lstLienQuan_box_ref.children()]);
  // @ts-ignore
  lstHanTu_list = LayDanhSach([...lstHanTu_box_ref.children()]);

  result.push(`${txtTuVung_val}{${txtTuVung_val}}:::言葉`)
  result.push(`${txtTuVung_val}-->類`)
  result.push(`${txtTuVung_val}-->関`)
  result.push(`${txtTuVung_val}-->対`)

  for (var item of lstDongNghia_list) {
    result.push(`dn${item.name}([${item.name}]):::言葉`)
    result.push(`類-->dn${item.name}`)
  }

  for (var item of lstLienQuan_list) {
    result.push(`lq${item.name}([${item.name}]):::言葉`)
    result.push(`関-->lq${item.name}`)
  }

  for (var item of lstTraiNghia_list) {
    result.push(`tn${item.name}([${item.name}]):::言葉`)
    result.push(`対-->tn${item.name}`)
  }

  for (var item of lstHanTu_list) {
    result.push(`ht${item.name}{${item.name}}:::漢字`)
    result.push(`ht${item.name}-->${txtTuVung_val}`)
  }

  result_ref.text(result.join("\n"));
}
//#endregion

//#region Sự kiện
/**
 * Sự kiện khi click vào nút [Tìm kiếm]
 * @param {*} args 
 */
// @ts-ignore
async function btnTimKiem_ClickAsync(args) {
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
    else {
      TaoChart()
    }
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
}

/**
 * Sự kiện khi click vào nút [Vẽ]
 * @param {*} args 
 */
// @ts-ignore
function btnVe_Click(args) {
  // @ts-ignore
  Loader(false);
  try {
    TaoChart();
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
async function btnLuu_ClickAsync() {
  // @ts-ignore
  Loader(false);
  try {
    var id = result_ref.attr("data-id");
    var content = result_ref.text();
    if (!content) {
      throw ("Lỗi");
    }
    else {
      if (id) {
        console.log("/block/cap-nhat", id);
        // @ts-ignore
        var result = await POST("/block/cap-nhat", { id, content });
      }
      else {
        id = txtUrl_ref.val()?.toString();
        console.log("/block/them", id);
        // @ts-ignore
        var result = await POST("/block/them", { id, content });
      }
    }
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    // @ts-ignore
    Loader(true);
  }
}
//#endregion
