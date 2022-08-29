/*
1. 지도 생성 & 확대 축소 컨트롤러
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
3. 여러개 마커 찍기
    - 주소 - 좌표 변환
4. 마커에 인포윈도우 붙이기
    - 마커에 클릭 이벤트로 인포윈도우
    - url에서 섬네일 따기
    - 클릭한 마커로 지도 센터 이동
5. 카테고리 분류
*/

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.5512, 126.9882), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/
const dataSet = [
  {
    title: "희락돈까스",
    address: "서울 영등포구 양산로 210",
    url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
    category: "양식",
  },
  {
    title: "즉석우동짜장",
    address: "서울 영등포구 대방천로 260",
    url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
    category: "한식",
  },
  {
    title: "아카사카",
    address: "서울 서초구 서초대로74길 23",
    url: "https://www.youtube.com/watch?v=1YOJbOUR4vw&t=88s",
    category: "일식",
  },
];

//주소-좌표 변환 객체 생성
//비동기 처리 결과로 좌표값을 가져와야 함
var geocoder = new kakao.maps.services.Geocoder();

function getCoordsByAddress(address) {
	return new Promise((resolve, reject) => {
		geocoder.addressSearch(address, function(result, status) {
			if (status == kakao.maps.services.Status.OK) {
				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				return resolve(coords);
			}
			reject(new Error("getCoordsByAddress Error: not valid address"));
		})
	})
};

// async 함수 사용하는 거랑 뭔 차이??
// for (var i = 0; i < dataSet.length; i++) {
// 	getCoordsByAddress(dataSet[i].address)
// 		.then((coords) => {
// 			var marker = new kakao.maps.Marker({
// 				map: map,
// 				position: coords,
// 			})
// 		})
// 		.catch((error) => console.log(error));
// }

async function setMap() {
	for (var i = 0; i < dataSet.length; i++) {
		let position = await getCoordsByAddress(dataSet[i].address) //await 구문에서는 resolve가 나와야 “내가 할 일이 끝났다”
		console.log(position);

		var marker = new kakao.maps.Marker({
			map: map,
			position: position,
		});
	}
}

setMap();
