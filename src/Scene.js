function Scene() {
  CGFscene.call(this);
}

Scene.prototype = Object.create(CGFscene.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.init = function(application) {
  CGFscene.prototype.init.call(this, application);

  this.initCameras();

  this.initLights();

  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

  this.axis = new CGFaxis(this);
};

Scene.prototype.initLights = function() {

  this.shader.bind();

  this.lights[0].setPosition(2, 3, 3, 1);
  this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
  this.lights[0].update();

  this.shader.unbind();
};

Scene.prototype.initCameras = function() {
  this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

Scene.prototype.setDefaultAppearance = function() {
  this.setAmbient(0.2, 0.4, 0.8, 1.0);
  this.setDiffuse(0.2, 0.4, 0.8, 1.0);
  this.setSpecular(0.2, 0.4, 0.8, 1.0);
  this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
Scene.prototype.onGraphLoaded = function() {
  //DEBUG
  console.log(this.graph);

  this.gl.clearColor(this.graph.illumination.background.r, this.graph.illumination.background.g, this.graph.illumination
    .background.b, this.graph.illumination.background.a);
  this.lights[0].setVisible(true);
  this.lights[0].enable();
};

Scene.prototype.display = function() {
  // ---- BEGIN Background, camera and axis setup
  this.shader.bind();

  // Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  // Initialize Model-View matrix as identity (no transformation
  this.updateProjectionMatrix();
  this.loadIdentity();

  // Apply transformations corresponding to the camera position relative to the origin
  this.applyViewMatrix();

  // Draw axis
  this.axis.display();

  this.setDefaultAppearance();

  // ---- END Background, camera and axis setup

  // it is important that things depending on the proper loading of the graph
  // only get executed after the graph has loaded correctly.
  // This is one possible way to do it
  if (this.graph.isLoaded) {
    this.lights[0].update();
    //var myRect = new Rectangle(this, 0, 0,[0,10],[10,0]);
    //myRect.display();
  }

  this.shader.unbind();
};
