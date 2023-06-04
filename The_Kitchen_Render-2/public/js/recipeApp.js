$(document).ready(() => {
  let apiToken = $("#apiToken").text();
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get(`/api/courses?apiToken=${apiToken}`, (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach((course) => {
        $(".modal-body").append(`
        <div>
          <span class="course-title">${course.title}</span>
          <div class="course-description">${course.description}</div>
          <button class="join-button" data-id="${course._id}">Join</button>
        </div>`);
      });
    }).then(() => {
      addJoinButtonListener(apiToken);
    });
  });
});

let addJoinButtonListener = (token) => {
  $(".join-button").click((event) => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join?apiToken=${token}`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

const socket = io();
$("#chatForm").submit(() => {
  let text = $("#chat-input").val(),
    userName = $("#chat-user-name").val(),
    userId = $("#chat-user-id").val();
  socket.emit("message", { content: text, userId: userId, userName: userName });
  $("#chat-input").val("");
  return false;
});
socket.on("message", (message) => {
  displayMessage(message);
  for (let i = 0; i < 5; i++) {
    $(".chat-icon").fadeOut(200).fadeIn(200);
  }
});
socket.on("load all messages", (data) => {
  data.forEach((message) => {
    displayMessage(message);
  });
});

socket.on("user disconnected", () => {
  displayMessage({
    userName: "Notice",
    content: "User left the chat",
  });
});
let displayMessage = (message) => {
  $("#chat").prepend(
    $("<li>").html(
      `<strong class="message ${getCurrentUserClass(message.user)}">${
        message.userName
      }</strong>: ${message.content}`
    )
  );
};

let getCurrentUserClass = (id) => {
  let userId = $("#chat-user-id").val();
  return userId === id ? "current-user" : "other-user";
};
