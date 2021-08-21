// interface Person {
//   name: string;
//   age: number;
// }

type Person = {
    name: string;
    age: number;
}

var seho: Person = {
    name: '세호',
    age: 30
}
// type은 어는곳에나 사용할수 잇다. 인터페이스 형식뿐만 아니라
type MyString = string;
var str: MyString = 'hello';

type Todo = { id: string; title: string; done: boolean };
function getTodo(todo: Todo) {

}

/