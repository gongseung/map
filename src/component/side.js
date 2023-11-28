import { useState } from "react";
import '../css/side.css'
const { kakao } = window;
function Side(props) { 
    const { festival, setSelectedFestival } = props;
  let {clickMarker,MarkerClickEvent,markercontent,setMarkerContent} = props;

  return (
      <div className="side">
        <div>
            {/* <h2>축제 정보</h2> */}
        </div>
        
          <div>
            
          <h3>{festival.festivalName}</h3>
          <img className = "img" src = {festival.festivalImage}/>
          </div>
          <div className="eventName">
          
          </div>
          <table class ="table" >
            <colgroup>  
                <col class="wp40">
                </col>
            </colgroup>
            <tbody>
                <tr>
                    <th>축제명</th>
                    <td>{festival.festivalName}</td>
                </tr>
                <tr>
                    <th>축제장소</th>
                    <td>{festival.festivalPlace}</td>
                </tr>
                <tr>
                    <th>시작일</th>
                    <td>{festival.festivalSday}</td>
                </tr>
                <tr>
                    <th>종료일</th>
                    <td>{festival.festivalEday}</td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>{festival.festivalContent}</td>
                </tr>
        </tbody>
          </table>
          <button className="f_close" onClick={() => setSelectedFestival(null)}>X</button>
      </div>

      
  );
  }

export default Side;