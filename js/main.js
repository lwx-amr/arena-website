$(function () {

    let navCollapsed = true;
    $('.burgerIcon').on('click', function () {
        $('.header').animate({
            height: navCollapsed ? "250px" : "70px"
        }, 250);

        navCollapsed = !navCollapsed;
    });

    // Adjust Pannel design
    $('.pannel i').on('click',function(){
        $('.pannel').toggleClass('active');
    })

    // Options
    $(".options li").on("click",function(){
      $('body,html').animate({
        scrollTop:$('.options').offset().top
      },800);
      $(this).addClass("active").siblings().removeClass("active");
    })
    $(".votes i").on("click",function(){
      if($(this).hasClass("active")){
        $(this).removeClass("active");
        return;
      }
      $(this).addClass("active").parent().siblings().find('i').removeClass("active");
    })

    // Adjust Follow Click
    $('.follow .btn').on('click',function(e){
        e.preventDefault();
        if($(this).hasClass("followed")){
          $(this).removeClass("followed");
          $(this).html("Follow");
        }else{
          $(this).addClass("followed");
          $(this).html("Followed");
        }
    })

    // Age Choices
    for (var i = 12; i <= 100; i++) {
        $(".age").append("<option value='" + i +"'>" + i + "</option>")
    }

  })

  // Adjust Tabs
  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

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
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, s, ps1, ps2 , i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    s = x[currentTab].getElementsByTagName("select");
    ps1  = document.getElementById("password1");
    ps2  = document.getElementById("password2");
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
    if( ps1.value != ps2.value ){
      ps1.className +=" invalid";
      ps2.className +=" invalid";
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
