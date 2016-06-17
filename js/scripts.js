//Business Logic
//Set Objects
function Pizza (size, toppings, price) {
  this.pizzaSize = size;
  this.pizzaToppings = toppings;
  this.pizzaPrice = price;
};
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
  $("form").submit(function(event){
    event.preventDefault();
    //Set Variables
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $('input[name="toppings"]:checked').each(function() {
      (toppings).push(this.value);
    });
    //Create New Object
    var newPizza = new Pizza (size, toppings);
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
