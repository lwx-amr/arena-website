var quizIP = "http://192.168.99.100:8002ٍ";
var userIP = "http://192.168.99.100:8000";
var evaluatorIP = "http://192.168.99.100:8001";

$(".quizzes").empty();
        var skillName = $('#select-skill').find(":selected").text();
        $.ajax({
            url: evaluatorIP + `/reccomendquiz/0`,
            method: "GET",
            success: function (quizzes) {
                quizzesJson = JSON.parse(quizzes);
                quizzesJson.forEach(function (quiz) {
                    quiz = quiz[0];
                    $(".quizzes").append(` <div class="quiz-card">
                    <h2 id="quiz-title">${quiz["quiz title"]}</h2>
                    <p  id="quiz-skill-type">Skill: ${quiz["common skills"]}</p>
                    <p id="quiz-pass-score">Pass score: ${quiz["pass score"]}</p>
                    <a href="take-quiz.html/#1" id="take-quiz-btn" class="btn">Take this quiz</a>
                    </div>
                    `);
                });

            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
