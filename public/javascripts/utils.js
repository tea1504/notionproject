async function GET(url = "", query = "") {
  const response = await fetch(
    url,
    {
      method: "GET",
    }
  );
  return await response.json();
}

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

function LayDanhSach(array = []) {
  return array.map(e => {
    return {
      id: $(e).data("id"),
      name: $(e).data("name"),
    }
  })
}