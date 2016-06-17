//Business Logic
//Set Objects
function Order (name, total) {
  this.orderName = name;
  this.totalPrice = total;
  this.orderPizzas = [];
  this.deliveryAddress;
  this.deliveryTime;
}
function Pizza (size, toppings, price) {
  this.pizzaSize = size;
  this.pizzaToppings = toppings;
  this.pizzaPrice = price;
}
function Address (street, city, state) {
  this.deliveryStreet = street;
  this.deliveryCity = city;
  this.deliveryState = state;
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
Order.prototype.calculateIndividualPizzaPrices = function () {
  (this.orderPizzas).forEach(function(object){
    object.calculateSizePrice();
    object.addToppings();
  });
}
Order.prototype.calculateTotalPrice = function () {
  var totalPrice = 0;
  (this.orderPizzas).forEach(function(object){
    totalPrice += object.pizzaPrice;
  });
  return totalPrice;
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
              "<input type='checkbox' name='toppings' value='Pepperoni'>" +
              "Pepperoni" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='Sausage'>" +
              "Sausage" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='Bell Peppers'>" +
              "Bell Peppers" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='Olives'>" +
              "Olives" +
            "</label>" +
          "</div>" +
          "<div class='checkbox'>" +
            "<label>" +
              "<input type='checkbox' name='toppings' value='Extra Cheese'>" +
              "Extra Cheese" +
            "</label>" +
          "</div>" +
        "</div>" +
      "</div>");
  });
  //Submit Button Functionality
  $("form#order-form").submit(function(event){
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
    //Calculate Total Price
    newOrder.calculateIndividualPizzaPrices();
    var totalPrice = newOrder.calculateTotalPrice();
    newOrder.totalPrice = totalPrice;
    //Display Price and Order Confirmation
    $("#user-name").text(newOrder.orderName);
    newOrder.orderPizzas.forEach(function(pizza) {
      var findToppingsText = function (pizza) {
        if (pizza.pizzaToppings.length < 1) {
          return "None Selected"
        } else {
          return pizza.pizzaToppings.join(", ");
        }
      };
      var toppingsText = findToppingsText(pizza);
      $("ul#pizzas-ordered").append("<li>Pizza Size: " + pizza.pizzaSize + "<br>Extra Toppings: " + toppingsText + "</li>");
    });
    $("#total-price").text(totalPrice.toFixed(2));
    //Hide Form and Display Confimation Page
    $("#order-form-page").hide();
    $("#display-price").show();
    $("#add-delivery").show();
    //Submit Address Button Functionality
    $("#address-form").submit(function(event){
      event.preventDefault();
      //Set Variables
      var inputtedStreet = $("input#new-street").val();
      var inputtedCity = $("input#new-city").val();
      var inputtedState = $("input#new-state").val();
      var inputtedAddress = new Address (inputtedStreet, inputtedCity, inputtedState);
      var inputtedTime = $("input#new-delivery-time").val();
      //Update New Order Object
      newOrder.deliveryAddress = inputtedAddress;
      newOrder.deliveryTime = inputtedTime;
      //Update Confirmation with Address and Time
      $("#delivery-street").text(inputtedAddress.deliveryStreet);
      $("#delivery-city").text(inputtedAddress.deliveryCity);
      $("#delivery-state").text(inputtedAddress.deliveryState);
      $("#delivery-time").text(newOrder.deliveryTime);
      //Display Address and Delivery Time Confirmation
      $("#delivery-form").hide();
      $("#delivery-confirmation").show();
    });
  });
  $("#new-order").click(function() {
    //Reset Forms
    document.getElementById("order-form").reset();
    document.getElementById("address-form").reset();
    //Clear Appended Form Input Divs
    $(".new-pizza").not(":first-child").remove();
    //Clear Appended UL
    $("ul#pizzas-ordered").empty();
    //Hide and Show Divs
    $("#order-form-page").show();
    $("#display-price").hide();
    $("#delivery-confirmation").hide();
  });
  //Add Delivery Button Functionality
  $("#add-delivery").click(function(){
    $("#add-delivery").hide();
    $("#delivery-form").show();
  });
});
