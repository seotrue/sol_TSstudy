import axios, {AxiosResponse} from 'axios';
import * as Chart from "chart.js";
import * as url from "url"; // 라이브러르 들고 오는 es6 관련 문법해서 * as Chat로 들고 온다

// 타입 모듈
import {CountrySummaryResponse, CovidSummaryReponse, Country, CountrySummaryInfo} from './covid/index_sol'
// utils
function $(selector: string) { // 태그, 아이디, 등을 들고 오기때문에 string
    return document.querySelector(selector);
} // 자동적으로 반환겂이 Element로 추론

// 내장 객체면 이미 타입이 추론
function getUnixTimestamp(date: Date | string) {
    return new Date(date).getTime();
}

// DOM
var a: Element | HTMLElement | HTMLParagraphElement // 위계적인 질서 타입을 가지고 있임
// util함수 때문에 결과로 Element로 나온것 => index.html의 해당 선택자 태그를 보면 span이이니깐 HTMLSapnElemnet
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;

// $의 리턴값이 Element 이기때문에 타입단언: 타입스크립트보다 개발자가 더 잘 알고 있다 TS 넌 신경 말고 개발자가 주는 타입으로 추론해라 으로 리턴값으로 넣어준다?
const deathsTotal = $('.deaths') as HTMLParagraphElement; //p태그이니깐
const recoveredTotal = $('.recovered') as HTMLParagraphElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id:string) { /// id에 들어갈 문자열 이기에
    const wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id', id);
    wrapperDiv.setAttribute(
        'class',
        'spinner-wrapper flex justify-center align-center',
    );
    const spinnerDiv = document.createElement('div');
    spinnerDiv.setAttribute('class', 'ripple-spinner');
    spinnerDiv.appendChild(document.createElement('div'));
    spinnerDiv.appendChild(document.createElement('div'));
    wrapperDiv.appendChild(spinnerDiv);
    return wrapperDiv;
}

// state
let isDeathLoading = false;
let isRecoveredLoading = false;


// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryReponse>> {
    const url = 'https://api.covid19api.com/summary';
    return axios.get(url);
}
// res.data.- 추론 가능
fetchCovidSummary().then(res => res.data.Message)

// enum 이란 값들이 정해줘 잇고 그 값들의 집합
enum CovidStatus {
    Confirmed = 'confirmed',
    Recoverd = 'recovered',
    Deaths  = 'deaths'
}

function fetchCountryInfo(countryName: string, status: CovidStatus): Promise<AxiosResponse<CountrySummaryResponse>> {
    // status params: confirmed, recovered, deaths
    const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
    return axios.get(url);
}

// methods
function startApp() {
    setupData();
    initEvents();
}

// events
function initEvents() {
    rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: MouseEvent) {
    let selectedId;
    if (
        event.target instanceof HTMLParagraphElement ||
        event.target instanceof HTMLSpanElement
    ) {
        selectedId = event.target.parentElement.id;
    }
    if (event.target instanceof HTMLLIElement) {
        selectedId = event.target.id;
    }
    if (isDeathLoading) {
        return;
    }
    clearDeathList();
    clearRecoveredList();
    startLoadingAnimation();
    isDeathLoading = true;
    const { data: deathResponse } = await fetchCountryInfo(selectedId, CovidStatus.Deaths);
    const { data: recoveredResponse } = await fetchCountryInfo(
        selectedId,
        CovidStatus.Recoverd,
    );
    const { data: confirmedResponse } = await fetchCountryInfo(
        selectedId,
        CovidStatus.Confirmed,
    );

    endLoadingAnimation();
    setDeathsList(deathResponse);
    setTotalDeathsByCountry(deathResponse);
    setRecoveredList(recoveredResponse);
    setTotalRecoveredByCountry(recoveredResponse);
    setChartData(confirmedResponse);
    isDeathLoading = false;
}

function setDeathsList(data: CountrySummaryResponse) {
    const sorted = data.sort(
        (a:CountrySummaryInfo, b:CountrySummaryInfo) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    sorted.forEach((value: CountrySummaryInfo) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item-b flex align-center');
        const span = document.createElement('span');
        span.textContent = value.Cases.toString();
        span.setAttribute('class', 'deaths');
        const p = document.createElement('p');
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        deathsList.appendChild(li);
    });
}

function clearDeathList() {
    deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(data: CountrySummaryResponse) {
    // TS2339: Property 'innerText' does not exist on type 'Element'
    deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountrySummaryResponse) {
    const sorted = data.sort(
        (a:CountrySummaryInfo, b: CountrySummaryInfo) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    sorted.forEach(value => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item-b flex align-center');
        const span = document.createElement('span');
        span.textContent = value.Cases.toString();
        span.setAttribute('class', 'recovered');
        const p = document.createElement('p');
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        recoveredList.appendChild(li);
    });
}

function clearRecoveredList() {
    recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(data: CountrySummaryResponse) {
    recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
    deathsList.appendChild(deathSpinner);
    recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
    deathsList.removeChild(deathSpinner);
    recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
    // 타입을 정의해줫기 때문에 data에 타입이 자동적으로 추론된다.
    const { data } = await fetchCovidSummary();
    setTotalConfirmedNumber(data);
    setTotalDeathsByWorld(data);
    setTotalRecoveredByWorld(data);
    setCountryRanksByConfirmedCases(data);
    setLastUpdatedTimestamp(data);
}

function renderChart(data:any, labels:any) {
    var ctx = $('#lineChart').getContext('2d');
    Chart.defaults.color = '#f5eaea';
    Chart.defaults.font.family = 'Exo 2';
    console.log(Chart,'?')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Confirmed for the last two weeks',
                    backgroundColor: '#feb72b',
                    borderColor: '#feb72b',
                    data,
                },
            ],
        },
        options: {},
    });
}

function setChartData(data:any) {
    console.log(data,'data')
    const chartData = data.slice(-14).map(value => value.Cases);
    const chartLabel = data
        .slice(-14)
        .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
    renderChart(chartData, chartLabel);
}

// 전체 확진자 수 계산
function setTotalConfirmedNumber(data: CountrySummaryResponse) {
    // confirmedTotal.innerText은 String reducer의 반환 값은 넘버 이기 때문에 타입을 맞춰 줘야한다 => .toString(); 사용
    confirmedTotal.innerText = data.Countries.reduce(
        (total: number, current: Country) => (total += current.TotalConfirmed),
        0,
    ).toString();

}

function setTotalDeathsByWorld(data: CountrySummaryResponse) {
    deathsTotal.innerText = data.Countries.reduce(
        (total: number, current: Country) => (total += current.TotalDeaths),
        0,
    ).toString();
}

function setTotalRecoveredByWorld(data: CountrySummaryResponse) {
    recoveredTotal.innerText = data.Countries.reduce(
        (total: number, current: Country) => (total += current.TotalRecovered),
        0,
    ).toString();
}

function setCountryRanksByConfirmedCases(data: CountrySummaryResponse) {
    const sorted = data.Countries.sort(
        (a:Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed,
    );
    sorted.forEach((value: Country) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item flex align-center');
        li.setAttribute('id', value.Slug);
        const span = document.createElement('span');
        span.textContent = value.TotalConfirmed.toString();
        span.setAttribute('class', 'cases');
        const p = document.createElement('p');
        p.setAttribute('class', 'country');
        p.textContent = value.Country;
        li.appendChild(span);
        li.appendChild(p);
        rankList.appendChild(li);
    });
}

function setLastUpdatedTimestamp(data: CountrySummaryResponse) {
    lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();