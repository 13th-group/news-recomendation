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

  $("#btn-search").click(() => {
    const value = $("#search").val();
    fetchNews(value);
  });
});

function checkUserLogged() {
  if (localStorage.access_token) {
    $("#news-page").show();
    $("#auth-page").hide();
    fetchNews();
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

function fetchNews(query = "") {
  $("#news").empty();
  $.ajax({
    url: `${BASE_URL}/news?q=${query}`,
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((res) => {
      res.news.forEach((news) => {
        $("#news").append(`
          <div class="d-flex justify-content-between position-relative px-2 py-4 border-bottom">
          <div class="">
            <h2 class="h6">${news.title}</h2>
            <p class="text-muted" style="font-size: 0.8rem">${news.date}</p>
            <a href="${news.web_url}" class="stretched-link"></a>
          </div>
          <img src="${
            news.image_url ? news.image_url : "./assets/blank-img.jpg"
          }"
            class="ml-2" style="object-fit: cover;width: 72px; height: 72px;"
            alt="${news.title}"
          >
          </div>
        `);
      });
    })
    .fail((err) => {
      console.log(err);
    });
}
