### 색션12 타입추론
- 타입스크립트가 타입추론을 어떻게 하는지
- 변수를 선언, 변수, 속성, 인자의 기본값, 함수의 반환 값 등 설정할때 타입 추론이 일어남
```javascript
//Variable 'a' implicitly has an 'any' type, but a better type may be inferred from usage
// 값을 넣지 않을 경우any로 추론
var a;

// 디폴트 값으로 10을 넣으면 number로 타입추론
function b(b =10) {
    let c = 'hi';
    return b + c;
}
```

###### 인터페이스와 제네릭을 이용한 추론 방식
```
// 타입 추론 기본 2
interface Dropdown<T> {
  value: T;
  title: string;
}
var shoppingItem: Dropdown<string> = {
  value: 'abc', //Dropdown의 제네릭으로 value이 스트링라고 추론 
  title: 'hello'
}
```
```
// 타입 추론 기본 3=> 제네릭 연달아 2개 사용시
interface Dropdown<T> {
    value: T;
    title: string;
}
// 관행적으로 T로 사용하나 구분 짓기위해  K로 사용
interface DetailedDropdown<K> extends Dropdown<K> {
    description: string;
    tag: K;
    // value: T; 상속하기 때문에 두개의 값을 받는다
    // title: string;
}
// value, tag number로 추론
var detailedItem: DetailedDropdown<number> = {
    title: 'abc',
    description: 'ab',
    value: 'a',
    tag: 'a',
};
```

##### 가장 적절한 타입
- 타입스립트가 해당 코드를 어떤 타입인지 매겨나가는지의 방식? 
- 유니온 타입으로 묶어나간다
```
// 한 배열에 여러 타입을 넣으면 유니온 타입으로 추론
var arr = [1, 2, true, true, 'a'];
```

- 타입스트립트 랭기지 서버거 돌기때문에 타입추론이 가능

### 색션13: 타입 단언
- 타입단언: 타입스크립트보다 개발자가 더 잘 알고 있다 TS 넌 신경 말고 개발자가 주는 타입으로 추론해라
```
// 타입 단언(type assertion)
var a;
a = 20;
a = 'a';

// 맨처음에 a가 any로 선언됬기 때문에 그이후 값을 정의해도 b에 a의 타입을 할당 할때도 any가 됨
// as 키워드 사용으로 타입스크립트보다 개발자가 더 잘 알고 있다 TS 넌 신경 말고 개발자가 주는 타입으로 추론해라 라는 의미
var b = a as string;
```
- DOM API 조작 - 사례
```javascript
// <div id="app">hi</div>
//돔 특정 태그에 접근: HTNLDivElement | null로 추론
var div = document.querySelector('div');
if (div) { // null 체크 해줘야함
    div.innerText
}

//HTNLDivElement 로 추론
var div = document.querySelector('div') as HTNLDivElement;
div.innerText // 이미 HTNLDivElement로 단언한 시점에 할당해서 null 체크 안해도 됨
```

### 색션14: 타입가드
- 타입 단언으로 범위 줄여나가면서 추론
```
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}

function introduce(): Developer | Person {
    return { name: 'Tony', age: 33, skill: 'Iron Making' }
}
var tony = introduce();
// 유니온은 공통된 속성만 제공 => 리턴값으로 스킬을 주는데도 no
console.log(tony.skill); // name만 접근 가능

// (tony as Developer)로 단언했기때문에 skil로 사용 가능 -> 타입 단언으로 범위를 줄어 나갈수 있다
if ((tony as Developer).skill) {
    // 단점은 내부에서도 단언을 해줘야한다 => 코드 중복성
    var skill = (tony as Developer).skill;
    console.log(skill);
} else if ((tony as Person).age) {
    var age = (tony as Person).age;
    console.log(age);
}
```

##### 타입가드소개와 적용
- target is Developer 넘겨받은 파라미터가 해당 그 타입인지 구분하는 코드
- 키워드 is
```
// 타입 가드 정의
// target is Developer 넘겨받은 파라미터가 해당 그 타입인지 구분하는 코드
function isDeveloper(target: Developer | Person): target is Developer {
    return (target as Developer).skill !== undefined;
}

if (isDeveloper(tony)) {
    console.log(tony.skill);
} else {
    console.log(tony.age);
}
```