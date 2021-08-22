class Person {
    // 멤버 변수 타입을 정의 해줘야함
    private name: string; // 클래스 안에서만 쓰겟다 (변수의 유효뱜위까지 )
    public age: number; //외부에서 클래스로 접근이 가능하고 인스턴스로도 접근이 가능
    readonly log: string // 읽기만 할수 잇다 변경x
    constructor(name: string, age: number){
        this.age = age;
        this.name = name;
    }
}