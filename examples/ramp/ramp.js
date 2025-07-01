import { initPhysics } from '../../physics.js';

const { engine, render, World, Bodies } = initPhysics();

const leftRamp = Bodies.rectangle(200, 350, 1000, 20, {
    isStatic: true,
    angle: 0.3,
    render: { fillStyle: '#2E8B57' }
});

const rightRamp = Bodies.rectangle(600, 350, 1000, 20, {
    isStatic: true,
    angle: -0.3,
    render: { fillStyle: '#2E8B57' }
});

const leftBall = Bodies.circle(50, 100, 30, {
    plugin: { hp: 1, force: 1, name: 'LeftBall' },
    render: { fillStyle: '#FF5722' },
    friction: 0.001,
    restitution: 0.3
});

const rightBall = Bodies.circle(750, 100, 30, {
    plugin: { hp: 1, force: 1, name: 'RightBall' },
    render: { fillStyle: '#2196F3' },
    friction: 0.001,
    restitution: 0.3
});

World.add(engine.world, [
    leftRamp,
    rightRamp,
    leftBall,
    rightBall,

    Bodies.rectangle(400, 0, 800, 10, { isStatic: true }),
    Bodies.rectangle(400, 400, 800, 10, { isStatic: true }),
    Bodies.rectangle(0, 200, 10, 400, { isStatic: true }),
    Bodies.rectangle(800, 200, 10, 400, { isStatic: true })
]);

Matter.Engine.run(engine);
Matter.Render.run(render);