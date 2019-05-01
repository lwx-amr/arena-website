var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
$(document).ready(function () {
    var question_answers = [];
    var answer_count = 0;

    $("#add-quiz").click(function () {

        quizData = {
            title: $("#quizTitle").val(),
            pass_score: Number($("#quizPassScore").val()),
            num_of_questions: Number($("#quizNumQuestions").val()),
            expected_duration: Number($("#quizDuration").val()),
            skill_type: {name: $("#quizSkillType").val()}
        };

        $.ajax({

            url: quizIP + "/quizzes/",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(quizData),
            success: function () {
                alert("Quiz added succefully");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + XMLHttpRequest.responseJSON.error);
            },
        });
        return false; // prevent reloading the page
    });

    $("#add-question").click(function () {
        correct_answer_idx = Number($("input[type='radio'][name='answers']:checked").val());
        answers_with_is_correct = [];
        for (i = 0; i < question_answers.length; i++) {
            if (i == correct_answer_idx) {
                answers_with_is_correct.push({"answer_text": question_answers[i], "is_correct": true});
            } else {
                answers_with_is_correct.push({"answer_text": question_answers[i]});
            }
        }
        questionData = {
            question_text: $("#question-text").val(),
            question_type: 'MCQ',
            score: Number($("#question-score").val()),
            skill_type: {name: $("#question-skill-type").val()},
            answers: answers_with_is_correct
        };
        console.log(questionData);
        $.ajax({
            url: quizIP + "/questions/",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(questionData),
            success: function () {
                alert("Question added successfully");
            },
            error: function (XMLHttpRequest) {
                alert("Error: " + XMLHttpRequest.responseJSON.error);
            },
        });
        clearQuestionForm();
        answer_count = 0;
        question_answers = [];

        return false; // prevent reloading the page

    });

    $("#add-skill-type").click(function () {

        skillTypeData = {
            name: $("#skill-type-name").val(),
        };

        $.ajax({

            url: quizIP + "/skillTypes/",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(skillTypeData),
            success: function () {
                alert("Skill type added succefully");
            },
            error: function () {
                alert('Please try again!');
            },
        });
        $("#skill-type-name").val('');
        return false; // prevent reloading the page
    });

    function getAllQuizzes() { // for test function
        $.ajax({
            url: quizIP + "/quizzes/",
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

    function clearQuestionForm() {
        $("input").val('');
        $("#question-answers").empty();
        $("#question-answers").append('<div id="appended-answers"></div>');

    }

    $("#add-answer-addon").click(function () {
        var answer = $("#proposed-answer").val();
        $("#proposed-answer").val('');
        $("#appended-answers").append(`<div class="form-check">
                                        <input class="form-check-input" type="radio" name="answers" id="gridRadios1"
                                               value="${answer_count}">
                                        <label class="form-check-label" for="gridRadios1">
                                            ${answer}
                                        </label>
                                    </div>`);
        answer_count = answer_count + 1;
        question_answers.push(answer);
    });
});
