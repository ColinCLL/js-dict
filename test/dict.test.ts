import { globalDict, Dict } from '../src/index';

describe('test timemark', () => {
  var db = {
    key: {
      hi: '1',
      hellow: '2',
    },
  };

  it('test init, ept arg', () => {
    let dictDemo = new Dict();
    let dict = dictDemo.getDataBase();
    expect(dict).toEqual({});
  });

  it('test getDataBase ', () => {
    globalDict.init({
      dataBase: db,
      changeable: true,
    });

    let data = globalDict.getDataBase();
    expect(data).toEqual({
      key: {
        hi: '1',
        hellow: '2',
      },
    });
  });

  it('test not changeable new Data', () => {
    let dict = globalDict.init({
      dataBase: db,
      changeable: false,
    });

    expect(() => {
      dict['key'] = {
        hi: '2',
        hellow: '3',
      };
    }).toThrowError('Dict is not changeable.');
  });

  it('test getDataBase ', () => {
    let data = globalDict.getDataBase();
    expect(data).toEqual({
      key: {
        hi: '1',
        hellow: '2',
      },
    });
  });

  it('test getDataBase data is not changeable', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let dict = globalDict.getDataBase();
    expect(() => {
      dict['key'] = {
        hi: '2',
        hellow: '3',
      };
    }).toThrowError('Dict is not changeable.');
  });

  it('test addSheet data is not changeable, data is object', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    globalDict.addSheet({
      name: 'sheet',
      data: {
        '1': 'apple',
        '2': 'banana',
      },
    });
    let dict = globalDict.getDataBase();
    expect(dict).toEqual({
      key: {
        hi: '1',
        hellow: '2',
      },
      sheet: {
        '1': 'apple',
        '2': 'banana',
      },
    });
  });

  it('test addSheet data is not changeable, data is array', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    globalDict.addSheet({
      name: 'sheet',
      data: [
        {
          id: '1',
          price: 0.5,
          name: 'apple',
        },
        {
          id: '2',
          price: 1,
          name: 'banana',
        },
      ],
      key: 'id',
    });
    let dict = globalDict.getDataBase();
    expect(dict).toEqual({
      key: {
        hi: '1',
        hellow: '2',
      },
      sheet: {
        '1': { id: '1', price: 0.5, name: 'apple' },
        '2': { id: '2', price: 1, name: 'banana' },
      },
    });
  });

  it('test addSheet data is not changeable, data is array and key is array', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    globalDict.addSheet({
      name: 'sheet',
      data: [
        {
          id: '1',
          price: 0.5,
          name: 'apple',
        },
        {
          id: '2',
          price: 1,
          name: 'banana',
        },
      ],
      key: ['id', 'name'],
    });
    let dict = globalDict.getDataBase();
    expect(dict).toEqual({
      key: {
        hi: '1',
        hellow: '2',
      },
      sheet: {
        '1_apple': { id: '1', price: 0.5, name: 'apple' },
        '2_banana': { id: '2', price: 1, name: 'banana' },
      },
    });
  });

  it('test delSheet', () => {
    globalDict.init({
      dataBase: {
        key: {
          hi: '1',
          hellow: '2',
        },
        sheet: {
          '1_apple': { id: '1', price: 0.5, name: 'apple' },
          '2_banana': { id: '2', price: 1, name: 'banana' },
        },
      },
      changeable: false,
    });
    globalDict.delSheet('key');
    let dict = globalDict.getDataBase();
    expect(dict).toEqual({
      sheet: {
        '1_apple': { id: '1', price: 0.5, name: 'apple' },
        '2_banana': { id: '2', price: 1, name: 'banana' },
      },
    });
  });

  it('test hasSheet, true', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let falg = globalDict.hasSheet('key');
    expect(falg).toEqual(true);
  });

  it('test hasSheet, false', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let falg = globalDict.hasSheet('nothing');
    expect(falg).toEqual(false);
  });

  it('test getItem ', () => {
    let dict = globalDict.init({
      dataBase: db,
      changeable: false,
    });
    expect(dict['key'].hi).toEqual('1');
  });

  it('test getItem by function', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let item = globalDict.getItem('key', 'hi');
    expect(item).toEqual('1');
  });

  it('test delItem', () => {
    let dict = globalDict.init({
      dataBase: {
        key: {
          hi: '1',
          hellow: '2',
        },
      },
      changeable: false,
    });
    globalDict.delItem('key', 'hi');
    expect(dict['key'].hi).toEqual(undefined);
  });

  it('test hasItem, true', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let flag = globalDict.hasItem('key', 'hi');
    expect(flag).toEqual(true);
  });

  it('test hasItem, false', () => {
    globalDict.init({
      dataBase: db,
      changeable: false,
    });
    let flag = globalDict.hasItem('key', 'hii');
    expect(flag).toEqual(false);
  });
});
