$(function () {
    // Adjust Pannel design
    $('.pannel i').on('click', function () {
        $('.pannel').toggleClass('active');
    })

    let navCollapsed = true;
    $('.burgerIcon').on('click', function () {
        $('.header').animate({
            height: navCollapsed ? "250px" : "70px"
        }, 250);

        navCollapsed = !navCollapsed;
    });
})
