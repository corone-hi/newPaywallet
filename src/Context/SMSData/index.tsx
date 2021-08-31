/* eslint-disable prettier/prettier */
import React, {createContext, useState, useContext, useEffect} from 'react';
import {Alert, ImageStore} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SmsListener from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {UserContext} from '~/Context/User';

const defaultContext: ISMSDataContext = {
  setData: (category: string, date: Date, shop: string, money: string) => {},
};

const SMSDataContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const SMSDataContextProvider = ({children}: Props) => {
  const {monthlyAcount} = useContext<IUserContext>(UserContext);
  const [messageData, setMessage] = useState({
    body: '',
    address: '',
    timestamp: '',
  });

  const [cname, setCname] = useState(null);
  const [dshop, setDshop] = useState(null);
  const [dmoney, setDmoney] = useState(null);
  const [dcategory, setDcategory] = useState(null);

  const classification_list = {
    '공공,사회기관':
      '경찰서 경찰청 공공,행정시설 전화국 법원 고등법원 사법기관 사회복지 노인복지 사회복지단체 시민단체 아동복지시설 자원봉사 소방본부 소방서 입법기관 정치,정당 고용노동부 중앙행정기관 교육부 국가보은처 국방부 병무처 국토교통부 관세청 국세청 기획재정부 농림축산식품부',
    공과금: 'SK텔레콤 KT LG유플러스 공사,공단',
    '교육,육아':
      '문화센터 영재교육원 평생,사회교육원 도서관 독서실 수련원,연수원 연구,연구소 영,유아,아동 어린이집 놀이교육 영어교육 전문계고등학교 특수목적고등학교 대학교 전문대학 정보통신대 종교대학 중학교 초등학교 공부방 논술 속독 수학학원 영재학원 웅변,화술 입시학원 학습지',
    '교통,운수':
      '공공,사회기관 교통,운수 공사,공단 중앙행정기관 교통,운수서비스 도로시설 여객,화물운송 국토교통부 면허장시험장 전기차충전소 주차장 휴게소 기타운송 택시회사 항공 버스회사 국제, 항공화물 택배',
    '레저,스포츠':
      '스포츠용품 헬스용품 자전거 오락시설 노래방 헬스장 스포츠시설',
    '병원,약국':
      '대체,보조의료 뜸,침 척추,자세교정 병원 병원,의원 치과 한의원 병원부속시설 보건소 종합병원 약국 응급의료 치료,상담 건강,의료용품 보청기 건강기능보조식품',
    뷰티:
      '미용 미용실 남성전문미용실 어린이미용실 머리염색 두피,탈모관리 피부,체형관리 다이어트,비만 마사지,지압 메이크업 네일아트,네일샵',
    쇼핑:
      '백화점 아웃렛 쇼핑센터, 할인매장 상가, 아케이드 드럭스토어 면세점 시장 종합가전 주방가전 컴퓨터,모니터 IT 휴대폰 냉난반기 신발 가방,핸드백 골프웨어 등산,아웃도어 스포츠의류 장난감 전동모빌리티 전통식품 쇼핑복합시설 전기, 압력밥솥 건강신발 캐주얼웨어 보일러 꽃집,꽃배달',
    식료품:
      '쇼핑,유통 생활,편의 서비스,산업 종합도소매 식료품 편의점 물류,유통 슈퍼,마트 반찬가게 보관,저장',
    애완동물: '반려동물 반려동물분양 반려견분양 애견의류 동물병원', //동물카페 고양이카페
    '여행,숙박':
      '호텔 콘도,리조트 레지던스 모텔 자연명소 자연공원 휴양림,산림욕장 문화,유적 문화재 기념물 릉,묘,총 관람,체험 아쿠아리움 투어버스 페리, 해운사',
    음식점:
      '한식 중식 일식 일식당 베트남음식 인도음식 분식 술집 육류,고기요리 찌개,전골 국밥 국수 냉면 막국수 추어탕 감자탕 해장국 곰탕,설렁탕 갈비탕 두부요리 칼국수,만두 전,빈대떡 한정식 쌈밥 보리밥 비빔밥 죽 백반,가정식 돼지고기구이 피자 샌드위치 햄버거 핫도그 후렌치후라이 브런치 스테이크, 립 멕시코, 남미음식 이탈리아 음식 중식당 양꼬치 덮밥 일식당 일본식라면 돈가스 초밥, 롤 일식튀김, 꼬치 샤브샤브 우동,소바 카레 전통,민속주점 요리주점 맥주, 호프 바(BAR) 와인 이자카야 오뎅, 꼬치 포장마차 치킨,닭강정 토스트 스파게티,파스타전문',
    카페:
      '카페,디저트 베이커리 케이크전문 도넛 카페 와플 슈 커피번 호두과자 떡,한과',
  };

  useEffect(() => {
    const filter = {
      box: 'inbox',
      read: 1,
      indexFrom: 0,
      maxCount: 10,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('fail', fail);
      },
      (count, smsList) => {
        // console.log('count', count);
        //console.log('smsList', JSON.parse(smsList));
      },
    );
  }, []);

  useEffect(() => {
    const subscribe = SmsListener.addListener(message => {
      console.log('get message', message);
      console.log(message.body);

      setMessage({
        body: message.body,
        address: message.originatingAddress,
        timestamp: message.timestamp,
      });
    });

    //console.log('messageData:', messageData);
    return () => subscribe.remove();
  }, []);

  let body = messageData.body;
  console.log('messageData.body:', body);

  useEffect(() => {
    if (body.includes('승인') || !body.includes('취소')) {
      //body.replace(/취소/, '');

      body = body.replace(/\[Web발신\]/, '');
      body = body.replace(/\(Web발신\)/, '');
      body = body.replace(/\(주\)/, '');
      body = body.replace(/체크카드출금/, '');
      body = body.replace(/누적[\s:\-]?[\d,\-]+원/, '');
      body = body.replace(/누적-[\d,\-]+원/, '');
      body = body.replace(/잔액[\d,\-]+원?/, '');
      body = body.replace(/[ㄱ-ㅎ|가-힣|a-z|A-Z]+\([\d\*]{4}\)/gi, '');
      body = body.replace(/\S+은행/, '');
      body = body.replace(/KEB하나/, '');
      body = body.replace(/\S+카드/, '');
      body = body.replace(/일시불/, '');
      body = body.replace(/사용/, '');
      body = body.replace(/일시불/, '');
      body = body.replace(/\(금액\)/, '');
      body = body.replace(/^잔액/, '');
      body = body.replace(/\[[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+\]/, '');
      body = body.replace(/[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+승인/, '');
      body = body.replace(/[*ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+점/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\*]{2,4}님/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]?님/, '');
      body = body.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]?/, '');

      const moneyrule = /[\d,\-]+원/;
      let money = moneyrule.exec(body);
      money = String(money);
      setDmoney(money);
      console.log('money:', money); //완료

      body = body.replace(moneyrule, '');

      const timerule = /\d\d:\d\d/;
      let time = timerule.exec(body);
      time = String(time);
      console.log('time:', time); //완료

      body = body.replace(timerule, '');

      const daterule = /\d\d\/\d\d/;
      let date = daterule.exec(body);
      date = String(date);
      console.log('date:', date); //완료

      body = body.replace(daterule, '');

      let shopname = body.trim();
      shopname = shopname.replace(/\(\)/, '');
      setDshop(shopname);
      console.log('shopname:', shopname);

      setTimeout(() => {
        if (shopname) {
          fetch(`http://192.168.219.169:8080/api/crawl/${shopname}`)
            .then(res => res.json())
            .then(data => {
              console.log(data);
              console.log(data.class);
              setCname(data.class);
            });
        }
      }, 3000);

      setTimeout(() => {
        if (cname) {
          let search_word = cname;
          console.log('search_word', search_word);
          let answer = false;
          let answer_keyword = '';

          // 분류 기준 key, value 구분
          let classification_list_keys = [];
          for (let i = 0; i < 13; i++) {
            classification_list_keys[i] = Object.keys(classification_list)[i];
          }
          let classification_list_values = [];
          for (let i = 0; i < 13; i++) {
            classification_list_values[i] = Object.values(classification_list)[
              i
            ];
          }
          // 키워드 분류
          for (let i = 0; i < 13; i++) {
            answer_keyword = '';
            answer = classification_list_values[i].includes(search_word);
            if (answer === true) {
              answer_keyword = Object.keys(classification_list)[i];
              //setDcategory(answer_keyword);
              console.log('answer:', answer_keyword);
              setDcategory(answer_keyword);
              //saveData();

              break;
            }
          }
          //let shop = JSON.stringify(shopname);
        }
      }, 5000);

      setTimeout(() => {
        if (dcategory) {
          let user = auth().currentUser;
          database()
            .ref(`/user_wallet/${user.uid}/@${messageData.timestamp}`)
            .set({
              category: dcategory,
              shop: dshop,
              money: dmoney,
              class: cname,
            })
            .then(() => {
              console.log('saved');
            });

          monthlyAcount();

          setCname(null);
          setDshop(null);
          setDmoney(null);
          setDcategory(null);
        }
      }, 5000);
    }
  }, [body]);

  /*
  const saveData = () => {
    let user = auth().currentUser;

    if (body && user && cname && dcategory) {
      database().ref(`/user_wallet/${user.uid}/@${messageData.timestamp}`).set({
        category: dcategory,
        shop: dshop,
        money: dmoney,
        class: cname,
      });

      console.log('saved');

      monthlyAcount();

      setCname(null);
      setDshop(null);
      setDmoney(null);
      setDcategory(null);
    }
  };




  useEffect(() => {
    let user = auth().currentUser;

    if (body && user && cname && dcategory) {
      database().ref(`/user_wallet/${user.uid}/@${messageData.timestamp}`).set({
        category: dcategory,
        shop: dshop,
        money: dmoney,
        class: cname,
      });

      console.log('saved');

      monthlyAcount();

      setCname(null);
      setDshop(null);
      setDmoney(null);
      setDcategory(null);
    }
  }, [dcategory]);


  */

  const setData = (
    category: string,
    date: Date,
    shop: string,
    money: string,
  ) => {
    let timestamp = date.getTime();
    let user = auth().currentUser;
    console.log(date);
    console.log(timestamp);

    if (user) {
      database().ref(`/user_wallet/${user.uid}/@${timestamp}`).set({
        category: category,
        date: date,
        shop: shop,
        money: money,
      });

      monthlyAcount();
    }
  };

  return (
    <SMSDataContext.Provider
      value={{
        setData,
      }}>
      {children}
    </SMSDataContext.Provider>
  );
};

export {SMSDataContextProvider, SMSDataContext};
