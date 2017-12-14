var addFilters = (function(element) {
  var filtersArr = [];
  for (var i = 0; i < restaurants.length; i++) {
    for (var n = 0; n < restaurants[i].filters.length; n++) {
      filtersArr.push(restaurants[i].filters[n]);
    }
  }
  var filtersFinal = [...new Set(filtersArr)];
  for (var a = 0; a < filtersFinal.length; a++) {
    element.append("<option value='"+filtersFinal[a]+"'>"+filtersFinal[a]+"");
  };
  return filtersFinal;
});

$(document).ready(function() {
  /**
  * Function that creates new options according to the tags
  */
  addFilters($("#filter"));
  /**
  * Function that makes the loader fadeout after 6 seconds
  */
  setTimeout(function(){
    $("#loader").fadeOut();
  },6000);
  /**
  * Initializes the modal
  */
  $("#modal").modal();
  /**
  * Makes the images show when the value of a selection matches the filters of the restaurant
  */
  $("#filter").change(function() {
    $("#restaurants-container").children().remove();
    var selection = $("select").val();
    for (var i = 0; i < restaurants.length; i++) {
      for(var n = 0; n < restaurants[i].filters.length; n++) {
        if (restaurants[i].filters[n] == selection) {
          var image = restaurants[i].photo;
          $("#restaurants-container").append("<div class='col s12 l6 xl6'><div class='container-img-p'><p class='overlay-text'>"+restaurants[i].name+"</p>"+image+"</div></div>");
        }
      }
    };
    /**
    * Mouseover effect
    */
    $(".container-img-p").mouseover(function() {
      $(":nth-child(1)", this).css({"opacity": "1"});
    });

    $(".container-img-p").mouseout(function() {
      $(":nth-child(1)", this).css({"opacity": "0"});
    });
    /**
    * Determining the content of the modal
    */
    $(".container-img-p").click(function() {
      var place = $(this).children("img").attr("alt");
      for (var i = 0; i < restaurants.length; i++) {
        if (place == restaurants[i].name) {
          $("#title-modal").empty();
          $("#modal-data").empty();
          $("#title-modal").html(restaurants[i].name);
          $("#modal-map").empty();
          var newName = restaurants[i].name.replace(/ /g, "+");
          for (var n = 0; n < restaurants[i].address.length; n++) {
            var newAddress = restaurants[i].address[n].replace(/ /g, "+");
            var addressGoogle = newAddress.replace(/,/g, "");
            $("#modal-map").append("<iframe src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAR26jcQ0wriBfIDM3j327c80TqkZjw8-A&q="+addressGoogle+"'allowfullscreen></iframe>");
            $("#modal-data").append("<p>"+restaurants[i].address[n]+"</p>");
          }
          $("#modal-data").append("<p><a href='"+restaurants[i].website+"'>"+restaurants[i].website+"</a></p>");
        }
      }
      $("#modal").modal("open");
      /**
      * If the user clicks on the modal overlay, the search resets itself
      */
      $(".modal-overlay").click(function() {
        $("#restaurants-container").children().remove();
        $("select").val(null);
      })
    });
  });
});



// AIzaSyAR26jcQ0wriBfIDM3j327c80TqkZjw8-A

/* "<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAR26jcQ0wriBfIDM3j327c80TqkZjw8-A&q=Space+Needle,Seattle+WA" allowfullscreen></iframe> */

// if ($("select").val() == "vegan") {
// $("#restaurants-container").append(restaurants[0].photo);