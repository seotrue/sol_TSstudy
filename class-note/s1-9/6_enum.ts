// 별도의 값을 지정하지 않으면 숫자형 이넘으로 취급한다
enum Shoes {
    Nike,
    Adidas
}

let myShoes = Shoes.Nike;
console.log(myShoes) // 0

// 예제
enum Answer {
    Yes = 'Y',
    No = 'N',
}

function askQuestion(answer: Answer) {
    if (answer === Answer.Yes) {
        console.log('정답입니다');
    }
    if (answer === Answer.No) {
        console.log('오답입니다');
    }
}
askQuestion(Answer.Yes);
askQuestion('Yes');
// askQuestion('예스');
// askQuestion('y');
// askQuestion('Yes');