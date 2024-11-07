import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore 사용을 위한 import
import PrevNextBtn from "./prev_next_btn";

// Firestore 초기화 (Firebase 프로젝트의 설정에 따라 초기화 코드가 필요합니다)
// import { initializeApp } from "firebase/app";
// const firebaseConfig = { /* your firebase config */ };
// const app = initializeApp(firebaseConfig);
const db = getFirestore(); // Firestore 인스턴스 생성

function HalfCardBoard({ data }) {
  const navigate = useNavigate();
  const itemsPerPage = 12; // 페이지당 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스, 0부터 시작
  const [sortedData, setSortedData] = useState([]); // 정렬된 데이터를 담을 상태
  const [userProfiles, setUserProfiles] = useState({}); // 사용자 프로필 정보를 담을 상태 (nickname -> profileImageUrl 매핑)


  useEffect(() => {
    // 페이지 번호가 변경될 때 스무스하게 페이지 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 스무스 스크롤링 효과 적용
    });
  }, [currentPage]);

  useEffect(() => {
    // 데이터 정렬 시 sortTime 필드를 기준으로 최신순으로 정렬
    const sorted = data.slice().sort((a, b) => {
      const dateA = new Date(a.sortTime); // 문자열을 Date 객체로 변환
      const dateB = new Date(b.sortTime);

      return dateB - dateA; // 최신순 정렬
    });

    setSortedData(sorted);
  }, [data]);

  useEffect(() => {
    // Firestore에서 사용자 프로필 정보를 가져오는 함수
    const fetchUserProfiles = async () => {
      try {
        const usersCollection = collection(db, "users");

        // Firestore에서 모든 사용자 문서 가져오기
        const querySnapshot = await getDocs(usersCollection);

        const profiles = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          profiles[data.nickname] = data.profileImageUrl; // 사용자 닉네임을 키로, 프로필 이미지 URL을 값으로 저장
        });

        setUserProfiles(profiles); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching user profiles: ", error);
      }
    };

    fetchUserProfiles();
  }, []);

  // 현재 페이지에 따라 표시할 데이터 계산
  const paginatedData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // 이미지 소스를 처리하는 함수
  const getImageSrc = (src) => Array.isArray(src) ? src[0] : src;

  // 페이지네이션을 위한 함수들
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0)); // 이전 페이지로, 0보다 작아지지 않게
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(sortedData.length / itemsPerPage) - 1; // 최대 페이지 인덱스
    setCurrentPage((prev) => Math.min(prev + 1, maxPage)); // 다음 페이지로, 최대 페이지를 넘지 않게
  };

  return (
    <section>
      <div className="board_flex_wrap">
        {paginatedData.map((item, index) => (
          <button key={item.id}
                  className="half_board_btn"
                  onClick={() => navigate(`/service/gallery/${item.id}`)}>
            <div className="board_img_card">
              <div>
                <img src={getImageSrc(item.src)} alt={`pic ${index}`}/>
              </div>
              <div className="board_contents_info">
                <h3>{item.title}</h3>
                <div className="board_inner_info">
                  <div
                    className="board_inner_profile"
                    style={{
                      backgroundImage: `url(${userProfiles[item.author]})`
                    }}
                  />
                  <div>{item.author}</div>
                </div>
                <div className="board_inner_info_time">
                  {item.time} {/* 사용자에게 보여주기 위한 간략한 날짜 */}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {sortedData.length > itemsPerPage && (
        <PrevNextBtn
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          currentPage={currentPage}
          maxPage={Math.ceil(sortedData.length / itemsPerPage) - 1}
        />
      )}
    </section>
  );
}

export default HalfCardBoard;
