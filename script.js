var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
  //center: new kakao.maps.LatLng(35.1795543, 129.0756416), //지도의 중심좌표.
  center: new kakao.maps.LatLng(35.16055, 129.06), //지도의 중심좌표.
  level: 8 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴



/*
**********************************************************
1. 지도 생성 & 확대 축소 컨트롤러
https://apis.map.kakao.com/web/sample/addMapControl/

*/

// 지도에 확대 축소 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/*
**********************************************************
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
*/
var xhr = new XMLHttpRequest();
var url = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=dIxYGWk6anuy3OA5A9hjwuQHTAugxCO047tAFk7aSYeAs8ypTXaP2%2BZUgx8xI7CZjskNencLa1X7uldkFvuIBA%3D%3D&pageNo=1&numOfRows=50&resultType=json'; /*URL*/
xhr.open('GET', url);

xhr.responseType='json';
xhr.onload = () => {
    var data = xhr.response.getFoodKr.item;
    const dataSet = [];

    for(var i=0;i<data.length;++i){
      // console.log(data[i]);
        var marker = new kakao.maps.Marker({
          map : map,
          position: new kakao.maps.LatLng(data[i].LAT,data[i].LNG),
                });   

                 dataSet.push(
                  {
                    category : data[i].GUGUN_NM,
                  }
                 )
            }
            
      for(var i=0;i<data.length;++i){
        var marker = new kakao.maps.Marker({
          map : map,
          position: new kakao.maps.LatLng(data[i].LAT,data[i].LNG),
                });  
            
            
            var content = `<div class="wrap">
                <div class="info"> 
                    <div class="title">  
                      ${data[i].MAIN_TITLE} 
                    </div>
                    <div class="body">
                        <div class="img">
                            <img src="${data[i].MAIN_IMG_THUMB}" width="73" height="70">
                       </div>
                        <div class="desc">
                            <div class="ellipsis">${data[i].ADDR1}</div>
                            <div class="ellipsis">${data[i].CNTCT_TEL}</div>
                            <div class="ellipsis">${data[i].RPRSNTV_MENU}</div>
                        </div>
                        <div class="desc">
                          
                        </div>
                    </div> 
                </div>    
            </div>`;
            
            var overlay = new kakao.maps.CustomOverlay({
              map: map,
              position: marker.getPosition(),
              content : content
          });
          
          kakao.maps.event.addListener(
            marker,
            "click",
            makeOverListener(map, marker, overlay)
          );
          kakao.maps.event.addListener(
            map, "click",
            makeOutListener(overlay)
          );
      }      
    
      const categoryMap = {
        center : "중구",
        east : "양식",
        west:  "서구",
        yeongdo:  "영도구",
        jingu: "부산진구",
        donglae: "동래구",
        yeonje :"연제구",
        geumjeong :  "금정구",
        north: "북구",
        sasang: "사상구",
        saha:  "사하구",
        gangseo :"강서구",
        south: "남구",
        haeundae: "해운대구",
        suyeong: "수영구",
      };

      const categoryList = document.querySelector(".category-list");
      categoryList.addEventListener("click", categoryHandler);

      function categoryHandler(event) {
        const categoryId = event.target.id;
        const category = categoryMap[categoryId];
      
        // 데이터 분류
        let categorizedDataSet = [];
        for (let data of dataSet) {
          if (data.category === category) {
            categorizedDataSet.push(data);
          }
        }
      
        // 기존 마커 삭제
        closeMarker();
      
      
        // 기존 오버레이 닫기
        closeoverlay();
        // 실행
        marker.setMap(categorizedDataSet)
};
function makeOverListener(map, marker, overlay) {
  return function () {
    // - 클릭시 다른 오버레이 닫기
    closeoverlay();
    overlay.setMap(map);
  };
}
let overlayArray = [] //오버레이를 관리할 배열
function closeoverlay() {
  for (let overlay of overlayArray) {
    overlay.setMap(null);
  }

}

// 오버레이를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(overlay) {
  return function () {
    overlay.setMap(null);
  };
}
let markerArray = [];
function closeMarker() {
  for (marker of markerArray) {
    marker.setMap(null)
  }
}
}
  xhr.send();
