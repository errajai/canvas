/**
 *    Ken Fyrstenberg Nilsen
 *    Abidas Software
*/
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    iw, ih;

ko.extenders.maxlength = function (target, maxlength) {
    var view = ko.computed({
        read: target,
        write: function (value) {
            if (value.length <= maxlength) {
                target(value);
            } else {
                view.notifySubscribers(target());
            }
        }
    });
    target.view = view;
    return target;
};

var VM = function(){
   var self = this;
   self.name= ko.observable("Name").extend({maxlength:10});
   self.num= ko.observable("10").extend({maxlength:2});

   self.name.subscribe(function(){
    doCanvas();
   });
   self.num.subscribe(function(){
    doCanvas();
   });

}

var vm = new VM();
// Activates knockout.js
ko.applyBindings(vm);

function doCanvas() {

    ctx.drawImage(img, 0, 0, iw / 2, ih / 2);
    ctx.font = "25pt Calibri";
    ctx.textAlign = "center"; 
    ctx.fillStyle = "white"; 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(vm.name(), iw/4, 120);
    ctx.fillText(vm.name(), iw/4, 120);

    ctx.font = "120pt Calibri";
    ctx.textAlign = "center"; 
    ctx.fillStyle = "white"; 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeText(vm.num(), iw/4, 270);
    ctx.fillText(vm.num(), iw/4, 270);
}
function move(e) {
    var pos = getMousePos(canvas, e);
    var x = pos.x;
    var y = pos.y;

    ctx.drawImage(img, -x, -y, iw, ih);
    ctx.font = "40pt Calibri";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;

    ctx.strokeText(vm.name(), iw/2-x, 240-y);
    ctx.fillText(vm.name(), iw/2-x, 240-y);

    ctx.font = "240pt Calibri";
    ctx.textAlign = "center"; 
    ctx.fillStyle = "white"; 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;      
    ctx.strokeText(vm.num(), iw/2-x, 540-y);
    ctx.fillText(vm.num(), iw/2-x, 540-y);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


/**
 * Init generals
 */


/**
 * Monkey patches
*/
// window.requestAnimationFrame = (function(){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           function( callback ){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();

// window.cancelAnimationFrame = (function () {
//     return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (timPtr) {
//         window.clearTimeout(timPtr);
//     };
// })();

/**
 * START
 */
var img = document.createElement('img');
img.onload = function() {
    iw = img.width;
    ih = img.height;
    canvas.width = (iw / 2 - 1.5)|0; //compensate for rounding errors
    canvas.height = (ih / 2 - 1.5)|0;
    doCanvas();
    canvas.addEventListener('mouseout', doCanvas, false);
    canvas.addEventListener('mousemove', move, false);
}
img.src = "tenue.jpg";

