var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
$(document).ready(function () {

    skill_quizzes = [];

    $.ajax({

        url: quizIP + "/skillTypes/",
        type: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        success: function (data) {
            add_skills_to_select(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + XMLHttpRequest.responseJSON.error);
        },
    });


    $("#get-quizzes-by-skill").click(function () {
        $(".quizzes").empty();
        var skillName = $('#select-skill').find(":selected").text();
        $.ajax({
            url: quizIP + `/quizzes/?skillType=${skillName}`,
            method: "GET",
            success: function (quizzes) {
                quizzes.forEach(function (quiz) {
                    $(".quizzes").append(` <div class="quiz-card">
                    <h2 id="quiz-title">${quiz.title}</h2>
                    <p  id="quiz-skill-type">Skill: ${quiz.skill_type.name}</p>
                    <p id="quiz-num-of-questions">Number of questions: ${quiz.num_of_questions}</p>
                    <p id="quiz-expected-duration">Expected duration: ${quiz.expected_duration}</p>
                    <p id="quiz-pass-score">Pass score: ${quiz.pass_score}</p>
                    <a href="take-quiz.html?#${quiz.id}" id="take-quiz-btn" class="btn">Take this quiz</a>
                    </div>
                    `);
                });

            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
        return false;
    });

    function add_skills_to_select(all_skills) {
        all_skills.forEach(function (skill) {
            $(".search-quiz select").append(`<option >${skill.name}</option>`);
        });
    }

    return false;
});