// 함수의 파라미터를 받아서 그대로 리턴 값으로 돌려주는것
// function logText(text) {
//     console.log(text);
//     return text;
// }
// logText(10);// 숫자 10
// logText('하이'); // 문자열 하이
// logText(true); // 진위값 true


//함수ㅡㄹ 호출할때 파라미터 타입을 인자로 넘겨줄께
function logText<T>(text: T):T {
    console.log(text)
    return text
}
// 호출하는 시점에 타입을 넘겨주는 것 그게 제네릭
// 내가 스트링이라는 타입을 넘기겟다
logText<string>('하이');


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


function logText(text: string | number) {
    // 유니온 타입으로 사용한 스트링이랑 넙버의 교집한만 자동완성이 보인다
    console.log(text);
  return text;
}

const a = logText('a');
// 에러가 뜬다 a의 추론은 스트링과 넘버로 되어잇기에
a.split('');
logText(10);
const num = logNumber(10);
logText(true);



// const str = logText<string>('abc');
// str.split('');
// const login = logText<boolean>(true);

// logText('a')
// logText(10)

// 인터페이스에 제네릭을 선언하는 방법
interface Dropdown {
  value: string;
  selected: boolean;
}

const obj: Dropdown = { value: 'abc', selected: false };

interface Dropdown<T> {
    value: T;
    selected: boolean;
}
const obj: Dropdown<number> = { value: 'abc', selected: false };

// 제네릭 타입 제한
function logTextLength<T>(text: T[]): T[] {
  console.log(text.length);
  text.forEach(function (text) {
    console.log(text);
  });
  return text;
}
logTextLength<string>(['hi', 'abc']);

// 제네릭 타입 제한 2 - 정의된 타입 이용하기
interface LengthType {
    length: number;
}
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

function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
    return itemOption;
}
// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');
getShoppingItemOption('name');