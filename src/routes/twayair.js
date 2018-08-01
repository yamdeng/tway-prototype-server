const express = require('express');
const _ = require('lodash');
const router = express.Router();
const logger = require('../utils/logger');

// 목적지 선택 정보
let destinationInfos = [
    {
        id:'1', 
        name: '국내',
        details: [
            {
                id: '1-1',
                name: '국내-1',
                airportName: '국내-1 공항',
                airName: '국내-1-air'
            },
            {
                id: '1-2',
                name: '국내-2 공항',
                airportName: '국내-2 공항',
                airName: '국내-2-air'
            },
            {
                id: '1-3',
                name: '국내-3',
                airportName: '국내-3 공항',
                airName: '국내-3-air'
            },
            {
                id: '1-4',
                name: '국내-4',
                airportName: '국내-4 공항',
                airName: '국내-4-air'
            }
        ]        
    },
    {
        id: '2',
        name: '아시아단거리(일본)',
        details: [
            {
                id: '2-1',
                name: '도쿄(나리타)',
                airportName: '나리타국제공항',
                airName : 'NRT'                
            },
            {
                id: '2-2',
                name: '도쿄(하네다)',
                airportName: '하네다국제공항',
                airName: 'HND'
            },
            {
                id: '2-3',
                name: '오사카',
                airportName: '간사이국제공항',
                airName: 'KIX'
            },
            {
                id: '2-4',
                name: '후쿠오카',
                airportName: '후쿠오카공항',
                airName: 'FUK'
            },
            {
                id: '2-5',
                name: '오키니와',
                airportName: '나하공항',
                airName: 'OKA'
            }
        ]
    },
    {
        id: '3',
        name: '아시아중단거리',
        details: [
            {
                id: '3-1',
                name: '중국-1',
                airportName: '중국-1 공항',
                airName: '중국-1-air'
            },
            {
                id: '3-2',
                name: '중국-2',
                airportName: '중국-2 공항',
                airName: '중국-2-air'
            },
            {
                id: '3-3',
                name: '중국-3',
                airportName: '중국-3 공항',
                airName: '중국-3-air'
            },
            {
                id: '3-4',
                name: '중국-4',
                airportName: '중국-4 공항',
                airName: '중국-4-air'
            },
            {
                id: '3-5',
                name: '중국-5',
                airportName: '중국-5 공항',
                airName: '중국-5-air'
            },
        ]
    }, 
    {
        id: '4',
        name: '아시아장거리',
        details: [
            {
                id: '4-1',
                name: '필리핀-1',
                airportName: '필리핀-1 공항',
                airName: '필리핀-1-air'
            },
            {
                id: '4-2',
                name: '필리핀-2',
                airportName: '필리핀-2 공항',
                airName: '필리핀-2-air'
            },
            {
                id: '4-3',
                name: '필리핀-3',
                airportName: '필리핀-3 공항',
                airName: '필리핀-3-air'
            },
        ]
    },
    {
        id: '5',
        name: '대양주/러시아',
        details: [
            {
                id: '5-1',
                name: '러시아',
                airportName: '모스코바 공항',
                airName: 'RUS-MOK-air'
            },
            {
                id: '5-2',
                name: '크로아티아',
                airportName: '크로아 공항',
                airName: 'KRA-air'
            },
            {
                id: '5-3',
                name: '체코',
                airportName: '체코 공항',
                airName: 'CH-air'
            },
        ]
    },
];


// 인삿말
router.get('/greeting', function(req, res) {
    res.send({
        message: '안녕하세요. 티웨이 항공사입니다. 티켓 예매를 시작합니다' 
    });
});

// 목적지 정보 : 1 depth
router.get('/destinations', function (req, res) {
    let firstDepthDestinationInfos = destinationInfos.map((info) => {
        let destinationInfos = {
            id: info.id,
            name: info.name,
        };
        return destinationInfos;
    });
    res.send(firstDepthDestinationInfos);
});

// 목적지 정보 : 2 depth
router.get('/destinations/:id', function (req, res) {
    let findDestinationInfo = _.find(destinationInfos, {
        id: req.params.id
    });
    res.send(findDestinationInfo.details);
});

// 예메 검색결과 : ticketSearch

/*

      @.파라미터 정보
      startPlace: 출발지(id 식별자)
      endPlace: 목적지(id 식별자)
      goDate: 가는날(2018-01-01)
      comingDate: 오는날(2018-01-01)
      passengerAdultNumber: 성인 탑승인원 수
      passengerBabyNumber: 유아 탑승인원 수
      passengerSmallBabyNumber: 소아 탑승인원 수
      isOneWay: 편도 여부

*/
router.get('/ticketSearch', function (req, res) {
    const startPlace = req.query.startPlace;
    const endPlace = req.query.endPlace;
    const goDate = req.query.goDate;
    const comingDate = req.query.comingDate;
    const passengerAdultNumber = req.query.passengerAdultNumber;
    const passengerBabyNumber = req.query.passengerBabyNumber;
    const passengerSmallBabyNumber = req.query.passengerSmallBabyNumber;
    const isOneWay = req.query.isOneWay && req.query.isOneWay === '1' ? true : false;
    logger.info('startPlace : ' + startPlace + ' @endPlace : ' + endPlace + ' @goDate : ' + goDate + ' @comingDate : ' + comingDate + ' @passengerAdultNumber : ' + passengerAdultNumber + ' @passengerBabyNumber : ' + passengerBabyNumber + ' @passengerSmallBabyNumber : ' + passengerSmallBabyNumber + ' @isOneWay : ' + isOneWay);
    let result = {};
    let goDetails = getTicketSearchTestData();
    let comingDetails = getTicketSearchTestData();

    // 편도일 경우
    if(isOneWay) {
        result = {
            goInfo:{
                details: goDetails
            }
        };
    } else {
        // 왕복일 경우
        result = {
            goInfo: {
                details: goDetails
            },
            comingInfo: {
                details: comingDetails
            }
        };
    }

    res.send(result);
});

router.post('/ticketSearch', function (req, res) {
    const startPlace = req.body.startPlace;
    const endPlace = req.body.endPlace;
    const goDate = req.body.goDate;
    const comingDate = req.body.comingDate;
    const passengerInfo = req.body.passengerInfo;

    const isOneWay = req.body.isOneWay ? true : false;
    logger.info('startPlace : ' + startPlace + ' @endPlace : ' + endPlace + ' @goDate : ' + goDate + ' @comingDate : ' + comingDate + ' @passengerInfo : ' + JSON.stringify(passengerInfo) + ' @isOneWay : ' + isOneWay);

    let result = {};
    let goDetails = getTicketSearchTestData();
    let comingDetails = getTicketSearchTestData();

    // 편도일 경우
    if (isOneWay) {
        result = {
            goInfo: {
                details: goDetails
            }
        };
    } else {
        // 왕복일 경우
        result = {
            goInfo: {
                details: goDetails
            },
            comingInfo: {
                details: comingDetails
            }
        };
    }

    res.send(result);
});

function getTicketSearchTestData() {

    // 비행기정보 : airName ---> 용성비행기
    // 직항여부 : isDirect ---> true / false
    // 날짜 : ticketDate ---> '2018-01-01'
    // 시간 : ticketTime ---> '00:10'
    // 도착시간 : arriveTime ---> '15:10'
    // 걸린시간 : airTime ---> '15h 00m'

    // eventFareInfo : 이벤트 운임, smartFareInfo : 스마트 운임, 일반운임 : normalFareInfo 
    // 매진여부 : isSoldout ---> true / false
    // 금액 : amt ---> 5000

    // 항공운임료 : airFraeAmt
    // 유류할증료 : oilPlusAmt
    // 공항시설 사용료 : airFaciUseAmt

    let testData = [];
    for (let index = 0; index < 15; index++) {

        let info = {};
        info.airName = 'tair-' + (index + 1);
        info.isDirect = index % 2 === 0 ? true : false;
        if ((index + 1) < 10) {
            info.ticketDate = '18.01.0' + (index + 1);
        } else {
            info.ticketDate = '18.01.' + (index + 1);
        }        

        info.eventFareInfo = {
            isSoldout: (index % 2 === 0 ? false : true),
            amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
        };

        info.smartFareInfo = {
            isSoldout: (index % 2 === 0 ? false : true),
            amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
        };

        info.normalFareInfo = {
            isSoldout: (index % 2 === 0 ? false : true),
            amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
        };

        info.airFraeAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
        info.oilPlusAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
        info.airFaciUseAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
        info.amt = ((Math.floor(Math.random() * 10) + 1) * 1000);

        info.ticketTime = '00:10';
        info.arriveTime = '15:10';
        info.airTime = '15h 00m';

        info.timeList = [];
        for(let timeIndex=0; timeIndex<7; timeIndex++) {
            let timeInfo = {};

            timeInfo.airName = 'tair-' + (index + 1);
            timeInfo.isDirect = index % 2 === 0 ? true : false;
            timeInfo.ticketDate = info.ticketDate;
            // if ((index + 1) < 10) {
            //     timeInfo.ticketDate = '18.01.0' + (index + 1);
            // } else {
            //     timeInfo.ticketDate = '18.01.' + (index + 1);
            // }        

            timeInfo.eventFareInfo = {
                isSoldout: (index % 2 === 0 ? false : true),
                amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
            };

            timeInfo.smartFareInfo = {
                isSoldout: (index % 2 === 0 ? false : true),
                amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
            };

            timeInfo.normalFareInfo = {
                isSoldout: (index % 2 === 0 ? false : true),
                amt: ((Math.floor(Math.random() * 10) + 1) * 10000)
            };

            timeInfo.airFraeAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
            timeInfo.oilPlusAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
            timeInfo.airFaciUseAmt = ((Math.floor(Math.random() * 10) + 1) * 1000);
            timeInfo.amt = ((Math.floor(Math.random() * 10) + 1) * 1000);

            timeInfo.ticketTime = '0' + timeIndex + ':10';
            timeInfo.arriveTime = '1' + timeIndex + ':10';
            timeInfo.airTime = '10h 00m';

            info.timeList.push(timeInfo);
        }

        testData.push(info);
    }

    return testData;
}


module.exports = router;
