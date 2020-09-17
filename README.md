# js-dict开发计划
 dict tool

## 新增字典表

```js

dict.addSheet({
    name: string, // 字典名称
    data: object | array, // 字典数据
    key?: string | array，// 在data是object时候无效，是array时候必填，作为唯一键名。key是array时，组合键作为唯一键
}): object 

// 返回一个字典object
{
 key: item,
 key: item,
 key: item,
 key: item,
}

```

## 获取字典表。

```js

dict.getSheet(name: string)

// 返回一个字典object
{
 key: item,
 key: item,
 key: item,
 key: item,
}

```


## 删除字典表。

```js

dict.delSheet(name: string)
// 返回true|false

```

## 判断字典表是否存在。

```js

dict.hasSheet(name: string)
// 返回true|false

```

## 获取字段值。

```js

dict.getItem(name: string, key: string | array)
// name表名称
// key表的键值
// 返回表内对应的key的值

//或者直接通过getSheet方法返回的object直接，object[key]取值

```


## 删除字段值。

```js

dict.delItem(name: string, key: string | array)
// name表名称
// key表的键值
// 返回true|false

```

## 判断字段值是否存在。

```js

dict.hasItem(name: string, key: string | array)
// 返回true|false

```
