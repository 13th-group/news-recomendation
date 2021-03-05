const BASE_URL = "http://localhost:8000";

$(document).ready(() => {
  checkUserLogged();
  $("#form-register").hide();
  $("#liveToast").hide();

  $("#nav-register").click(() => {
    $("#form-register").show();
    $("#form-login").hide();
  });

  $("#nav-login").click(() => {
    $("#form-register").hide();
    $("#form-login").show();
  });
});

function checkUserLogged() {
  if (localStorage.access_token) {
    $("#news-page").show();
    $("#auth-page").hide();
    return;
  }
  $("#news-page").hide();
  $("#auth-page").show();
}

function logout() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });

  localStorage.removeItem("access_token");
  checkUserLogged();
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${BASE_URL}/oauth`,
    method: "POST",
    data: {
      id_token,
    },
  })
    .done((res) => {
      localStorage.setItem("access_token", res.access_token);
      checkUserLogged();
    })
    .fail((err) => {
      alert("Internal Server Error");
    });
}

function auth(event, type) {
  event.preventDefault();

  $.ajax({
    url: `${BASE_URL}/${type}`,
    method: "POST",
    data: {
      email: $(`#email-${type}`).val(),
      password: $(`#password-${type}`).val(),
    },
  })
    .done((res) => {
      if (type === "register") {
        $("#form-register").hide();
        $("#form-login").show();
        return;
      }

      localStorage.setItem("access_token", res.access_token);
      checkUserLogged();
    })
    .fail((err) => {
      alert(err.responseJSON.message);
    })
    .always(() => {
      $(`#form-${type}`)[0].reset();
    });
}

function alert(message) {
  $("#liveToast p").text(message);
  $("#liveToast").show();

  setTimeout(() => {
    $("#liveToast").hide();
  }, 2000);
}

// const dummy = `<h1>Lorem ipsum</h1>`;
// for (let index = 0; index < 25; index++) {
//   $("#content").append(dummy);
// }

// $(document).scroll(function () {
//   if ($(document).height() - $(document).scrollTop() < 800) {
//     addTitle(dummy);
//   }
// });

// function addTitle(content) {
//   for (let index = 0; index < 25; index++) {
//     $("#content").append(content);
//   }
// }
