export class BaseRepository {
  constructor({file}){
    this.file = file
  }

  find = async (itemId) => {
    const content = JSON.parse(await readFile(this.file))
    if(!itemId) return content 

    return content.find(({id}) => id === itemId)
  }
}