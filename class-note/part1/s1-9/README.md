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

### 색션6: 타입 별칭
- 타입별칭: 특정 타입이나 인터 페이스를 참조할수 있는 타입 별수를 의미
```
// string 타입을 사용할때
const name: string = 'capt;

// 타입 별칭 사용할때
type MyName = string;
const name: MyName = 'capt'
```

##### 타입별칭의 특징
1. 새로운 타입 값을 하나 생성하는 것이 아니라 정의한 타입에 대하 나중에 쉽게 참고 할수 있게 이름을 부여하는 것

##### 타입 vs 인터페이스
1. 타입 별칭은 확장이 안된다 
2. 가능한한 type보다는 ibterface로 선언하는걸 추천(공식문서)
3. 타입별칭은 타입에 별칭은 해준거뿐 (ctrl+ alt 해보면 모양이 다른걸 확인할수 잇다) 

### 색션7: 유니온, 인터센션

##### 연산자를 이용한 타입 정의 - 유니온 타입(|)
- 유니온 타입: 특정 변수 or 함수등의 타입을 하나의 타입 이상을 쓸수 있게 만들수 있는것 
```
function logMessage(value: string | number){ // 연산자 | 사용 하면 기재한 타입 모두 사용 가능
    console.log(value)
}
logMessage('hi')
logMessage(100)
```

##### 유니온 타입 장점
- 타입가드: 특정 타입으로 타입의 범위를 좁혀나가는 (필터링 하는 )과정 가능

##### 유니온 타입 특징
- 공통 속성(보정된)만 접근
```
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}
// 두개의 인터페이스를 유니온 타입으로 연결 했을때
function askSomeone(someone: Developer | Person) {
    // 공통 속성인 name만 추론 
    someone.name; 
}
``` 

##### 인터섹션(&) and
```
function askSomeone(someone: Developer & Person) {
    // Developer,Person의 속성 모두 포함한 하나의 타입 
    someone.name;
    someone.age;
    someone.skill;
}
```

##### 유니온 vs 인터섹션'
```
// 유니온 타입 askSomeone 호출시
askSomeone({
    name: '디벨로퍼',
    skill: '웹개발'
})

// 인터섹션 호출시
askSomeone({
    name: '디벨로퍼',
    skill: '웹개발',
    age: 34
})
 
```

### 색션:8 이넘(Enum)
- 특정 값들의 집합을 의마하는 자료형
1. 숫자형 이넘
```
// 별도의 값을 지정하지 않으면 숫자형 이넘으로 취급한다
enum Shoes {
    Nike,
    Adidas
}
let myShoes = Shoes.Nike;
console.log(myShoes) // 0
```

2. 문자형 이넘
```
enum Shoes {
    Nike: '나이키,
    Adidas: ' 아디다시
}
let myShoes = Shoes.Nike;
console.log(myShoes) // 나이키
```  
- ![enums/JS](https://github.com/learn-typescript-study/sol_TSstudy/tree/main/class-note/enum.PNG)

##### 이넘 활용사례
- 단순히 문자 비교 X
```
enum Answer {
    Yes = 'Y',
    No = 'N',
}

function askQuestion(answer: Answer) {
    if (answer === Answer.Yes) {
        console.log('정답입니다');
    }
    if (answer === Answer.No) {
        console.log('오답입니다');
    }
}
askQuestion(Answer.Yes); // O
askQuestion('Yes'); // X
```

### 색션9: 클래스
- js는 프로타입기반의 언어다
```
var user = { name: 'sol',age: 100};
var admin ={}
// 프로토 타입 상위에 유저 객체를 주겟다(상속받겟다)
admin._proto+ = user;

// 어드민에서 age, name 사용가능
```

##### 타입스크립트의 클래스 문법
```
class Person {
    // 멤버 변수 타입을 정의 해줘야함
    private name: string; // 클래스 안에서만 쓰겟다 (변수의 유효뱜위까지 )
    public age: number; //외부에서 클래스로 접근이 가능하고 인스턴스로도 접근이 가능
    readonly log: string // 읽기만 할수 잇다 변경x
    constructor(name: string, age: number){
        this.age = age;
        this.name = name;
    }
}
```

