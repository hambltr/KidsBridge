import Base from "./base";
import React from "react";
import { ReactComponent as PlayGround } from "../../img/icon/svg_playground.svg";

function UnAuth({ showUnAuth, showNoData }) {
  return (
    <Base>
      {showUnAuth && (
        <div className="un_auth_wrap">
          <div><PlayGround/></div>
          <h2>원에서의 승인이 필요합니다.</h2>
          <h2>승인이 늦어지는 경우, 원으로 직접 문의해주세요.</h2>
        </div>
      )}
      {showNoData && (
        <div className="un_auth_wrap">
          <div><PlayGround/></div>
          <h2>작성된 글이 없습니다.</h2>
        </div>
      )}
    </Base>
  );
}

export default UnAuth;
