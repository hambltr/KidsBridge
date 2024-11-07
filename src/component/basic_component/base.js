import React from 'react';

function Base({showRefreshButton, showAllButton, showTitle, innerStyle = {}, children}) {

  return (
    <div className="components_wrap">
      <div>
        <div className="components_title">
          <div>
            <h3>{showTitle}</h3>
          </div>
          <div className="button_wrap">
            {showRefreshButton && <button className="btn_classic">새로고침</button>}
            {showAllButton && <button className="btn_classic">전체보기</button>}
          </div>
        </div>
        <div className="inner_news" style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Base;
