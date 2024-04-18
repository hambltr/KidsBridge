import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrevNextBtn from "./prev_next_btn";

function HalfCardBoard({ data }) {
  const navigate = useNavigate();
  const itemsPerPage = 12; // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스, 0부터 시작
  const [sortedData, setSortedData] = useState([]); // 정렬된 데이터를 담을 상태

  useEffect(() => {
    // 페이지 번호가 변경될 때 스무스하게 페이지 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 스무스 스크롤링 효과 적용
    });
  }, [currentPage]);

  useEffect(() => {
    // 데이터를 받아온 후에 시간(time) 값을 기준으로 최신순으로 정렬
    const sorted = data.slice().sort((a, b) => new Date(b.time) - new Date(a.time));
    setSortedData(sorted);
  }, [data]);

  // 현재 페이지에 따라 표시할 데이터 계산
  const paginatedData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // 이미지 소스를 처리하는 함수
  const getImageSrc = (src) => Array.isArray(src) ? src[0] : src;

  // 페이지네이션을 위한 함수들
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0)); // 이전 페이지로, 0보다 작아지지 않게
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(sortedData.length / itemsPerPage) - 1; // 최대 페이지 인덱스
    setCurrentPage((prev) => Math.min(prev + 1, maxPage)); // 다음 페이지로, 최대 페이지를 넘지 않게
  };


  return (
    <section>
      <div className="board_flex_wrap">
        {paginatedData.map((item, index) => (
          <button key={item.id}
                  className="half_board_btn"
                  onClick={() => navigate(`/service/gallery/${item.id}`)}>
            <div className="board_img_card">
              <div>
                <img src={getImageSrc(item.src)} alt={`pic ${index}`}/>
              </div>
              <div className="board_contents_info">
                <h3>{item.title}</h3>
                <div className="board_inner_info">
                  <div className="board_inner_profile" style={{backgroundImage: `url(${getImageSrc(item.src)})`}}/>
                  <div>{item.author}</div>
                </div>
                <div className="board_inner_info_time">
                  {(item.time)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {sortedData.length > itemsPerPage && (
        <PrevNextBtn
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          currentPage={currentPage}
          maxPage={Math.ceil(sortedData.length / itemsPerPage) - 1}
        />
      )}
    </section>
  );
}

export default HalfCardBoard;
