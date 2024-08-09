$(document).ready(async () => {
  Loader(false);
  await GET(`/han-tu/tim-kiem?name=倍`);
  Loader(true);
});