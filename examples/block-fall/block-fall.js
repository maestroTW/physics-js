import { initPhysics } from '../../physics.js';

const { engine, render, World, Bodies } = initPhysics();

// Примеры объектов
const boxB = Bodies.rectangle(400, 0, 80, 80, {render: {fillStyle: '#B365D4'}, plugin: {hp: 1, name: 'BoxA'}});
const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

World.add(engine.world, [boxB, ground]);

// Запуск
Matter.Engine.run(engine);
Matter.Render.run(render);