$(document).ready(function () {

    $("#add-quiz").click(function () {

        quizData = {
            title: $("#quizTitle").val(),
            pass_score: Number($("#quizPassScore").val()),
            num_of_questions: Number($("#quizNumQuestions").val()),
            expected_duration: Number($("#quizDuration").val()),
            skill_type: {name: $("#quizSkillType").val()}
        };

        $.ajax({

            url: "http://127.0.0.1:8001/quizzes/",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(quizData),
            success: function () {
                alert("Success");
            },
            error: function () {
                alert('Failed!');
            },
        });
        return false; // prevent reloading the page
    });

    function getAllQuizzes() { // for test function
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
        return false;
    }
});
