//Business Logic
//Set Objects
function Order (name) {
  this.orderName = name;
  this.orderPizzas = [];
}

function Pizza (size, toppings, price) {
  this.pizzaSize = size;
  this.pizzaToppings = toppings;
  this.pizzaPrice = price;
}
//Set Prototypes
Pizza.prototype.calculateSizePrice = function () {
  if (this.pizzaSize === "small"){
    return this.pizzaPrice = 7;
  } else if (this.pizzaSize === "medium") {
    return this.pizzaPrice = 9;
  } else {
    return this.pizzaPrice = 11;
  }
}

Pizza.prototype.addToppings = function () {
  if (this.pizzaSize === "small") {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += .50;
    }
  } else if (this.pizzaSize === "medium") {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += .75;
    }
  } else {
    for (i=0; i<this.pizzaToppings.length; i++) {
      this.pizzaPrice += 1;
    }
  }
}

//User Interface Logic
$(function(){
  //Add Another Pizza Button Functionality
  $("#add-pizza").click(function() {
    $("#new-pizzas").append(
      "<div class='new-pizza'>" +
        "<div class='form-group'>" +
            "<label for='size'>Choose your pizza size:</label>" +
            "<div class='radio'>" +
            "<label>" +
              "<input type='radio' name='size' value='small' checked>" +
              "Small" +
            "</label>" +
          "</div>" +
          "<div class='radio'>" +
            "<label>" +
              "<input type='radio' name='size' value='medium'>" +
              "Medium" +
            "</label>" +
          "</div>" +
          "<div class='radio'>" +
            "<label>" +
              "<input type='radio' name='size' value='large'>" +
              "Large" +
            "</label>" +
          "</div>" +
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
    var newOrder = new Order (name);
    //Create New Pizza Objects
    $(".new-pizza").each(function() {
      var size = $(this).find("input:radio[name=size]:checked").val();
      var toppings = [];
      $($(this).find('input[name="toppings"]:checked')).each(function() {
        (toppings).push(this.value);
      });
      var newPizza = new Pizza(size, toppings);
      newOrder.orderPizzas.push(newPizza);
    });
    console.log(newOrder);
    debugger;
    //Calculate and Display Price
    newPizza.calculateSizePrice();
    newPizza.addToppings();
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
