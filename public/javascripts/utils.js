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
 * @returns Dữ liệu
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
 * @returns Danh sách đã format
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
 * @returns span.bagde element
 */
function VeBadgeElement(id, name){
  return `<span class="badge rounded-pill text-bg-success p-2 m-1" ` +
  `data-id="${id}" data-name="${name}">${name}</span>`
}