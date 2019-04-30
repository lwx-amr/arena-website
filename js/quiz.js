$(document).ready(function () {
    $("#add-quiz").click(function () {


        // getAllQuizes();
        quizData = {
            title: $("#quizTitle").val(),
            pass_score: Number($("#quizPassScore").val()),
            num_of_questions: Number($("#quizNumQuestions").val()),
            expected_duration: Number($("#quizDuration").val()),
            skill_type: {name: $("#quizSkillType").val()}
        };

        var response = $.ajax({
            url: "http://127.0.0.1:8001/quizzes/",
            dataType: "json",
            method: "POST",
            data:{"title":"test","pass_score":5,"num_of_questions":5,"expected_duration":5,"skill_type":{"name":"test"}},
            success: function () {
               response = "success";
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }, complete: function (request, status) {
                alert("Error with status: " + status);
            }
        });
        alert("test");
        console.log(response);

    });

    function getAllQuizes() {
        response = "";
        $.ajax({
            url: "http://127.0.0.1:8001/quizzes/",
            method: "GET",
            success: function (data) {
                response = data;
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);

            }, complete: function (request, status) {
                console.log("Error with status: " + status);
            }
        });
        alert(response);
    }
});
