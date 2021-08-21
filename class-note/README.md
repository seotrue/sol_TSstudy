### 변수 기본 타입
- JS 문자열 선언  
```let str  = 'hi';```

- TS 문자열 선언  
```let str2: string = 'hello';```

- TS 숫자  
```let num: number = 10;```

- TS 배열  
```
let arr: Array<number> =  [1,2,3,0];  
let heroes: Array<string> = ['Capt', 'Thor', 'Hulk'];
```

- 리터럴 방식  
```let items: number[] = [1,2,3];```

### 함수
- 파라미터, 반환값 타입을 정의 해준다
```
 function sum(a: number, b: number): number {
    return a + b
 }
```
- JS의 유연함과는 다르게 추가 인자를 받지 않고 잡아준다.
```
sum(10, 20, 30, 40); // 30, 40에 err
```
- 옵셔널 파라미터: 인자가 상황에 따라 달라질경우 사용
```
function log(a: string, b?: string) {

}
log('hello world');
log('hi ts', 'abc');
```