var degToRad = Math.PI / 180;

function CircularAnimation(scene, span, center, radius, startdegree, rotationDegree) {

  Animation.call(this, scene, span);

  if (center == null ||
      radius == null || radius <= 0 ||
      startdegree == null || rotationDegree == null
     ) {
    throw new Error('CircularAnimation expecting valid arguments');
  }

  this.center = center;
  this.radius = radius;
  this.startAngle = degToRad * startdegree;
  this.rotationAngle = degToRad * rotationDegree;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.update = function() {
};