var a;
//Variable 'a' implicitly has an 'any' type, but a better type may be inferred from usage
// 값을 넣지 않을 경우any로 추론

// 디폴트 값으로 10을 넣으면 number로 타입추론
function b(b =10) {
    let c = 'hi';
    return b + c;
}

// 타입 추론 기본 2
interface Dropdown<T> {
  value: T;
  title: string;
}
var shoppingItem: Dropdown<string> = {
  value: 'abc', //Dropdown의 제네릭으로 value이 스트링라고 추론
  title: 'hello'
}

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

// Best Common Type
var arr = [1, 2, true, true, 'a'];