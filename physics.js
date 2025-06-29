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
                    console.log(body.plugin.hp)
                    body.plugin.hp -= 1;
                }
                if (body.plugin.hp <= 0 || !body.plugin.hp === undefined || !body.plugin) {
                    World.remove(engine.world, body);
                    console.log(body.plugin.hp)

                    const bodySize = Math.max(body.bounds.max.x - body.bounds.min.x, body.bounds.max.y - body.bounds.min.y);
                    const iterations = Math.floor(Math.random() * 7) + 2;
                    for (let i = 0; i < iterations ; i++) {
                        const offsetX = (Math.random() - 0.3) * bodySize * 2
                        const offsetY = (Math.random() - 0.3) * bodySize * 2
                        const sides = Math.max(3,Math.floor(Math.random() * 10) + 3);
                        const radius = Math.max(5, bodySize * 0.25);
                        const color = body.render.fillStyle;
                        World.add(engine.world, Bodies.polygon(body.position.x + offsetX, body.position.y + offsetY, sides, radius, {render: {fillStyle: color}}));
                    }
                }
                damagedBodies.length = 0;
            }
        }
    });

    return { engine, render, World, Bodies };
}