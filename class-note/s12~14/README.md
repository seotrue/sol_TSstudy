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