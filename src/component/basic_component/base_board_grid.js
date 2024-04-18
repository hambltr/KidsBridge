import React from 'react';
import {ArrowLeft} from "react-bootstrap-icons";
import SelectBtn from "./board_select_btn";
import {useNavigate} from "react-router-dom";

function BaseBoardGrid({
                         showTitle,
                         showRefreshButton,
                         showAllButton,
                         backgroundColor,
                         showSelectBtn,
                         onGridClick,
                         onListClick,
                         showContentsTitle,
                         showContents,
                         showAuthor,
                         showTime,
                         showBackBtn,
                         viewMode,
                         children
                       }) {


  const componentStyle = {
    background: backgroundColor, // 배경색 설정 props
  };

  const navigate = useNavigate();

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="top_sticky_title">
        {showBackBtn === true ?
          <div className="top_sticky_with_back_title">
            <button onClick={goBack}>
              <ArrowLeft/>
            </button>
            <div>
              {showTitle}
            </div>
          </div> :
          <div>
            {showTitle}
          </div>
        }
      </div>
      {showSelectBtn &&
        <SelectBtn onGridClick={onGridClick}
                   onListClick={onListClick}
                   viewMode={viewMode}
        />
      }
      <div className="components_wrap non_box_shadow" style={componentStyle}>
        <div className="whole_grid">
          <div className="components_title">
            <div className="button_wrap">
              {showRefreshButton && <button>새로고침</button>}
              {showAllButton && <button>전체보기</button>}
            </div>
          </div>
          <div>
            {showContentsTitle}
          </div>
          <div>
            {showContents}
          </div>
          <div className="inner_grid">
            {children}
          </div>
          <div>
            {showAuthor}
            {showTime}
          </div>
        </div>
      </div>
      <div className="margin_gap"/>
    </div>
  );
}

export default BaseBoardGrid;
