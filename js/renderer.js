//responsible for rendering a single shape on a canvas
//the only elements responsible for rendering the shapes are the descriptors themselves so the rest can be disregarded

var fps, fpsInterval, startTime, now, then, elapsed, request_id;
var canvas, ctx, canvas_width, canvas_height, canvas_center, cursor_x, cursor_y;
var progress = 0;
var current_descriptors;

// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    canvas = document.getElementById('figure_renderer');
    ctx = canvas.getContext('2d');
    canvas_width = canvas.width/2;
    canvas_height = canvas.height/2;
    canvas_center = [canvas.width/2, canvas.height/2];
    step_size = Math.min(canvas_width, canvas_height)/current_descriptors.length;
    animate();
}

function setDescriptors(arr_of_descriptors) {
  if (request_id) {
    cancelAnimationFrame(request_id);
    request_id = null;
  }
  current_descriptors = arr_of_descriptors;
  startAnimating(60);
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  request_id = requestAnimationFrame(animate);

  // calc elapsed time since last loop

  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    progress = (progress+1)%301;
    // Put your drawing code here
    //for each descriptor:
    //create all lines. Size and position are based on the index. Max size is the smallest of the sides of the canvas
    //caveat is that the shape of index 1 will only appear once and the rest appear twice

    for (var i = 0; i < current_descriptors.length; i++) { //HAHA
      var y_perc = (i+1)/current_descriptors.length;
      createRing(y_perc, Math.min(canvas_width, canvas_height)-step_size*i, current_descriptors[i].edge_count, current_descriptors[i].color);
    }
  }
}

function createRing(y_percentage, radius, side_count, color){
  for (var i=0; i<side_count; i++){
    var step = 1/side_count;
    ctx.beginPath();
    var _3d_point1 = polar([0,0,canvas_height/2*y_percentage], radius/2, Math.PI/2, 2*Math.PI*step*i);
    var _3d_point2 = polar([0,0,canvas_height/2*y_percentage], radius/2, Math.PI/2, 2*Math.PI*step*(i+1));
    _3d_point1 = rotate_around_x(_3d_point1, (progress/300)*2*Math.PI);
    _3d_point2 = rotate_around_x(_3d_point2, (progress/300)*2*Math.PI);
    _3d_point1 = rotate_around_z(_3d_point1, (progress/300)*2*Math.PI);
    _3d_point2 = rotate_around_z(_3d_point2, (progress/300)*2*Math.PI);
    ctx.moveTo(canvas_width+_3d_point1[0], canvas_height+_3d_point1[1]);
    ctx.lineTo(canvas_width+_3d_point2[0], canvas_height+_3d_point2[1]);
    ctx.strokeStyle = '#'+color;
    ctx.stroke();

    ctx.beginPath();
    var _3d_point1 = polar([0,0,-canvas_height/2*y_percentage], radius/2, Math.PI/2, 2*Math.PI*step*i);
    var _3d_point2 = polar([0,0,-canvas_height/2*y_percentage], radius/2, Math.PI/2, 2*Math.PI*step*(i+1));
    _3d_point1 = rotate_around_x(_3d_point1, (progress/300)*2*Math.PI);
    _3d_point2 = rotate_around_x(_3d_point2, (progress/300)*2*Math.PI);
    _3d_point1 = rotate_around_z(_3d_point1, (progress/300)*2*Math.PI);
    _3d_point2 = rotate_around_z(_3d_point2, (progress/300)*2*Math.PI);
    ctx.moveTo(canvas_width+_3d_point1[0], canvas_height+_3d_point1[1]);
    ctx.lineTo(canvas_width+_3d_point2[0], canvas_height+_3d_point2[1]);
    ctx.strokeStyle = '#'+color;
    ctx.stroke();
  }
}

function polar(base, radius, polar, alpha)
{
  return [
    base[0] + radius * Math.sin(polar) * Math.cos(alpha),
    base[1] + radius * Math.sin(polar) * Math.sin(alpha),
    base[2] + radius * Math.cos(polar)
  ];
}

function rotate_around_x(vector, angle)
{
  return [
    vector[0],
    vector[1]*Math.cos(angle) - vector[2]*Math.sin(angle),
    vector[1]*Math.sin(angle) + vector[2]*Math.cos(angle)
  ];
}

function rotate_around_y(vector, angle)
{
  return [
    vector[0]*Math.cos(angle) + vector[2]*Math.sin(angle),
    vector[1],
    -vector[0]*Math.sin(angle) + vector[2]*Math.cos(angle)
  ];
}

function rotate_around_z(vector, angle)
{
  return [
      vector[0]*Math.cos(angle) - vector[1]*Math.sin(angle),
      vector[0]*Math.sin(angle) + vector[1]*Math.cos(angle),
      vector[2]
  ];
}
