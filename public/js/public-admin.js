;
$(function () {
    // 一级菜单
    $(".listGroup>.listItem").on('click', function () {
        if ($(this).hasClass('list')) {
            $(this).next('ul').slideToggle();
        }
    })
});