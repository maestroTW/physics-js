export function initPhysics() {
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
                    console.log(body.plugin.hp)

                }
                if (body.plugin.hp <= 0 || !body.plugin.hp === undefined || !body.plugin) {
                    World.remove(engine.world, body);
                    console.log(body.plugin.hp)
                }
                damagedBodies.length = 0;
            }
        }
    });

    return { engine, render, World, Bodies };
}
