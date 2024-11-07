import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Base from "./base";
import Mini from "./inner_mini";
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';

function BoardList({ data, SvgName1, SvgName2 }) {
  const navigate = useNavigate();
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // 데이터 정렬 시 sortTime 필드를 기준으로 최신순으로 정렬
    const sorted = data.slice().sort((a, b) => {
      const dateA = new Date(a.sortTime); // 문자열을 Date 객체로 변환
      const dateB = new Date(b.sortTime);

      return dateB - dateA; // 최신순 정렬
    });

    setSortedData(sorted);
  }, [data]);

  const maxPage = Math.ceil(sortedData.length / itemsPerPage) - 1;

  const prevPage = () => {
    setCurrentPage(current => Math.max(current - 1, 0));
  };

  const nextPage = () => {
    setCurrentPage(current => Math.min(current + 1, maxPage));
  };

  const currentData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Base innerStyle={{ height: "1050px" }}>
      {currentData.map((item, index) => (
        <Mini
          key={item.id}
          item={item}
          SvgName1={SvgName1}
          SvgName2={SvgName2}
          innerStyle={{}}
          showPics={true}
          pics={[{ src: item.src }]}
          onClick={() => navigate(`/service/gallery/${item.id}`)}
        />
      ))}
      {(sortedData.length > itemsPerPage) && (
        <div className="btn_wrap">
          <button className="btn_basic" onClick={prevPage} disabled={currentPage === 0}>
            <div>
              <ChevronCompactLeft />
              <span>이전</span>
            </div>
          </button>
          <button className="btn_basic" onClick={nextPage} disabled={currentPage >= maxPage}>
            <div>
              <span>다음</span>
              <ChevronCompactRight />
            </div>
          </button>
        </div>
      )}
    </Base>
  );
}

export default BoardList;
