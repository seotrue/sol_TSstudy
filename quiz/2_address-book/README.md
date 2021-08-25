### 전화번호 실습
- 제네릭의 경우 api 호출 함수 사용시 많이 사용되는데
> Generic type 'Promise<T>' requires 1 type argument(s)
```
// 리턴값을 TS가 추론을 할수 잇는데
function fetchItems() {
  let items = ['a', 'b', 'c'];
  return items;
}
let result = fetchItems();
console.log(result);
// Promise 리턴하면 Promise<unknow>추론 그렇기때문에 제너릭으로 넣어진다 리턴값으로
function fetchItems(): Promise<string[]> {
  let items: string[] = ['a', 'b', 'c'];
  return new Promise(function (resolve) {
    resolve(items);
  });
}
```