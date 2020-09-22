type objOrArr = object | any[];
type strOrArr = string | string[];

interface Sheet {
  name: string;
  data: objOrArr;
  key?: strOrArr;
}

interface Init {
  dataBase: Record<string, object>;
  changeable?: boolean; //是否允许外部改变内部
  persist?: boolean;
  name?: string;
}

function hasKey(key: strOrArr | undefined): boolean {
  if (key !== undefined) {
    return true;
  } else {
    throw new Error('The key value is invalid');
    return false;
  }
}

class Dict {
  private dataBase: any = {};
  private changeable: boolean = false; //是否允许外部改变内部
  // private persist: boolean = true;
  // private name:string = "";
  private changeFlag = false; // 是否进行内部改变

  // 待代理set优化
  constructor(option?: Init) {
    // if (option !== undefined) {
    // }
    this.init(option);
  }

  public init(option?: Init): object {
    let def: Init = {
      dataBase: {},
      changeable: false,
      persist: true,
      name: '',
    };
    Object.assign(this, def, option);
    this.dataBase = this.watch(this.dataBase);
    return this.dataBase;
  }

  public getDataBase(): object {
    return this.dataBase;
  }

  public watch(obj: object | any[]) {
    return new Proxy(obj, {
      get: (target, key) => {
        return target[key];
      },
      set: (target, key, value) => {
        let falg = this.changeable || this.changeFlag;
        if (falg) {
          target[key] = value;
        } else {
          throw new Error('Dict is not changeable.');
        }

        this.changeFlag = false;
        return falg;
      },
    });
  }

  public addSheet(sheetObj: Sheet): object {
    let { name, data, key } = sheetObj;
    let sheet = {};

    this.changeFlag = true;
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
          keys = row[String(key)];
        }
        sheet[keys] = row;
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
    this.changeFlag = true;
    if (Boolean(this.dataBase[name])) {
      delete this.dataBase[name];
      return true;
    } else {
      return false;
    }
  }

  public hasSheet(name: string) {
    return name in this.dataBase;
  }

  public getItem(name: string, key: string): any {
    let sheet = this.dataBase[name];
    return sheet[key];
  }

  public delItem(name: string, key: string): boolean {
    this.changeFlag = true;
    let sheet = this.dataBase[name];

    if (key in sheet) {
      delete this.dataBase[name][key];
      return true;
    } else {
      return false;
    }
  }

  public hasItem(name: string, key: string): boolean {
    let sheet = this.dataBase[name];
    return key in sheet;
  }
}

//
let globalDict = new Dict();

export default Dict;

export { globalDict, Dict };
