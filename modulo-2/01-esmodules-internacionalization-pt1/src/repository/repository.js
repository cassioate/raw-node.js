
import { writeFile, readFile } from "fs/promises";
import path, { join } from "path";
import { fileURLToPath } from "url";

// posso usar essa forma
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseFolder = join(__dirname, "../../");
const databaseFileUrl = join(baseFolder, 'database.json')


export class Repository {
  save = async (newItem) => {
    // OU posso usar essa forma
    // const { pathName: databaseFile } = new URL('../../database.json', import.meta.url)
    // const currentData = await readFile(databaseFile)
    const currentData = JSON.parse(await readFile(databaseFileUrl))
    currentData.push(newItem)
    await writeFile(databaseFileUrl, JSON.stringify(currentData))
  }

  findAll = async () => {
    const currentData = JSON.parse(await readFile(databaseFileUrl))
    return currentData
  }
}
