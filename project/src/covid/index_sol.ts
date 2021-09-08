// 코비드가 들고 잇는 타입을 다 정리


export interface Country {
  Country: string;
  CountryCode: string;
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: any;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

interface Global {
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

// d원래대로 라면 별도로 타입 파일 만들어서 export 할테지만 일단
export interface CovidSummaryReponse {
  Countries: Country[];
  Date: string;
  Global: Global;
  Message: string;
}

// export interface CovidSummaryResponse {
//   Countries: Country[];
//   Date: string;
//   Global: Global;
//   Message: string;
// }

export interface CountrySummaryInfo {
  Cases: number;
  City: string;
  CityCode: string;
  Country: string;
  CountryCode: string;
  Date: string;
  Lat: string;
  Lon: string;
  Province: string;
  Status: string;
}

// 배열이기 때문에 type으로????? interface으로 하면 안된다 에러체크됨

export type CountrySummaryResponse = CountrySummaryInfo[];
