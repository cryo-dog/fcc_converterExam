const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    let rounder = 100000;

    test('ConvertHandler should correctly read a whole number input', function() {
      assert.equal(convertHandler.getNum('32L'), 32);
    });
    
    test('ConvertHandler should correctly read a decimal number input', function() {
      assert.equal(convertHandler.getNum('3.2mi'), 3.2);
    });
  
    test('ConvertHandler should correctly read a fractional input', function() {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test("convertHandler should correctly read a fractional input with a decimal.", function() {
      assert.equal(convertHandler.getNum('1/2.5km'),0.4);
    });
    
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function() {
      assert.equal(convertHandler.getNum("3/2/3mi"), "invalid number" );
    });
    
    
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function() {
      assert.equal(convertHandler.getNum("mi"), 1 );
    });
    
    
    test("convertHandler should correctly read each valid input unit.", function() {
      const validUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
      validUnits.forEach(function (unit) {
        let input = "" + Math.random() + unit;
        assert.equal(convertHandler.getUnit(input), unit);
      })
    });
    
    
    test("convertHandler should correctly return an error for an invalid input unit.", function() {
      assert.equal(convertHandler.getUnit("3mis"), "invalid unit" );
    });

    test("convertHandler should return the correct return unit for each valid input unit.", function() {
      const validUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
      const validReturnUnits = ["L", "gal", "kg", "lbs", "km", "mi"];
      validUnits.forEach(function (unit, index) {
        let input = "" + Math.random() + unit;
        assert.equal(convertHandler.getReturnUnit(unit), validReturnUnits[index]);
      });
    });
    

    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function() {
      const validUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
      const validReturnUnits = ["gallons", "liters", "pounds", "kilograms", "miles", "kilometers"];
      validUnits.forEach(function (unit, index) {
        let input = "" + Math.random() + unit;
        assert.equal(convertHandler.spellOutUnit(validUnits[index]), validReturnUnits[index]);
      });
    });
    

    
    test("convertHandler should correctly convert gal to L.", function() {
      assert.equal(convertHandler.convert("1", "gal"), 3.78541 );
    });    

    test("convertHandler should correctly convert L to gal.", function() {
      assert.equal(convertHandler.convert("1", "l"), Math.round(1/3.78541*rounder)/rounder);
    });
        
    test("convertHandler should correctly convert mi to km.", function() {
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });

    test("convertHandler should correctly convert km to mi.", function() {
      assert.equal(convertHandler.convert(1, "km"), Math.round(1/1.60934*rounder)/rounder);
    }); 
        
    test("convertHandler should correctly convert lbs to kg.", function() {
      assert.equal(convertHandler.convert(1,"lbs"), 0.45359 );
    });
        
    test("convertHandler should correctly convert kg to lbs.", function() {
      assert.equal(convertHandler.convert(1,"kg"), Math.round(1/0.453592*rounder)/rounder );
    });
        
    
  });