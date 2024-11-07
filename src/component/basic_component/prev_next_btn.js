import { ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";
import React from "react";

function PrevNextBtn({ goToPrevPage, goToNextPage, currentPage, maxPage }) {
  return (
    <div className="btn_wrap">
      <button className="btn_basic" onClick={goToPrevPage} disabled={currentPage === 0}>
        <div>
          <ChevronCompactLeft/>
          <span>이전</span>
        </div>
      </button>
      <button className="btn_basic" onClick={goToNextPage} disabled={currentPage === maxPage}>
        <div>
          <span>다음</span>
          <ChevronCompactRight/>
        </div>
      </button>
    </div>
  );
}

export default PrevNextBtn;
