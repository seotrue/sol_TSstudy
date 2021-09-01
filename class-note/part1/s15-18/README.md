### 색션15: 타입호환
- 두개의 타입이 호환이 되는지 

```
// 인터페이스
interface Developer {
    name: string;
    skill: string;
}
// interface Person {
//   name: string;
//   // skill: string;
// }
class Person {
    name: string;
    skill: string;
}

var developer: Developer;
var person: Person;
developer = new Person();

// 오른쪽이 구조적으로 속성이 더많아야 호환이 된다
// 내주벅으로 속성과 타입을 비교한다 인터페이스, 클래스를 비교하지 않는다
// developer = person; 
// person = developer;  
```

```
// 함수 => 파라미터, 반환 등 구조적으로 큰 함수가 호환이 가능 반대는 X
var add = function(a: number) {
    // ...
}
var sum = function(a: number, b: number) {
    // ...
}
sum = add; // O
add = sum; // X add는 하나의 인자뿐

// 제네릭
interface Empty<T> {
    // ..
}
var empty1: Empty<string>;
var empty2: Empty<number>;
empty1 = empty2; // O
empty2 = empty1; // O

interface NotEmpty<T> {
    data: T;
}
// notempty1, notempty2동일하게 속성은 있지만 구조적으로 타입 차이가 생김
var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;
notempty1 = notempty2; // X
notempty2 = notempty1; // X

```

### 색션16: 타입 모듈화
- ES6 모둘과 유사
- 전역변수와 구분되는 자체유효 범위 가지며 export, import 같은 키워드 사용 다른 파일 접근

##### js에서의 모듈화
- (캡틴판교JS)[https://joshua1988.github.io/vue-camp/es6/modules.html]
> export 변수, 함수  
> import { 불러올 변수 또는 함수 이름 } from '파일 경로'  
                