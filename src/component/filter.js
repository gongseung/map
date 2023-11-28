import { useState } from "react";
import '../css/filter.css'
import Kakao from "./Kakao";
import Side from './side';
const { kakao } = window;
function Filter(props) {
    let [tab, setTab] = useState(0);
    let { modal, changeModal } = props;
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDivide, setSelectedDivide] = useState("");
    const [festivalData, setFestivalData] = useState([]);
    const [selectedFestival, setSelectedFestival] = useState(null);

    const filterDataByDivide = (data) => {
        return data.filter((festival) => festival.festivaldivide === selectedDivide);
    };

    const filterDataMonth = (data) => {
        return data.filter((festival) => festival.festivalSmonth === selectedMonth);
    };

    const fetchDataAndFilter = () => {
        fetch("/festival")
            .then((response) => response.json())
            .then((data) => {
                const filteredData = filterDataByDivide(data);
                setFestivalData(filteredData);
            })
            .catch((error) =>
                console.log("축제 데이터를 가져오는 중 오류 발생 필터:", error)
            );
    };

    const fetchDataAndFilter1 = () => {
        fetch("/festival")
            .then((response) => response.json())
            .then((data) => {
                const filteredData = filterDataMonth(data);
                setFestivalData(filteredData);
            })
            .catch((error) =>
                console.log("축제 데이터를 가져오는 중 오류 발생 필터:", error)
            );
    };

    const LocatinoButtonClick = (divide) => {
        setSelectedDivide(divide);
        fetchDataAndFilter();
    };

    const MonthButtonClick = (month) => {
        setSelectedMonth(month);
        fetchDataAndFilter1();
    };

    return (
        <div className="filter">
            <div className="f_header">
                <img src="../../img/logoblack.png"></img>
            </div>
            <ul className="tab_map">
                <li id="month_tab">
                    <button className="locButton" onClick={() => { return setTab(0), setFestivalData([]); }}>지역별</button>
                </li>
                <li id="location_tab">
                    <button className="monthButton" onClick={() => { return setTab(1), setFestivalData([]); }}>월 별</button>
                </li>
            </ul>
            <div className="f_content">
                <div className="mCustomScrollbar">
                    <TabContent tab={tab} LocatinoButtonClick={LocatinoButtonClick} MonthButtonClick={MonthButtonClick} />
                </div>
                <div className="title_divide">
                    <h2>축제</h2>
                    <hr></hr>
                    {festivalData.length > 0 ? (
                        <ul>
                            {festivalData.map((festival) => (
                                <li key={festival.id}>
                                    <button onClick={() => {
                                        const newMarkerPosition = {
                                            latitude: festival.festivalLati, // 새로운 위도 값
                                            longitude: festival.festivalLong, // 새로운 경도 값
                                        };
                                        setSelectedFestival(festival);
                                        props.setMarkerPosition(newMarkerPosition);
                                    }}>{festival.festivalName}</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>축제를 찾을 수 없습니다.</p>
                    )}
                </div>
            </div>
            <div className="f_close">
            <button className="f_closebtn" onClick={changeModal}>X</button></div>
            {selectedFestival && (
        <Side
          festival={selectedFestival}
          setSelectedFestival={setSelectedFestival}
        />
      )}
      
        </div >
        
    )
}

function TabContent(props) {
    const { LocatinoButtonClick, MonthButtonClick } = props;

    if (props.tab == 0) {
        return (
            <div>
                <ul className="category_loc">
                    <li>
                        <button onClick={() => LocatinoButtonClick("안동")}>안동</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("영천")}>영천</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("구미")}>구미</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("군")}>군</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("포항")}>포항</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("김천")}>김천</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("경산")}>경산</button>
                    </li>
                    <li>
                        <button onClick={() => LocatinoButtonClick("경주")}>경주</button>
                    </li>
                </ul>
            </div>

        )
    }
    if (props.tab == 1) {
        return (
            <ul className="category_month">
                <li>
                    <button onClick={() => MonthButtonClick(1)}>1</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(2)}>2</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(3)}>3</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(4)}>4</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(5)}>5</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(6)}>6</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(7)}>7</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(8)}>8</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(9)}>9</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(10)}>10</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(11)}>11</button>
                </li>
                <li>
                    <button onClick={() => MonthButtonClick(12)}>12</button>
                </li>
            </ul>
        )
    }
}


export default Filter;