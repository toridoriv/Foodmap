$(document).ready(function() {
  /**
  * Function that makes the loader fadeout after 6 seconds
  */
  setTimeout(function(){
    $("#loader").fadeOut();
  },6000);
  /**
  * Makes the Materialize Select to appears when the loader dissapears
  */
  setTimeout(function(){
    $("select").material_select();
  },0);
  /**
  * Makes the images show when the value of a selection matches the filters of the restaurant
  */
  $("select").change(function() {
    $("#restaurants-container").children().remove();
    var selection = $("select").val();
    for (var i = 0; i < restaurants.length; i++) {
      for(var n = 0; n < restaurants[i].filters.length; n++) {
        if (restaurants[i].filters[n] == selection) {
          $("#restaurants-container").append(restaurants[i].photo);
        }
      }
    }
  });
});



// $("select").val()
// if ($("select").val() == "vegan") {
// $("#restaurants-container").append(restaurants[0].photo);