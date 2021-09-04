### 색션4: 최종프로젝트 - 점진적인 타입 적용
1. 타입스크립트 환경 설정 및 ts 파일로 변환
2. any 타입 선언
- 타입스크립트 설정 파일(tsconfig.js)에 ```noImplicitAny: true``` 추가
3. any 타입을 더 저절한 타입으로 변경
- > 06: Parameter 'selector' implicitly has an 'any' type. // 너가 타입에 대해서 잘모르면 any라도 넣아라

##### 화살표함수에 타입 정의 방법
```
// 타입스크립트의 화살표 함수
var sum = (a: number, b: number): number => {
    return a + b;
}
```

```
// 파라미터 하나의 경우 타입 추가 할때도 괄호가 필요
sorted.forEach((value: any) => {
```

##### DOM 관련 타입 구체화(any-> 구체화된 타입으로 변경)
- 예제 참고[]
- > TS2339: Property 'innerText' does not exist on type 'Element' //현제 엘레먼트 타입이 없다
- 태그 타입은 위계적인 질서 타입을 가지고 있임
>```var a: Element | HTMLElement | HTMLParagraphElement ```

##### DOM 함수 타입 오류 해결
- HTMLParagraphElement : HTMLElement를 상속받아서 확장

### 색션5: 최종프로젝트 - 점진적인 타입 적용을 위한 프로젝트 환경 구성


### 색션6: 최종프로젝트 - 외부 라이브러리 모듈화