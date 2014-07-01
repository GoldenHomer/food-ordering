
// Start of button

function deselect(e) {
    $(".pop").slideFadeToggle(function() {
        e.removeClass("selected");
    });    
}

$(function() {
    $("#contact").on('click', function() {
        if($(this).hasClass("selected")) {
            deselect($(this));
        } else {
            $(this).addClass("selected");
            $(".pop").slideFadeToggle();
        }
        return false;
    });

    $(".close").on('click', function() {
        deselect($(this));
        return false;
    });
});

$.fn.slideFadeToggle = function(easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, "fast", easing, callback);
};

// End of button

// $(document).ready(function(){
//     console.log("hello");
//     console.log(orderHistory);
//     if(orderHistory != "")
//         for each (orderHistory) {
//             if(item.price != ""){
//         console.log(item.price);
//         $('th').html("a(href='#') Receipt")
//     } else {
//         $('th').html("a(href='#') Upload Receipt")
//     }
// }
// });