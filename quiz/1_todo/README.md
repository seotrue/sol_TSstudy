### 색션4: 할일 관리 애플리케이션 

##### 추가 설명
- any: 형식이 확인할수 없는 경우 일부 위체에서 암시적으로 any를 사용
- void : 함수의 반환타입이 없을경우 
- crud methods :  Create(생성), Read(읽기), Update(갱신), Delete(삭제)를 묶어서 일컫는 말이다.
- business logic: 데이터를 생성·표시·저장·변경하는 부분을 일컫는다.

##### 오류 해열 방식 
> Property 'done' does not exist on type 'object'.  

> 객체 프로퍼티의 대한 구체화 작업이 필요
>

##### 중복코드와 인터페이스
1. 타입에 이름을 부여
```
type Todo ={
    id: number
}
```
```
interface Todo {
 id: number;
 title: string`;
 done: boolean:
```   
 
- 중복된 타입을 부여된 부분에 interface로 정의한 Todo 타입을 써준다.