import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import BaseBoardGrid from "../basic_component/base_board_grid";
import HalfCardBoard from "../basic_component/base_half_card_board";
import BoardList from "../basic_component/base_board_list";
import Base from "../basic_component/base";
import axios from "axios";
import Loader from "../basic_component/loading_circle";

function NoticeBoard() {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);


  // 뒤로가기 로직
  useEffect(() => {
    // URL에서 viewMode 쿼리 파라미터를 읽어옵니다.
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('viewMode');

    // 유효한 viewMode 값이면 상태를 업데이트합니다.
    if (mode === 'grid' || mode === 'list') {
      setViewMode(mode);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://firestore.googleapis.com/v1/projects/kidsbridge-d58cc/databases/(default)/documents/post');
        const posts = response.data.documents.map(doc => {
          // UTC 시간으로 파싱
          const utcDate = new Date(doc.fields.time.timestampValue);
          const kstDate = new Date(utcDate.getTime());

          // '년-월-일 시:분:초' 형식으로 변환
          const year = kstDate.getFullYear();
          const month = kstDate.getMonth() + 1;
          const date = kstDate.getDate();

          const kstTimeString = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}.`;

          // console.log("utcDate",utcDate);

          return {
            id: doc.fields.id.integerValue,
            src: doc.fields.src.arrayValue.values.map(item => item.stringValue),
            title: doc.fields.title.stringValue,
            author: doc.fields.author.stringValue,
            time: kstTimeString,
            sortTime: utcDate,
            contents: doc.fields.contents.stringValue
          };
        });
        setImages(posts);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchPosts();
  }, []);

  const updateViewMode = (mode) => {
    setViewMode(mode);
    navigate(`?viewMode=${mode}`);
  };

  const hasData = images.length > 0;

  // console.log("ddd",images);

  return (
    <>
      {
        hasData ? (
          <BaseBoardGrid showTitle="추억담" showSelectBtn={true} backgroundColor="#F8F9FA"
                         onGridClick={() => updateViewMode('grid')}
                         onListClick={() => updateViewMode('list')}
                         viewMode={viewMode} showWriteBtn={true} >
            {viewMode === 'grid' ?
              <HalfCardBoard data={images}/> : <BoardList data={images}/>}
          </BaseBoardGrid>
        ) : (
          <>
            <BaseBoardGrid showTitle="추억담" backgroundColor="#F8F9FA"
                           showWriteBtn={true} >
            </BaseBoardGrid>
            <div className="margin_gap_2"></div>
            <Base>
              <div className="un_auth_wrap">
                <h2>작성된 추억이 없습니다.</h2>
              </div>
            </Base>
            {/*<Loader/>*/}
          </>
        )
      }
    </>
  );
}

export default NoticeBoard;
