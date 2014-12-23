var box2d = {
	b2Vec2 : Box2D.Common.Math.b2Vec2,
   b2BodyDef : Box2D.Dynamics.b2BodyDef,
   b2Body : Box2D.Dynamics.b2Body,
   b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
   b2Fixture : Box2D.Dynamics.b2Fixture,
   b2World : Box2D.Dynamics.b2World,
   b2MassData : Box2D.Collision.Shapes.b2MassData,
   b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
   b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
   b2DebugDraw : Box2D.Dynamics.b2DebugDraw
}

var scale = 30;
var stage, world, debug;
var count = 0;

function init() {

	stage = new createjs.Stage(document.getElementById("canvas"));

	debug = new createjs.Stage(document.getElementById("debug"));

	setupPhysics();

	stage.on('stagemousemove', function(e){
		var b = new Ball(e, Math.random()*30);
		stage.addChild(b.view);
	});

	createjs.Ticker.addEventListener('tick', tick);
	createjs.Ticker.setFPS(50);
	createjs.Ticker.userRAF = true;
}

var num = Math.floor(Math.random()*2) + 1;
num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

function setupPhysics () {
	world = new box2d.b2World(new box2d.b2Vec2(num, num), true);

	// create floor
	// var fixDef = new box2d.b2FixtureDef();
	// fixDef.density = 1;
	// fixDef.friction = 0.5;
	// var bodyDef = new box2d.b2BodyDef();
	// bodyDef.type = box2d.b2Body.b2_staticBody;
	// bodyDef.position.x = 400 / scale;
	// bodyDef.position.y = 600 / scale;
	// fixDef.shape = new box2d.b2PolygonShape();
	// fixDef.shape.SetAsBox(400 / scale, 20 / scale);
	// world.CreateBody(bodyDef).CreateFixture(fixDef);

	// setup debug
	var debugDraw = new box2d.b2DebugDraw();
	var elem = debug.canvas.getContext('2d');
	debugDraw.SetSprite(elem);
	debugDraw.SetFillAlpha(1);
	debugDraw.SetLineThickness(0);
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit)
	world.SetDebugDraw(debugDraw);
}

function tick () {
	stage.update();
	world.DrawDebugData();
	world.Step(1/60, 10, 10);
	world.ClearForces();
}