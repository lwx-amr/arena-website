var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
var currentTab = 0;

$(function () {
    // Age Choices
    for (var i = 12; i <= 100; i++) {
        $(".age").append("<option value='" + i + "'>" + i + "</option>")
    }
    //add Interests checkboxes
    addInterests();

    // Adjust Tabs
    showTab(currentTab); // Display the current tab
})

function addInterests(){
    $.ajax({
            url: quizIP + "/skillTypes/",
            method: "GET",
            success: function (data) {
                response = data;
                addInterestsToForm(response)
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);

            }, complete: function (request, status) {
                console.log("Error with status: " + status);
            }
        });
}
function addInterestsToForm(skills){
    for (let i = 0; i < skills.length; i++) {
        check_element = `<div class="element">
                          <label>${skills[i].name}
                            <input type="checkbox" name= "interest" value=${skills[i].name}>
                            <span class="checkmark"></span>
                          </label>
                        </div>`;
        $(".checkboxs").append(check_element)
    }
}

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
  }

function nextPrev(n) {
// This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
// Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
// Hide the current tab:
    x[currentTab].style.display = "none";
// Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
// if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        registerUser();
        // document.getElementById("regForm").submit();
        return false;
    }
// Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
// This function deals with validation of the form fields
    var x, y, s, ps1, ps2, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    s = x[currentTab].getElementsByTagName("select");
    ps1 = document.getElementById("password1");
    ps2 = document.getElementById("password2");
// A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }

// Repeat Password Validation
    if (ps1.value != ps2.value) {
        ps1.className += " invalid";
        ps2.className += " invalid";
        valid = false;
    }

    for (i = 0; i < s.length; i++) {
        // If a field is empty...
        if (s[i].value == "") {
            // add an "invalid" class to the field:
            s[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
// If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " done";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace("active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function registerUser(){
    let interests = [];
    $.each($("input[name='interest']:checked"), function(){
        interests.push($(this).val());
    });
    let interests_string = interests.join(", ");
    let userData = {
        user_name: $("#username").val(),
        password: $("#password1").val(),
        first_name: $("#fname").val(),
        last_name: $("#lname").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        interests: interests_string
    };

    $.ajax({
        url: userIP + "/registerUser",
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function () {
            alert("Registration is successful.\n please login with your new account");
            window.location.href="login.html";
        },
        error: function () {
            alert('Please try again');
        },
    });

}