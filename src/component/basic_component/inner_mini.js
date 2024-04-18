import React from "react";
import { useNavigate } from "react-router-dom";

function Mini({ item, SvgName1, SvgName2, innerStyle, showPics, showContents }) {
  const navigate = useNavigate();

  let imageSrcs = [];

  if (Array.isArray(item.src)) {
    // item.src가 이미 배열인 경우, 바로 사용합니다.
    imageSrcs = item.src;
  } else if (typeof item.src === 'string') {
    // item.src가 문자열인 경우, 해당 문자열을 배열의 유일한 요소로 사용합니다.
    imageSrcs = [item.src];
  }

  return (
    <button className="main_mini_contents" style={innerStyle} onClick={() => navigate(`/service/gallery/${item.id}`)}>
      <div className="inner_main_mini_contents">
        {SvgName1 && <div><SvgName1 /></div>}
        <div className="mini_contents">
          {item.title && <h4 className="mini_title">{item.title}</h4>}
          {showContents && item.contents && <div className="inner_mini_contents">{item.contents}</div>}
          {item.author && item.time &&
            <div className="mini_author_time">{`${item.author} / ${item.time}`}</div>}
        </div>
        {
          item.comments && (<div>
            <div className="mini_svg2_warp">
              {SvgName2 && <SvgName2 />}
            </div>
            <div className="mini_svg2_warp">
              <div><a href="#">[{item.comments}]</a></div>
            </div>
          </div>)
        }
        {showPics && (<div className="mini_pic" style={{ flexDirection: "row" }}>
          {imageSrcs.slice(0, 5).map((src, index) => (<div key={`${item.id}-${index}`}>
            <img src={src} alt={`image ${index}`} />
          </div>))}
        </div>)}
      </div>
    </button>);
}

export default Mini;
