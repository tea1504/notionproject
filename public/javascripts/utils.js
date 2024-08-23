/**
 * Phương thức GET
 * @param {string} url Đường dẫn
 * @param {string} query Dữ liệu
 * @returns Dữ liệu trả về
 */
async function GET(url = "", query = "") {
  const response = await fetch(
    url,
    {
      method: "GET",
    }
  );
  return await response.json();
}

/**
 * Phương thức POST
 * @param {string} url Đường dẫn
 * @param {object} data Dữ liệu
 * @returns {object} Dữ liệu
 */
async function POST(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Lấy danh sách từ màn hình
 * @param {object[]} array Danh sách trên màn hình
 * @returns {{id:string, name:string}}
 */
function LayDanhSach(array = []) {
  return array.map(e => {
    return {
      id: $(e).data("id"),
      name: $(e).data("name"),
    }
  })
}

/**
 * Vẽ li element
 * @param {string} id id
 * @param {string} name tên
 * @returns li element
 */
function VeLIElement(id, name){
  return `<li class="list-group-item" data-id="${id}" data-name="${name}">${name}</li>`
}

/**
 * Vẽ bagde element
 * @param {string} id id
 * @param {string} name tên
 * @param {string} class tên
 * @returns span.bagde element
 */
function VeBadgeElement(id, name, _class = "text-bg-success"){
  return `<span class="badge rounded-pill ${_class} p-2 m-1" ` +
  `data-id="${id}" data-name="${name}">${name}</span>`
}

//#region Hàm xử lý
/**
 * Vẽ danh sách các từ vựng
 * @param {JQuery<HTMLElement>} ref 
 * @param {typeof duLieuDanhSach} list 
 * @param {string} element 
 */
function VeDanhSach(ref, list, element) {
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

function VeThemDanhSach(ref, list, element) {
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
        el = VeBadgeElement(item_list.id, item_list.name, "text-bg-secondary");
        break;
    }
    ref.append(el);
  }
}
