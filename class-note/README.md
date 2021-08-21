### 색션3
##### 변수 기본 타입
- JS 문자열 선언  
```let str  = 'hi';```

- TS 문자열 선언  
```let str2: string = 'hello';```

- TS 숫자  
```let num: number = 10;```

- TS 배열  
```
let arr: Array<number> =  [1,2,3,0];  
let heroes: Array<string> = ['Capt', 'Thor', 'Hulk'];
```

- 리터럴 방식  
```let items: number[] = [1,2,3];```

-  TS 튜플(배열에 각각의 인덱스에 특정 타입을 지정)
```
let address: [string, number] = ['gannam', 10];
```

-  TS 객체
```
let obj: object ={};
// let person: object = {
//     name:'capt',
//     age: '10'
// }
// 구체적으로 프로퍼티의 타입까지 지정할수 잇다
let person: { name: string, age: number } = {
    name:'thor',
    age:1000
};
```

- TS 진위값
```
let show: boolean = true;
```

##### 함수
- 파라미터, 반환값 타입을 정의 해준다
```
 function sum(a: number, b: number): number {
    return a + b
 }
```

- JS의 유연함과는 다르게 추가 인자를 받지 않고 잡아준다.
```
sum(10, 20, 30, 40); // 30, 40에 err
```

- 옵셔널 파라미터: 인자가 상황에 따라 달라질경우 사용
```
function log(a: string, b?: string) {

}
log('hello world');
log('hi ts', 'abc');
```

### 색션5: interface

#####  변수에 활용한 인터페이스 
- 동일한 규칙( 유저라는 인터페이스를 사용하면 정의 해놓은 타입을 쓰겟다고 상호간의 약속 )
- 중복코드 방지
```
interface User {
    age: number;
    name: string;
}

var seho: User = {
    age: 33,
    name: '세호'
}
```

##### 함수에 인터페이스 활용 특정 (형식만 준수하는 데이터만 받겟다)
```
function getUser(user: User) {
    console.log(user);
}
const capt = {
    name: '캡틴',
    age: 100
}
getUser(capt);
```

##### 함수 구조를 정의하는 인터페이스
- API 호출 시 인테페이스로 정의 한 후 활용

- 함수의 스펙(구조)에 인터페이스 활용
```
interface SumFuntion {
    // 함수의 인자의 타입도 인터페이스로 정의 할수 잇다
    (a: number, b: number): number
}
var sum: SumFuntion;
sum = function (a: number, b: number): number {
    return  a + b;
}
```

##### 인덱싱 속성: 타입;으로 정의 해줫는데 속성을 인덱스 주고 싶을때?
```
interface StringArray {
    [indax: number]: string;
}
var  arr: StringArray = ['a','b'];
//arr[0] = 10; // err뜸 문자열만 받을수 있는데 숫자형이 왓기때문에
```

##### 딕셔너리 패턴: 인덱싱 과 유사 
```
interface StringRegexDictionary {
    [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
    // sth: /abc/,
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}
// obj['cssFile'] = 'a'

Object.keys(obj).forEach(function(value) {});
// 인터페이스 사용 이용 : 객체의 키를 접근할때 미리 추론 해준다
```

##### 인터페이스 확장: OOP상속처럼 인터페이스를 상속받아서 기존에 잇던 것보다 더 확장에서 사용해서 쓴다
```
interface Person {
    name: string;
    age: number;
}
// extends 키워드를 사용 확장(상속)
interface Developer extends Person {
    language: string;
}

var captain: Developer = {
    language: 'ts',
    age: 100,
    name: '캡틴'
}
```
