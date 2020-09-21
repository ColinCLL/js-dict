type objOrArr = object | any[];
type strOrArr = string | string[];

interface Sheet {
  name: string;
  data: objOrArr;
  key?: strOrArr;
}

function hasKey(key: strOrArr | undefined): boolean {
  if (Boolean(key)) {
    return true;
  } else {
    throw new Error('The key value is invalid');
    return false;
  }
}

class Dict {
  private dataBase: { [prop: string]: object } = {};
  // private changeable: boolean = true;
  // private persist: boolean = false;
  // private name: string = "";

  // 待代理set优化
  constructor(dataBase: { [prop: string]: object } = {}) {
    this.dataBase = dataBase;
  }

  public init(dataBase: { [prop: string]: object } = {}): object {
    this.dataBase = dataBase;
    return dataBase;
  }

  public getDataBase(): object {
    return this.dataBase;
  }

  public addSheet(sheetObj: Sheet): object {
    let { name, data, key } = sheetObj;

    let sheet = {};

    if (Array.isArray(data)) {
      hasKey(key);
      data.map(row => {
        let arr: string[] = [],
          keys;
        if (Array.isArray(key)) {
          key.map(d => {
            arr.push(row[d]);
          });
          keys = arr.join('_');
        } else {
          keys = key;
        }
        sheet[String(keys)] = row;
      });
    } else {
      sheet = data;
    }
    this.dataBase[name] = sheet;
    return sheet;
  }

  public getSheet(name: string): object {
    return this.dataBase[name];
  }

  public delSheet(name: string): boolean {
    if (Boolean(this.dataBase[name])) {
      delete this.dataBase[name];
      return true;
    } else {
      return false;
    }
  }

  public hasSheet(name: string) {
    return Boolean(this.dataBase[name]);
  }

  public getItem(name: string, key: string): any {
    let sheet = this.dataBase[name];
    return sheet[key];
  }

  public delItem(name: string, key: string): boolean {
    let sheet = this.dataBase[name];

    if (key in sheet) {
      delete this.dataBase[name][key];
      return true;
    } else {
      return false;
    }
  }

  public hasItem(name: string, key: string) {
    let sheet = this.dataBase[name];
    return key in sheet;
  }
}

let globalDict = new Dict();

export default Dict;

export { globalDict, Dict };