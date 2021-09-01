interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}

function introduce(): Developer | Person {
    return { name: 'Tony', age: 33, skill: 'Iron Making' }
}
var tony = introduce();
// 유니온은 공통된 속성만 제공 => 리턴값으로 스킬을 주는데도 no
console.log(tony.skill); // name만 접근 가능

// (tony as Developer)로 단언했기때문에 skil로 사용 가능 -> 타입 단언으로 범위를 줄어 나갈수 있다
if ((tony as Developer).skill) {
    // 단점은 내부에서도 단언을 해줘야한다 => 코드 중복성
    var skill = (tony as Developer).skill;
    console.log(skill);
} else if ((tony as Person).age) {
    var age = (tony as Person).age;
    console.log(age);
}

// 타입 가드 정의
// target is Developer 넘겨받은 파라미터가 해당 그 타입인지 구분하는 코드
function isDeveloper(target: Developer | Person): target is Developer {
    return (target as Developer).skill !== undefined;
}

if (isDeveloper(tony)) {
    console.log(tony.skill);
} else {
    console.log(tony.age);
}