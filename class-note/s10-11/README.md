### 색션10: 제네렉
- 타입이 들어간 재사용이 높은 컴포넌트를 만들때 자주 활용되는 특징 or 문법

##### 제네릭 기본 문법
```
//함수 호출할때 파라미터 타입을 인자로 넘겨줄께
function logText<T>(text: T):T {
    console.log(text)
    return text
}
// 호출하는 시점에 타입을 넘겨주는 것 그게 제네릭
// 내가 스트링이라는 타입을 넘기겟다
logText<string>('하이');
```

##### 기존문법과 제네릭 차이 - 함수 중복 선언의 단점
```
function logText(text: string) {
  console.log(text);
  // spite은 문자열만 받을수 잇다
  text.split('').reverse().join('');
  return text;
}

function logNumber(num: number) {
  console.log(num);
  return num;
}
// => 이렇게 함수를 2개로 나눠도 문제는 없지만 코드상으로는 타입을 다르게 받기위해 중복해서 코드 비대성 증가, 가동성이 나뻐즘
```

##### 기존문법과 제네릭 차이 - 유니온 타입 선언방식 문제점
```
function logText(text: string | number) {
    // 유니온 타입으로 사용한 스트링이랑 넙버의 교집한만 자동완성이 보인다
    console.log(text);
  return text;
}

const a = logText('a');
// 에러가 뜬다 a의 추론은 스트링과 넘버로 되어잇기에
a.split('');
```

##### 예저코드
- example폴더 참고

##### 인터페이스에 제네릭을 선언하는 방법
```
// 나는 인터페이스를 Dropdown 정의하는데 제네릭으로 타입을 선언하는 시점에 타입을 추가적으로 넘겨서
interface Dropdown<T> {
   value
    selected
}
const obj: Dropdown<number> = { value: 'abc', selected: false };
```
##### 제네릭 타입 제한
```
// text: T[]) 제네릭으로 배열이 들어온다-> 제네릭 타입을 제한 할수 잇다
function logTextLength<T>(text: T[]): T[] {
  console.log(text.length);
  text.forEach(function (text) {
    console.log(text);
  });
  return text;
}
logTextLength<string>(['hi', 'abc']);
```

```
// 제네릭 타입 제한 2 - 정의된 타입 이용하기
interface LengthType {
    length: number;
}
// LengthType의 하위로 제네릭 (사용)들어간다
function logTextLength<T extends LengthType>(text: T): T {
    text.length;
    return text;
}
logTextLength(10);
logTextLength({ leng: 10 });

// 제네릭 타입 제한 3 - keyof
interface ShoppingItem {
    name: string;
    price: number;
    stock: number;
}
// ShoppingItem의 key만 받겟다 인자값으로 keyof사용시
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
    return itemOption;
}
// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');
getShoppingItemOption('name');
```