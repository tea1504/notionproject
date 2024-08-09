$(document).ready(async () => {
  Loader(true);
});


function Loader(hide = true){
  if(hide){
    $(`#loader`).addClass('d-none');
    $(`#loaderModal`).addClass('d-none');
  }
  else{
    $(`#loader`).removeClass('d-none');
    $(`#loaderModal`).removeClass('d-none');
  }
}

$("input").on("focus", function (event) {
  $(this).select();
})