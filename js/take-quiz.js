var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
function generateAnswer(answer, questionId) {
    const container = $("<div></div>").addClass("flexRow answer");
    const label = $("<label></label>");

    const input = $("<input>")
        .attr("type", "radio")
        .attr("name", questionId)
        .attr("value", answer.id);

    label.append(input).append(answer.answer_text);
    container.append(label);

    return container;
}

function generateQuestion(question) {
    const container = $("<div></div>").addClass("question");
    const label = $("<label></label>").addClass("body").append(question.question_text);

    container.append(label);
    question.answers.forEach(answer => {
        container.append(generateAnswer(answer, question.id));
    });

    container.append($("<hr>"));
    return container;
}

function startTimer(time, container, callBack) {
    let countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + time);

    countDownDate = countDownDate.getTime()

    timerInterval = setInterval(function() {

        let now = new Date().getTime();
        let distance = countDownDate - now;
        
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        container.innerHTML = hours + ":" + minutes + ":" + seconds;
    
        if (distance < 0) {
            callBack()
            clearInterval(timerInterval);
        }
    }, 1000);
}

function startQuiz(data) {
    $('.quizForm').children().remove();

    instanceQuestions = data.questions;
    data.questions.forEach(question => {
        $('.quizForm').append(generateQuestion(question));
    });
    $('.quizForm').append($('<input type="submit">'));

    instanceId = data.id;
    
    startTimer(data.expected_duration, $(".timer")[0], submitQuiz)

    $("form").submit(function(e){
        e.preventDefault();
        submitQuiz();
    });
}

function submitQuiz(){
    let tbs = {answers: []};
    instanceQuestions.forEach((question, index) => {
        let temp = $("input[name='" + question.id + "']:checked").val();

        if (temp)
            tbs.answers.push({
                'qid': question.id,
                'aid': temp
            })
    });

    $.ajax({
        url: quizIP + "/quiz/submit/" + instanceId,
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify(tbs),
        success: function (result) {
            clearInterval(timerInterval);
            $('.quizForm').children().remove();
            $('.quizForm').append("<h3>Passed: " + (result.passed ? "Yes" : "No") + "</h3>");
            $('.quizForm').append("<h3>Score: " + result.score + "</h3>");
        },
        error: function (result) {
            alert("Something went wrong please try again later.")
            window.location.href = "home.html";
        },
    });
}

const quizId = window.location.hash.slice(1);
const userId = Cookies.get('userId');

let instanceId;
let instanceQuestions;
let timerInterval;

if (!$.isNumeric(quizId) || !$.isNumeric(userId)) {
    window.location.href = "home.html";
}

$.ajax({
    url: quizIP + "/quiz/take/" + quizId,
    type: 'POST',
    crossDomain: true,
    contentType: 'application/json',
    data: JSON.stringify({
        uid: userId
    }),
    success: function (result) {
        startQuiz(result)
    },
    error: function (result) {
        alert("Something went wrong please try again later.")
        window.location.href = "home.html";
    },
});