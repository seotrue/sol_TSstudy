function add(a: number, b: number): number {
    return a + b;
}
// result number 추론 가능
var result = add(10, 20);
// result.toLocaleString();
result.toLocaleString();

// number 아닌 자료형을 넣을경우 에러
// add(10, '20');