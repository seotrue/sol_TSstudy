interface User {
    age: number;
    name: string;
}

// 변수에 활용한 인터페이스
var seho: User = {
    age: 33,
    name: '세호'
};

// 함수에 인터페이스 활용

function getUser(user: User) {
    console.log(user);
}
const capt = {
    name: '캡틴',
    age: 100
}
getUser(capt);
// API 호출 해와서 스펙이  어떨지 모양이 어떻다 인테페이스로 정의한다음 그걸 활용한다

// 함수의 스펙(구조)에 인터페이스 활용
interface SumFuntion {
    // 함수의 인자의 타입도 인터페이스로 정의 할수 잇다
    (a: number, b: number): number
}
var sum: SumFuntion;
sum = function (a: number, b: number): number {
    return  a + b;
}

// 인덱싱 속성: 타입으로 정의 해줫는데 속성을 그때마다 다르게 주고 싶을때?
interface StringArray {
    [indax: number]: string;
}
var  arr: StringArray = ['a','b'];
//arr[0] = 10; // err뜸 문자열만 받을수 있는데 숫자형이 왓기때문에

// 딕셔너리 패턴
interface StringRegexDictionary {
    [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
    // sth: /abc/,
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}
// obj['cssFile'] = 'a'

Object.keys(obj).forEach(function(value) {});// 인터페이스 사용 이용 : 객체의 키를 접근할때 미리 추론 해준다

// 인터페이스 확장: OOP상속처럼 인터페이스를 상속받아서 기존에 잇던 것보다 더 확장에서 사용해서 쓴다
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