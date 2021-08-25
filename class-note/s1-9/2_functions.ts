// 파라미터 타입을 정의 할수 잇음
// 함수의 반환 값에 타입의 정의, 함수에 타입읠 정의
 function sum(a: number, b: number): number {
    return a + b
 }
// JS의 유연함과는 다르게 추가 인자를 받지 않고 잡아준다.
sum(10, 20, 30, 40);

//옵셔널 파라미터(선택적 파라미터)
function log(a: string, b?: string) {

}
log('hello world');
log('hi ts', 'abc');