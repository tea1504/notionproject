$(document).ready(async () => {
  Loader(false);
  try {
    await KhoiTao();
    await LuuAsync();
  } catch (error) {
    $('#errorModal').show();
    $('#errorModalContent').html(`<p>${error}</p>`);
  } finally {
    Loader(true);
  }
});

async function LuuAsync() {
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
    duLieu["name"] = txtTu_ref.val();
    result = await POST("/tu-vung/them-moi", duLieu);
  }
  if (result) {
    if (result.status != "200") {
      throw ("Lỗi khi cập nhật");
    }
    VeDuLieuLenManHinh(result.data);
  }
}