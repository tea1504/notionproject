function Loader(hide = true){
  if(hide){
    $(`#loader`).addClass('d-none');
  }
  else{
    $(`#loader`).removeClass('d-none');
  }
}

$("input").on("focus", function (event) {
  $(this).select();
})