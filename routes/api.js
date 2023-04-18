'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();



  app.route("/api/convert").get((req, res) => {

    let input = req.query.input;
    console.log("input is: ", input);
    input = input.toLowerCase();
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let retString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    
      // We have an error string so let's return that
      if (initNum == "invalid number and unit" || initUnit == "invalid number and unit" || 
      (initNum == "invalid number"  && initUnit == "invalid unit")) {
        res.send("invalid number and unit");
      } else if (initNum == "invalid number") {
        res.send(initNum);
      } else if (initUnit == "invalid unit") {
        res.send(initUnit);
      } else {
      // Let's return a JSON as all seems well
      let resultJSON = {"initNum": initNum, 
      "initUnit": initUnit, 
      "returnNum": returnNum, 
      "returnUnit": returnUnit, 
      "string": retString };
      res.json(resultJSON);
    };
  });

};
