import React, { useState } from 'react';
import {ArrowLeft} from "react-bootstrap-icons";
import SelectBtn from "./board_select_btn";
import {useNavigate} from "react-router-dom";
import WriteFormWithEditor from './write';

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
                         children,
                         detailTitleStyle,
                         detailContentStyle,
                         showWriteBtn
                       }) {


  const componentStyle = {
    background: backgroundColor, // 배경색 설정 props
  };

  const navigate = useNavigate();

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  // 모달 열기
  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  // 모달 닫기
  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 글 저장 처리
  const handleWriteSubmit = (title, content) => {
    console.log("저장된 글:", title, content);
    // firebase 저장 로직 추가해야함
    setIsWriteModalOpen(false);
  };

  // const clicked = () => {
  //   console.log("click!");
  // }

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
        {showWriteBtn === true ?
          <button className="writeBtn btn_basic" onClick={openWriteModal}>
            글쓰기
          </button> : null
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
          <div className="detail_title">
            {showContentsTitle}
          </div>
          <div className="detail_contents">
            {showContents}
          </div>
          <div className="inner_grid">
            {children}
            {isWriteModalOpen && (
              <div className="modal_write">
                <WriteFormWithEditor onSubmit={handleWriteSubmit} onCancel={closeWriteModal} />
              </div>
            )}
          </div>
          <div className="witer_info">
            <div>
              {showAuthor}
            </div>
            <div>
              {showTime}
            </div>
          </div>
        </div>
      </div>
      <div className="margin_gap"/>
    </div>
  );
}

export default BaseBoardGrid;
