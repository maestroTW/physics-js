import { initPhysics } from '../physics.js';

const { engine, render, World, Bodies } = initPhysics();

// Примеры объектов
const boxA = Bodies.rectangle(400, 375, 80, 80, { plugin: { hp: 2 } });
const boxB = Bodies.rectangle(400, 0, 80, 80, { plugin: { hp: 2 } });
const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

World.add(engine.world, [boxA, boxB, ground]);

// Запуск
Matter.Engine.run(engine);
Matter.Render.run(render);