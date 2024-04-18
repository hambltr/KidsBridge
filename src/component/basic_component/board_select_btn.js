import { GridFill, List } from "react-bootstrap-icons";
import React from "react";

function SelectBtn({ onGridClick, onListClick, viewMode }) {

  return (
    <div className="board_button_box_guide">
      <div className="right_select_button_wrap">
        <div className="inner_select_button">
          <div onClick={onGridClick}
               className={viewMode === 'grid' ? 'button-selected' : 'button-not-selected'}
          ><GridFill/>카드</div>
          <div onClick={onListClick}
               className={viewMode === 'list' ? 'button-selected' : 'button-not-selected'}
          ><List/>목록</div>
        </div>
      </div>
    </div>
  );
}

export default SelectBtn;
