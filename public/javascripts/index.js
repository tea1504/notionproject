$(document).ready(async () => {
  Loader(true);
});

function Loader(hide = true) {
  if (hide) {
    $(`#loader`).addClass('d-none');
    $(`#loaderModal`).addClass('d-none');
  }
  else {
    $(`#loader`).removeClass('d-none');
    $(`#loaderModal`).removeClass('d-none');
  }
}

$("input").on("focus", function (event) {
  $(this).select();
})

$("#errorModal button").on("click", (e) => {
  $("#errorModal").hide();
})

$(document).on('click', '.badge', event => $(event.target).remove());

/**
 * 
 * @param {string} id 
 */
function InputSelectOnChangeCommon(id) {
  var list = LayDanhSach([...$(`#${id}_list`).children()]);
  var val = $(`#${id}`).val();
  var index = list.map(e => e.id.toString()).indexOf(val.toString());
  if (index == -1) {
    $(`#${id}`).val("");
    $(`#${id}_input`).val("");
  }
  else {
    $(`#${id}_input`).val(list[index].name);
  }
}
