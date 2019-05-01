var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
var userId;

$(document).ready(function () {
    $("#login").click(function () {
        let userData = {};
        let user_name =  $("#username").val();
        let user_password= $("#password").val();

        $.ajax({
            url: userIP + "/login_validation/" + user_name + "/" + user_password,
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (data) {
                if(data === "User not Found"){
                    alert('Invalid username or password');
                }else {
                    Cookies.set('userId', data.user_ID);
                    if(user_name === "admin"){
                        window.location.href = "admin-panel.html";
                    }else{
                        window.location.href = "profile.html";
                    }
                }
            },
            error: function () {
            },
        });
        return false; // prevent reloading the page
    });
});
