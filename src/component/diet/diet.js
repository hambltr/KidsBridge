import React, { useState, useEffect } from 'react';
import Base from '../basic_component/base';

function Diet() {

  const [dietItems, setDietItems] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <Base showTitle="식단표">
      {dietItems.length > 0 ? (
        <div>
          {/* 여기에서 dietItems 배열을 순회하며 식단 정보를 표시할 수 있습니다. */}
        </div>
      ) : (
        // 식단 정보가 비어 있을 경우 표시될 내용
        <div className="un_auth_wrap">
          <h2>작성된 식단표가 없습니다.</h2>
        </div>
      )}
    </Base>
  );
}

export default Diet;
