// 타입 단언(type assertion)
var a;
a = 20;
a = 'a';

// 맨처음에 a가 any로 선언됬기 때문에 그이후 값을 정의해도 b에 a의 타입을 할당 할때도 any가 됨
// as 키워드 사용으로 타입스크립트보다 개발자가 더 잘 알고 있다 TS 넌 신경 말고 개발자가 주는 타입으로 추론해라 라는 의미
var b = a as string;

// DOM API 조작 - 사례
// <div id="app">hi</div>
//돔 특정 태그에 접근: HTNLDivElement | null로 추론
var div = document.querySelector('div');
if (div) { // null 체크 해줘야함
    div.innerText
}

//HTNLDivElement 로 추론
var div = document.querySelector('div') as HTNLDivElement;
div.innerText // 이미 HTNLDivElement로 단언한 시점에 할당해서 null 체크 안해도 됨
