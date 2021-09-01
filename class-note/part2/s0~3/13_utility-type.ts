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
type Subset<T> = {
    [p in keyof T]?: T[p]
}