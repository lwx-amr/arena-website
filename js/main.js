var quizIP = "http://192.168.99.100:8002";
var userIP = "http://192.168.99.100:8000";
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

})
