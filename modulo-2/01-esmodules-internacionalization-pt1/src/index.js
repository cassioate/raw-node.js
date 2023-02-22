import { TerminalController } from './controller/terminal-controller.js';
import { Person } from './person.js';

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminal = new TerminalController()
await terminal.initializeTerminal(DEFAULT_LANG)

const mainLoop = async () => {
  try {
    const answer = await terminal.question("Insert? ")
    if (answer === STOP_TERM) {
      terminal.closeTerminal()
      console.log('process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    await terminal.updateTable(person, DEFAULT_LANG)
    return mainLoop()
  } catch (error) {
    console.error("Error: " + error)
    return mainLoop()
  }
}

await mainLoop()



