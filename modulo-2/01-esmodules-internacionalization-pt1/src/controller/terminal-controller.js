import DraftLog from "draftlog"
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import { Person } from '../person.js';
import { Repository } from "../repository/repository.js";

export class TerminalController {
  constructor(){
    this.print = {}
    this.repository = new Repository()
  }

  initializeTerminal = async (language) => {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    await this.initializeTable(language)
  }

  initializeTable = async (language) => {
    const data = await this.repository.findAll()
    const dataFormatted = data.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), dataFormatted)
    this.print = console.draft(table)
  }

  updateTable = async (item, language) => {
    await this.repository.save(item)
    await this.initializeTable(language)
  }

  question = async (msg = '') => {
    return new Promise(resolve => this.terminal.question(msg, resolve))
    // Verifciar como utilizar da forma abaixo, se é que é possivel
    // return Promise.resolve(this.terminal.question(msg, a => 'TTT: =>'+a))
  }

  closeTerminal = async () => {
    this.terminal.close()
  }

  getTableOptions = async () => {
    return {
      leftPad: 2,
      columns: [
        {field: "id", name: chalk.blue("ID")},
        {field: "vehicles", name: chalk.cyanBright("Vehicles")},
        {field: "kmTraveled", name: chalk.red("Km Traveled")},
        {field: "from", name: chalk.yellow("From")},
        {field: "to", name: chalk.green("To")}
      ]
    }
  }
}