// K는 그냥 타입 변수
// for in 반복문 처럼 in을 만나면서 Heroes의 유니온 키를 돈다 => 돌면서 각각 number 타입을 넣어준다
// 기존 타입에서 -> 새로운 타입 만들어낸다 --> 이게 맵드 타입
// type HeroAges = { [K in Heroes]: number } =>
/*type HeroAges= {
    Hulk: number,
    Capt: number,
    Thor: number,
}

* */
type Heroes = 'Hulk' | 'Capt' | 'Thor'
type HeroAges = { [K in Heroes]: number }
const ages: HeroAges = {
    Hulk: 33,
    Capt: 100,
    Thor: 1000,
}

// for in 반복문 코드
// var arr = ['a','b','c'];
// for (var key in arr) {
//   console.log(arr[key]);
// }