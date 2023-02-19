import { Fibonacci } from "./fibonacci.js";
import sinon from 'sinon'
import assert from 'assert'
// Fibonacci: o proximo valor corresponde à soma dos dois anteriores
// dado 3
// 0,1,1
// dado 5
// 0,1,1,2,3
(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando as funcoes .next, for await e rest/spread

    // Forma com for await <<<< ISSO
    for await(const i of fibonacci.execute(3)) {}
    const expectedCallCount = 4
    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando as funcoes .next, for await e rest/spread

    // forma com rest/spread <<<< ISSO
    const [...results] = fibonacci.execute(5)
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 2
    // [2] input = 3, current = 2, next = 3
    // [3] input = 2, current = 3, next = 4
    // [4] input = 1, current = 4, next = 5
    // [5] input = 0 -> PAROU
    const expectedCallCount = 6
    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    // generators retornam iterators, (.next)
    // existem 3 formas de ler os dados
    // usando as funcoes .next, for await e rest/spread

    // forma com rest/spread <<<< ISSO
    const [...results] = fibonacci.execute(5)
    const expectedResult = [0, 1, 1, 2, 3]
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 2
    // [2] input = 3, current = 2, next = 3
    // [3] input = 2, current = 3, next = 4
    // [4] input = 1, current = 4, next = 5
    // [5] input = 0 -> PAROU
   const { args } = spy.getCall(2)
   const expectedParams = Object.values({
    input: 3,
    current: 1,
    next: 2
   })

   assert.deepStrictEqual(args, expectedParams)
   assert.deepStrictEqual(results, expectedResult)
  }
})()