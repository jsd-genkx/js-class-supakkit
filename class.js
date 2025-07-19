"use strict";
// =======================================================
// 🛠️ EXERCISE: PRODUCT CLASS
// =======================================================
// Follow each step and fill in the code where marked
// Test your work by running the test section at the bottom
// =======================================================

// ✅ STEP 1: Create a custom ValidationError class
// - It should extend Error
// - In constructor, call super(message) and set this.name = "ValidationError"
// ✏️ YOUR CODE HERE
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
// Testing
// let age = 15;
// try {
//   if (age < 18) throw new ValidationError("Must be at least 18 years old.");
//   else console.log("No error.");
// } catch (error) {
//   console.error(error.name);       // ValidationError
//   console.error(error.message);    // Must be at least 18 years old.
// }

// ✅ STEP 2: Create a Product class
// Requirements:
// - Private field: #price
// - constructor(name, price, manufacturedDate)
//     → call Product.validateName(name)
//     → set price using setter
//     → store manufacturedDate
// - getter and setter for price
//     → setter must throw ValidationError if price < 0
// - getInfo(): return "<name> costs $<price>"
// - applyDiscount(percent): subtract discount using Math.floor
// - getAge(): return days old since manufacturedDate
// - static validateName(name): throw ValidationError if name is empty or shorter than 2 characters
// ✏️ YOUR CODE HERE
class Product {
  #price = 0;

  constructor(name, price, manufacturedDate) {
    if ( this.constructor.validateName(name) === null ) this.name = name.trim().replace(/\s+/g, ' ');
    this.price = price;
    this.manufacturedDate = manufacturedDate;
  }
  get price() {
    return this.#price;
  }
  set price(value) {
    if ( isNumber(value) && value >= 0 ) this.#price = value;
    else throw new ValidationError("The price must be a number and cannot be negative.");
  }
  getInfo() {
    return `${this.name} costs \$${this.price}`;
  }
  applyDiscount(percent) {
    this.price -= Math.floor( this.price * percent * 0.01 );
  }
  getAge() {
    return Math.floor( (new Date() - this.manufacturedDate) / (1000 * 60 * 60 * 24) )
  }
  static validateName(name) {
    if ( typeof name === 'string' && name.trim().replace(/\s+/g, ' ').length > 2 ) return null;
    else throw new ValidationError("The name you entered is invalid.");
  }
}

// Function for validating a number 
const isNumber = num => typeof num === 'number' && !isNaN(num) ? true : false;

// ✅ STEP 3: Create subclasses LandProduct and SeaProduct
// - both extend Product
// - override getInfo() to prefix "[Land]" or "[Sea]" before the parent's getInfo()
// ✏️ YOUR CODE HERE
class LandProduct extends Product {
  getInfo() {
    return `[Land] ${super.getInfo()}`;
  }
}

class SeaProduct extends Product {
  getInfo() {
    return `[Sea] ${super.getInfo()}`;
  }
}

// ✅ STEP 4: Test your code
// After you finish implementing, uncomment the code below and run to see if it works.


try {
  const apple = new LandProduct("Apple", 100, new Date(2025, 6, 1));
  console.log(apple.getInfo()); // [Land] Apple costs $100
  apple.applyDiscount(10);
  console.log(apple.getInfo()); // [Land] Apple costs $90
  console.log("Days old:", apple.getAge());

  const tuna = new SeaProduct("Tuna", 200, new Date(2025, 6, 10));
  console.log('\n' + tuna.getInfo()); // [Sea] Tuna costs $200
  tuna.applyDiscount(5);
  console.log(tuna.getInfo()); // [Sea] Tuna costs $190
  console.log("Days old:", tuna.getAge());

  const sweetOrange = new LandProduct(" Sweet  Orange  ", 10, new Date(2025, 6, 15));
  console.log('\n' + sweetOrange.getInfo());
  console.log("Day old:", sweetOrange.getAge());

  // Uncomment below to test error
  // Product.validateName(""); // should throw ValidationError
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation failed:", err.message);
  } else {
    console.error("Error:", err.message);
  }
}


// ===============================
// ✅ BONUS (Optional)
// - Create DigitalProduct extends Product
//   → override getInfo() with "[Digital]" prefix
//   → override getAge() to log "Not applicable" and return null
// ===============================

class DigitalProduct extends Product {
  getInfo() {
    return `[Digital] ${super.getInfo()}`;
  }
  getAge() {
    console.log('Not applicable');
    return null;
  }
}

// Test Bonus code
 const ebook = new DigitalProduct("E-book", 10000, new Date(2025, 1, 15));
  console.log('\n' + ebook.getInfo());
  console.log("Day old:", ebook.getAge());