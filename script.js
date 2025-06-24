var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false
    }
});

var damagedBodies = [];
Matter.Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        if (!pair.bodyA.isStatic || !pair.bodyB.isStatic) {
            damagedBodies.push(pair.bodyA);
            damagedBodies.push(pair.bodyB);
        }
    }
});

Matter.Events.on(engine, 'beforeUpdate', function() {
    if (damagedBodies.length > 0) {
        for (var i = 0; i < damagedBodies.length; i++) {
            var body = damagedBodies[i];

            if (body.plugin && body.plugin.hp !== undefined) {
                body.plugin.hp -= 1;
                console.log("boxA-HP: ", boxA.plugin.hp)
                console.log("boxB-HP: ", boxB.plugin.hp)

            }
            if (body.plugin.hp <= 0) {
                World.remove(engine.world, body);
                console.log("boxA-HP: ", boxA.plugin.hp)
                console.log("boxB-HP: ", boxB.plugin.hp)
            }
            damagedBodies.length = 0;
        }
    }
});

// example
var boxA = Bodies.rectangle(400, 375, 80, 80, {plugin: {hp: 2}});
var boxB = Bodies.rectangle(400, 0, 80, 80, {plugin: {hp: 2}});
var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true});
World.add(engine.world, [boxA, boxB, ground]);
Engine.run(engine);
Render.run(render);