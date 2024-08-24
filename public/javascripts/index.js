$(document).ready(async () => {
  Loader(true);
});

/**
 * 
 * @param {boolean} hide
 */
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

/**
 * 
 * @param {string} url
 * @param {string} title
 * @param {number} w
 * @param {number} h
 * @returns
 */
function popupwindow(url, title, w = 1000, h = 500) {
  var left = (screen.width / 2) - (w / 2);
  var top = (screen.height / 2) - (h / 2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

/**
 * 
 * @param {string} errorMessage
 */
function popupError(errorMessage) {
  var errorPopup = popupwindow(`/error?message=${errorMessage}`, "errorPopup");
  if (!errorPopup) {
    Loader(true);
    return;
  }
  Loader(false);
  var timer = setInterval(function () {
    if (errorPopup.closed) {
      clearInterval(timer);
      Loader(true);
    }
  }, 1000);
}

/**
 * 
 * @param {Event} event
 * @param {any} onchange
 */
async function inputSearch_OnchangeAsync(event, onchange) {
  var id = event.target.id.split("_")[0];
  var ref_checkbox = $(`#${id}_checkbox`);
  if (event.target.value) {
    ref_checkbox.prop("checked", true);
  }
  else {
    ref_checkbox.prop("checked", false);
  }
  if (onchange) {
    await onchange();
  }
}
