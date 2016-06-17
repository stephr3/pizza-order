//Business Logic
//Set Objects
function Order (name, total) {
  this.orderName = name;
  this.totalPrice = total;
  this.orderPizzas = [];
}

function Pizza (size, toppings, price) {
  this.pizzaSize = size;
  this.pizzaToppings = toppings;
  this.pizzaPrice = price;
}
//Set Prototypes
Pizza.prototype.calculateSizePrice = function () {
  if (this.pizzaSize === "Small"){
    this.pizzaPrice = 7;
  } else if (this.pizzaSize === "Medium") {
    this.pizzaPrice = 9;
  } else {
    this.pizzaPrice = 11;
  }
}

Pizza.prototype.addToppings = function () {
  if (this.pizzaSize === "Small") {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += .50;
    }
  } else if (this.pizzaSize === "Medium") {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += .75;
    }
  } else {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += 1;
    }
  }
}
///Bug - Need to loop through each pizza in newOrder's pizzaOrder array, calculate each pizza's price, and add the pizza prices to the total price.
Order.prototype.calculateIndividualPizzaPrices = function () {
  (this.orderPizzas).forEach(function(object){
    object.calculateSizePrice();
    object.addToppings();
  });
}
//User Interface Logic
$(function(){
  //Add Another Pizza Button Functionality
  $("#add-pizza").click(function() {
    $("#new-pizzas").append(
      "<div class='new-pizza'>" +
        "<div class='form-group'>" +
          "<label for='select-size'>Choose your pizza size:</label>" +
          "<select class='form-control' id='select-size'>" +
            "<option>Small</option>" +
            "<option>Medium</option>" +
            "<option>Large</option>" +
          "</select>" +
        "</div>" +
        "<div class='form-group'>" +
          "<label for='toppings'>Select extra toppings:</label>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='pepperoni'>" +
              "Pepperoni" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='sausage'>" +
              "Sausage" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='bell-peppers'>" +
              "Bell Peppers" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='olives'>" +
              "Olives" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='extra-cheese'>" +
              "Extra Cheese" +
            "</label>" +
          "</div>" +
        "</div>" +
      "</div>");
  });
  //Submit Button Functionality
  $("form").submit(function(event){
    event.preventDefault();
    //Create New Order Objects
    var name = $("#name").val();
    var total = 0;
    var newOrder = new Order (name, total);
    //Create New Pizza Objects
    $(".new-pizza").each(function() {
      var size = $(this).find("#select-size").val();
      var toppings = [];
      $($(this).find('input[name="toppings"]:checked')).each(function() {
        (toppings).push(this.value);
      });
      var newPizza = new Pizza(size, toppings);
      newOrder.orderPizzas.push(newPizza);
    });
    //Calculate and Display Price
    newOrder.calculateIndividualPizzaPrices();
    console.log(newOrder);
    debugger;

    $("#pizza-size").text(newPizza.pizzaSize);
    if (newPizza.pizzaToppings.length < 1) {
      $("#toppings").text("none selected");
    } else {
      $("#toppings").text((newPizza.pizzaToppings).join(", "));
    }
    $("#total-price").text(newPizza.pizzaPrice.toFixed(2));
    $("#display-price").show();
  });
});
