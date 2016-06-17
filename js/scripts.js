//Business Logic
//Set Objects
function Pizza (size, toppings, price) {
  this.pizzaSize = size;
  this.pizzaToppings = toppings;
  this.pizzaPrice = price;
};
//Set Prototypes
Pizza.prototype.calculatePrice = function () {
  if (this.pizzaSize === "small"){
    return this.pizzaPrice = 7;
  } else if (this.pizzaSize === "medium") {
    return this.pizzaPrice = 9;
  } else {
    return this.pizzaPrice = 11;
  }
}
