// JS 문자열 선언
let str  = 'hi';

// TS 문자열 선언
let str2: string = 'hello';

// TS 숫자
let num: number = 10;

// TS 배열
let arr: Array<number> =  [1,2,3,0];
let heroes: Array<string> = ['Capt', 'Thor', 'Hulk', 10];

// 리터럴 방식
let items: number[] = [1,2,3];

// TS 튜플(배열에 각각의 인덱스에 특정 타입을 지정)
let address: [string, number] = ['gannam', 10];

// TS 객체
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

//TS 진위값
let show: boolean = true;
