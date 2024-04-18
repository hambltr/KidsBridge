import React, {useState, useEffect} from 'react';
import Base from "../basic_component/base";

// 하위 컴포넌트들 (WeatherInfo, PollutionInfo)도 유사한 방식으로 구성될 수 있습니다.
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [pollutionData, setPollutionData] = useState(null);

  // useEffect(() => {
  //   // 백엔드로부터 날씨 및 미세먼지 데이터를 가져오는 함수
  //   const fetchData = async () => {
  //     const weatherResponse = await fetch('/path/to/weather/data');
  //     const weatherData = await weatherResponse.json();
  //     setWeatherData(weatherData);
  //
  //     const pollutionResponse = await fetch('/path/to/pollution/data');
  //     const pollutionData = await pollutionResponse.json();
  //     setPollutionData(pollutionData);
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <Base>
      <div>미세먼지표출창~~</div>
      <div>
        {
          weatherData && (
            <div>
              <h2>날씨 정보</h2>
              <p>기온: {weatherData.T1H}°C</p>
              <p>습도: {weatherData.REH}%</p>
              {/* 하늘 상태와 강수 형태에 대한 조건부 렌더링 */}
              <p>하늘 상태: {/* 하늘 상태에 따른 문자열 표시 */}</p>
              <p>강수 형태: {/* 강수 형태에 따른 문자열 표시 */}</p>
            </div>
          )
        }
        {pollutionData && (
          <div>
            <h2>미세먼지 정보</h2>
            <p>미세먼지 농도: {pollutionData.pm10Value}μg/m³</p>
            <p>초미세먼지 농도: {pollutionData.pm25Value}μg/m³</p>
            {/* 미세먼지 및 초미세먼지 등급에 대한 조건부 렌더링 */}
          </div>
        )
        }
      </div>
    </Base>
  );
};

export default Weather;
