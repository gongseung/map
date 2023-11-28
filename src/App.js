import './App.css';
import React, { useState, useEffect } from "react";
import Filter from './component/filter';
import Side from './component/side';
function App() {
  const [modal, setModal] = useState(false);
  const [clickMarker, setClickMarker] = useState(false);
  const [festival, setFestival] = useState([]);
  const { kakao } = window;
  const changeModal = () => {
    setModal(false);
  };
  const [markercontent, setMarkerContent] = useState({
    festivalName: "",
    festivalPlace: "",
    festivalSday: "",
    festivalEday: "",
    festivalContent: ""
  });
  const MarkerClickEvent = () => {
    const updatedMarkerContent = {
      festivalName: festival.festivalName,
      festivalPlace: festival.festivalPlace,
      festivalSday: festival.festivalSday,
      festivalEday: festival.festivalEday,
      festivalContent: festival.festivalContent,
    };
    setMarkerContent(updatedMarkerContent);
    setClickMarker(false);
  }

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.365264512305174,
    longitude: 127.10676860117488,
  });

  
  useEffect(() => {
    fetch('/festival') // 요청 경로 수정
      .then(response => response.json())
      .then(data => {
        setFestival(data);
        console.log('festival:', data);
      })
      .catch(error =>
        console.log('축제 데이터를 가져오는 중 오류 발생:', error)
      );
  }, []);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        markerPosition.latitude,
        markerPosition.longitude
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPositionLatLng = new kakao.maps.LatLng(
      markerPosition.latitude,
      markerPosition.longitude
    );

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      position: markerPositionLatLng,
    });

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, 'click', () => { return setMarkerContent(markercontent),setClickMarker(true); });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  }, [markerPosition]);

  return (
    <div className="App">
      <div className="filter_wrap">
        <button
          className="filter_btn"
          onClick={() => setModal(true)}
        ><img src="../../img/logo1.png"></img></button>
        {festival.map(festival => (
          <div key={festival.id}>{festival.name}</div>
        ))}
      </div>

      {modal ? (
        <Filter
          modal={modal}
          changeModal={changeModal}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      ) : null}

      {clickMarker ? <Side 
      clickMarker={clickMarker}
      MarkerClickEvent={MarkerClickEvent}
      /> : null}

      <div>
        <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
      </div>
    </div>
  );
}

export default App;