(function(window) {

	function Ball(e, size) {
		this.view = new createjs.Bitmap();
		this.view.regX = this.view.regY = 50;

		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = .5;
		fixDef.friction = .8;
		fixDef.restitution = 1;
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = e.rawX / scale;
		bodyDef.position.y = e.rawY / scale;
		fixDef.shape = new box2d.b2CircleShape(size / scale);
		this.view.body = world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixDef);
		this.view.onTick = tick;
	}

	function tick(e){
		this.x = this.body.GetPosition().x * scale;
		this.y = this.body.GetPosition().y * scale;
		this.rotation = this.body.GetAngle() * (180/Math.PI);
	}

	window.Ball = Ball;

})(window);