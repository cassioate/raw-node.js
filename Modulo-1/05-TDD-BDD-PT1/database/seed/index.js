import { Car } from "../../src/domain/models/car.js";
import { CarCategory } from "../../src/domain/models/carCategory.js";
import { Customer } from "../../src/domain/models/customer.js";

import {join} from 'path'
import faker from 'faker'

import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seederBaseFolder = join(__dirname, "../");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carId: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let i =0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  })
  carCategory.carId.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({min: 18, max: 50})
  })
  customers.push(customer)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('customers.json', customers)
  await write('carCategories.json', [carCategory])
})()