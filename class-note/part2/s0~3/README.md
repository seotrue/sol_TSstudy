### 색션0 유틸리티 타입

##### 유틸리티 타입이란
- 인터페이스에서 특정 부분만 만족하는것만 뽑고 싶을때 다른 문법도 가능하지만 파셜이라는 유틸리티 타입을 이용해서 가능
- 유틸리티 타입: 이미 정의해놓은 타입을 변환할때 사용하기 좋은 타입문법, 유틸리티 타입을 꼭 쓰지 않더라도 기존의 인터페이스, 제네릭 등 기본 문법으로 충분히 타입을 변환 할수 잇지만 유틸리티 타입을 쓰면 훨씬ㄷ ㅓ 간결

##### Pick 사례
- 타입을 불필요하게 정의 안하고 중복성 코드x
- Pick<대상타입, '대상타입의 사용할 키'| '대상타입의 사용할 키'>
```javascript
interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
    // ..
}
// 이렇게 해서 ProductDetail로 타입을 선언해서 사용해도 되나 Product와 중복되는 코드가 잇다 Product에서 사용하고싶은 것만 뽑아서 사용하고 싶을 땐 Pick 유틸리티 타입을 이용하면 더 간결하게 코드를 줄일수 잇다
interface ProductDetail {
  id: number;
  name: string;
  price: number;
}

// 2. 특정 상품의 상세 정보를 나타내기 위한 함수
type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>
// 키워드 Pick<대상타입, '대상타입의 사용할 키'| '대상타입의 사용할 키'> => interface ProductDetail를 쓰지 않고 기존의 Product 타입을 변환해서 사용 
function displayProductDetail(shoppingItem: Pick<Product, 'id' | 'name' | 'price'>) {

}
```

##### Omit 타입과 기타 유틸리티 타입 목록 소개
-오밋: 특정 타입에서 지정된 송성만 제거한 타입을 정의
- Omit<대상타입,  '사용안할 키'>
- 타입스크립트 공식 사이트의 유틸리티 타입 문서[https://www.typescriptlang.org/docs/handbook/utility-types.html]

##### Partial
- 옵셔널 인터페이스 를 사용하지 않아도 partial를 사용하면 선택적 적용이 가능(옵셔널)
```javascript
// UpdateProduct 처럼 옵셔널로 넣어줄수도 있지만
// (그럼 받을수도 잇고 안받을수도 잇는 타입, 매번 함수가 호추할때마다 업데이터 하는 키가 달라지므로 )
// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

// 옵셔널 인터페이스 를 사용하지 않아도 partial를 사용하면 선택적 적용이 가능(옵셔널)
type UpdateProduct = Partial<Product>
// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
function updateProductItem(productItem: Partial<Product>) {

}
```

##### 유틸리티 타입 구현 (partial)
- 똑같은 인테페이스 타입 a,b 그중 b는 옵셔널만 넣는다면 => 불필요한 코드 증가, 중복성
1. 이미 정의 되어있는 타입 별칭으로 활용하기
2. in 오퍼레이터로 1번의 축약형(맵드타입)
3. ketof 사용래서 축약
4. 이미 정의 되어 있는 타입을 넘겨받기위해(UserProfileUpdate 말고도 적용하기 위해) 제네릭 사용
```javascript
// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
    username: string;
    email: string;
    profilePhotoUrl: string;
}
// A : username?  타입이 옵셔널 하다 -> 셋다 들어가두 되구 하나만 들어가두 되고
interface UserProfileUpdate {
  username?: string;
  email?: string;
  profilePhotoUrl?: string;
}
// A처럼 안하고 다른 방법으로 할려면
//#1
type UserProfileUpdate = {
  username?: UserProfile['username']; // 인터페이스 UserProfile의 username으로 접근해서 인터페이스의 타입을 가져옴
  email?: UserProfile['email'];
  profilePhotoUrl?: UserProfile['profilePhotoUrl'];
}

// #2: #1의 축약
type UserProfileUpdate = {
    // []찾고 in을 타면 반복문으로 축약 가능 => 맵드 타입
    [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]
}
type UserProfileKeys = keyof UserProfile

// #3: #2의 축약
//  keyof UserProfile => 'username' | 'email' | 'profilePhotoUrl'
type UserProfileUpdate = {
    [p in keyof UserProfile]?: UserProfile[p]
}

// #4: 최종 파셜
// 제네릭을 타입을 받는다 -> UserProfileUpdate를 <T>로 바꿔줌
type Subset<T> = {
    [p in keyof T]?: T[p]
}
```

### 색션1: 맵드타입
- 기존에 정의되어 있는 타입을 새로운 타입으로 변환해주는 문법을 의미 마치 자바스크립트 ```map()``` API 함수를 타입에 적용한 것과 같은 효과
- 기존타입에서 새로운 타입을 뽑아낸다
```javascript
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

```

### 색션2: 최종프로젝트 안내