//  setup
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
//  initialization damagedBodies
    var damagedBodies = [];
    Matter.Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            if ((!pair.bodyA.isStatic || !pair.bodyB.isStatic) &&
                Math.max(pair.bodyA.velocity.x, pair.bodyA.velocity.y, pair.bodyB.velocity.x, pair.bodyB.velocity.y) > 1.2) {
                damagedBodies.push(pair.bodyA);
                damagedBodies.push(pair.bodyB);
            }
        }
    });

    Matter.Events.on(engine, 'beforeUpdate', function() {
        if (damagedBodies.length > 0) {
            for (var i = 0; i < damagedBodies.length; i++)
            {
                var body = damagedBodies[i];
                //  damage
                if (body.plugin && body.plugin.hp !== undefined && body.plugin.hp >= 1) {
                    body.plugin.hp -= 1;
                    console.log(body.plugin.name,'velocity', body.velocity.y)
                    console.log(body.plugin.name,'hp', body.plugin.hp)

                }
                // remove
                if (body.plugin.hp <= 0 || !body.plugin.hp === undefined || !body.plugin)
                {
                    World.remove(engine.world, body);
                    console.log(body.plugin.name,'velocity', body.velocity.y)
                    console.log(body.plugin.name, 'removed')

                    const bodySize = Math.max(body.bounds.max.x - body.bounds.min.x, body.bounds.max.y - body.bounds.min.y);
                    const iterations = Math.floor(Math.random() * 3) + 2; //    2 to 4
                    for (let i = 0; i < iterations; i++)
                    {
                        const sides = Math.max(3, Math.floor(Math.random() * 10) + 3);
                        const color = body.render.fillStyle;
                        const radius = Math.max(5, bodySize * (0.1 + Math.random() * 0.15)); // part max size 0.25
                        World.add(engine.world, Bodies.polygon(body.position.x, body.position.y, sides, radius, {render: {fillStyle: color}}));
                    }
                }
                damagedBodies.length = 0;
            }
        }
    });

    return { engine, render, World, Bodies };
}