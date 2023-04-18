function ConvertHandler() {
  
  const regexUnit = /[a-zA-Z]+$/;
  const regexFractionExtracter = /^(\d+(\.\d+)?)\/(\d+(\.\d+)?)$/;
  const arrayUnits = ["l", "kg", "km", "gal", "lbs", "mi"];
  const getNumConsoles = false;
  const getUnitConsoles = false;
  const rounder = 100000;

  this.solveFractions = function(fracString) {
      //
      fracString = fracString.split("/");
      let fracDiv = fracString[0]/fracString[1];
      let retur = Math.round(rounder * fracDiv)/rounder;
      return retur;
  };

  this.getNum = function(input) {
    let result;
    let unit = input.match(regexUnit)[0];
    let num = input.replace(unit,"");
    unit = unit.toLowerCase();

    if (num == "") num = 1;

    getNumConsoles ? console.log("unit is", unit) : null;       
    getNumConsoles ? console.log("num is", num) : null;     


    if (parseFloat(num) == num) {
      // If it does transform into a float
      getNumConsoles ? console.log("->Parse float works") : null;
      return parseFloat(num);

    } else if (regexFractionExtracter.test(num)) {
      result = num.match(regexFractionExtracter)[0];
      getNumConsoles ? console.log("->Fraction extract works") : null;
      
      return this.solveFractions(result);

    } else if (!arrayUnits.includes(unit)) {
      // We have to catch the case where both are broken...
      getNumConsoles ? console.log("arrayUnits include is: ", arrayUnits.includes(unit)) : null;
      getNumConsoles ? console.log("->Unit and number are broken") : null;

      return "invalid number and unit"
    } else {
      getNumConsoles ? console.log("->Just number is broken") : null;
    return "invalid number";
    };
  };
  
  this.getUnit = function(input) {
    let result;
    let unit = input.match(regexUnit)[0];
    let num = input.replace(unit,"");
    unit = unit.toLowerCase();
    if (num == "") num = 1;

    getUnitConsoles ? console.log("unit is: ", unit) : null;  
    getUnitConsoles ? console.log("num is: ", num) : null; 

    if (arrayUnits.includes(unit)) {
      unit == "l" ? unit = "L" : null;
      return unit;
    } else if (num == parseFloat(num)) {
      return "invalid unit";
    } else {
      return "invalid number and unit";
    };

  };
  
  this.getReturnUnit = function(initUnit) {
      let result;
      initUnit = initUnit.toLowerCase();
      switch (initUnit) {
        case "gal":
            result = "L";
            break;
        case "lbs":
            result = "kg";
            break;
        case "mi":
            result = "km";
            break;
        case "l":
            result = "gal";
            break;
        case "kg":
            result = "lbs";
            break;
        case "km":
            result = "mi";
            break;
        default:
            result = "invalid unit";
            break;
      };
      return result;
  };

  this.spellOutUnit = function(unit) {
      let result;
      unit = unit.toLowerCase();
      switch (unit) {
        case "gal":
            result = "gallons";
            break;
        case "lbs":
            result = "pounds";
            break;
        case "mi":
            result = "miles";
            break;
        case "l":
            result = "liters";
            break;
        case "kg":
            result = "kilograms";
            break;
        case "km":
            result = "kilometers";
            break;
        default:
            result = "invalid unit";
            break;
    };
      return result;
  };
  
  this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      let result;
      initUnit = initUnit.toLowerCase();
      initNum = parseFloat(initNum);
      switch (initUnit) {
        case "gal":
          result = initNum * galToL;
          break;
        case "lbs":
          result = initNum * lbsToKg;
          break;
        case "mi":
          result = initNum * miToKm;
          break;
        case "l":
          result = initNum / galToL;
          break;
        case "kg":
          result = initNum / lbsToKg;
          break;
        case "km":
          result = initNum / miToKm;
          break;
        default:
          result = "invalid unit";
          break;
      };
      let returner;
      typeof(result) == "string" ? returner = result : returner = Math.round(result * rounder) / rounder;
      return returner;
    };
  
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      let result;
    
      if (initUnit == "invalid unit") {
        // invalid unit case
        return "invalid unit";
          
      } else if (initNum == "invalid number") {
          return "invalid number";
      } else if (initNum == "invalid number and unit" || initUnit == "invalid number and unit" ) {
          return "invalid number and unit";
      } else {
      // Example result: '3.1 miles converts to 4.98895 kilometers'
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
      return result;  
      }
    
      
    };
  
};


module.exports = ConvertHandler;
