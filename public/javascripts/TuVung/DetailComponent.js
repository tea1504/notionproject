$("#btnShowModal").on('click', async function (event) {
  Loader(false);
  await GET(`/han-tu/tim-kiem?name=倍`);
  Loader(true);
})