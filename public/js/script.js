$(document).ready(function(){
          $("#menu").find("div").hide();
          $("#kt").hover(function(){
            $("#menu").find("div").hide();
            $("#KingTacoMenu").show();
            $(".menuDesc").hide();
          })
          $("#fc").hover(function(){
            $("#menu").find("div").hide();
            $("#FalafelCornerMenu").show();
          })
          $("#zp").hover(function(){
            $("#menu").find("div").hide();
            $("#ZPizzaMenu").show();
          })
          $("#ew").hover(function(){
            $("#menu").find("div").hide();
            $("#EasternWindsMenu").show();
          })
          $("#in").hover(function(){
            $("#menu").find("div").hide();
            $("#IndianMenu").show();
          })

           $("#kt").hover(function() {
               $("li").removeClass("active");
               $(this).addClass("active");});

           $("#zp").hover(function() {
               $("li").removeClass("active");
               $(this).addClass("active");});

           $("#ew").hover(function() {
               $("li").removeClass("active");
               $(this).addClass("active");});

           $("#fc").hover(function() {
               $("li").removeClass("active");
               $(this).addClass("active");});

           $("#in").hover(function() {
               $("li").removeClass("active");
               $(this).addClass("active");});

           var selectedRest = "", restClickedCount = 0;
           $(".nav li").click(function(){
              if (restClickedCount > 0) {
                alert("You cannot vote again");
              } else {
                selectedRest = $(this).text();
                // selectedId = $(this).attr("id");
                console.log("selectedRest = " + selectedRest);
                var restConfirm = window.confirm("Are you sure you want to vote for " + selectedRest +"?");
                if(restConfirm == true){
                ++restClickedCount;
                $('#votedRestaurant').text("Your vote: " + selectedRest + ".");
              };
            };
          })
          $("#carneasada1").hover(function () {
            $('#carneasada').stop(true,true).slideDown('medium');
          }, function () {
            $('#carneasada').stop(true,true).slideUp('medium');
          });
          $("#alpastor1").hover(function () {
            $('#alpastor').stop(true,true).slideDown('medium');
          }, function () {
            $('#alpastor').stop(true,true).slideUp('medium');
          });
          $("#carnitas1").hover(function () {
            $('#carnitas').stop(true,true).slideDown('medium');
          }, function () {
            $('#carnitas').stop(true,true).slideUp('medium');
          });
          $("#cabeza1").hover(function () {
            $('#cabeza').stop(true,true).slideDown('medium');
          }, function () {
            $('#cabeza').stop(true,true).slideUp('medium');
          });
          $("#lengua1").hover(function () {
            $('#lengua').stop(true,true).slideDown('medium');
          }, function () {
            $('#lengua').stop(true,true).slideUp('medium');
          });
          var selectedMenu = "";
          var menuClickedCount = 0;
           $("#menu .menuItem").click(function(){
            if (restClickedCount == 0) {
              alert("Please vote for a restaurant first");
            } else {
              if (menuClickedCount > 0) {
                alert("You cannot choose again");
              } else {
                selectedMenu = $(this).text();
                var specialRequest = prompt("Do you have any special requests with your " + selectedMenu + "? ex. extra cheese");
                if(specialRequest != null) {
                  var menuConfirm = window.confirm("Here is your order: " + selectedMenu + " with " + specialRequest);
                  if(menuConfirm == true){
                  ++menuClickedCount;
                  $('#submittedOrder').text("Your order: " + selectedMenu + " with " + specialRequest + ".");
                }
              }
            }

           }})
         });
           /*END OF CLICK HANDLERS*/

           /*START OF MOUSEOVER EVENTS*/

          /*
          $(".container > #menu").mouseover(function(e){
            e.stopPropagation();
            var desc = $(this).text();
            console.log("desc=" + desc);
            // $("#item-desc").remove();
            $("#item-desc").text(desc);
          });
          */

          // $("#menu p").mouseover(function(){
          //   var desc = $(this).text();
          //   console.log("desc=" + desc);
          //   // $("#item-desc").remove();
          //   $("#item-desc").text(desc);
          // });

//  – Oven-baked meatballs with melted mozzarella and organic marinara sauce
//  – Oven-roasted turkey, provolone, cranberry, lettuce, tomatoes, Dijon and mayo
//  – Marinated lime chicken breast, lettuce, fresh salsa and avocado.

//  – Solid white Albacore tuna, pesto mayonnaise, cucumbers, tomatoes, arugula, caramelized onions on a whole-wheat baguette
//  – Smoked ham, salami, provolone, tomatoes lettuce, pepperoncini, mayo and Italian dressing
//  – Avocado, provolone, tomatoes, lettuce, cucumber, artichoke hearts, caramelized onions, Italian dressing
// CURRY CHICKEN SANDWICH – Wheat bread, curry chicken, chutney, arugula, cilantro, cucumber.

           /*END OF MOUSEOVER EVENTS*/
