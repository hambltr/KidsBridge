import React, {useState, useEffect} from 'react';
import Base from '../basic_component/base';
import Mini from "../basic_component/inner_mini";
import {ReactComponent as SvgNotice} from "../../img/icon/svg_notice.svg";
import {ReactComponent as SvgBubble} from "../../img/icon/svg_speach_bubble.svg";


function Medicine() {

    const [medicineItems, setMedicineItems] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="margin_gap_2"></div>
            <Base showTitle="투약의뢰서" showRefreshButton={false} showAllButton={false}>
                {medicineItems.length > 0 ? (
                    medicineItems.map((item) => (
                        <Mini key={item.id} item={item} SvgName1={SvgNotice} SvgName2={SvgBubble}/>
                    ))
                ) : (
                    // 투약 정보가 비어 있을 경우 표시될 내용
                    <div className="un_auth_wrap">
                        <h2>작성된 투약의뢰서가 없습니다.</h2>
                    </div>
                )}
            </Base>
        </>
    );
}

export default Medicine;
