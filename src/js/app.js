require('../css/main.css');
const Controller = require('./dashboard/Controller.js');
var $ = require("jquery");

const WHO = 'JS';
let greeter = (who) => `Hello from ${who}!`;
$("#app").html(greeter(WHO));
const crlt = new Controller($("#app"));
crlt.render();
