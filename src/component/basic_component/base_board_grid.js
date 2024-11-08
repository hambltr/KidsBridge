import React, {useState, useEffect} from 'react';
import {ArrowLeft} from 'react-bootstrap-icons';
import SelectBtn from './board_select_btn';
import {useNavigate, useLocation} from 'react-router-dom';
import WriteFormWithEditor from './write';
import {getAuth} from 'firebase/auth';
import {getFirestore, doc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';

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
                         showWriteBtn,
                       }) {

  const componentStyle = {
    background: backgroundColor, // 배경색 설정 props
  };

  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져오기 위해 useLocation 사용
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태 추가
  const [currentUserNickname, setCurrentUserNickname] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postSrc, setPostSrc] = useState([]);
  const db = getFirestore();

  // URL에서 postNum 추출
  const postNum = location.pathname.split('/').pop(); // URL의 마지막 부분에서 숫자 추출

  // 현재 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setCurrentUserNickname(userDoc.data().nickname);
          }
        }
      } catch (error) {
        console.error('Error fetching user nickname: ', error);
      }
    };

    fetchNickname();
  }, [db]);

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const docRef = doc(db, 'post', `document${postNum}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostTitle(data.title);
          setPostContent(data.contents);
          setPostSrc(data.src);
        }
      } catch (error) {
        console.error('Error fetching post data: ', error);
      }
    };

    if (isEditModalOpen) {
      fetchPostData();
    }
  }, [db, postNum, isEditModalOpen]);

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
    setIsEditModalOpen(false);
  };

  // 글 삭제 처리
  const handleDelete = async () => {
    if (currentUserNickname === showAuthor) {
      // 사용자 확인 요청
      const confirmDelete = window.confirm('정말로 이 글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.');

      if (!confirmDelete) {
        return; // 사용자가 취소를 선택하면 함수 종료
      }

      try {
        // Firestore에서 해당 문서 삭제
        const docRef = doc(db, 'post', `document${postNum}`); // Firestore의 document+{num} 형태로 삭제
        await deleteDoc(docRef); // Firestore의 deleteDoc 함수 호출

        alert('글이 성공적으로 삭제되었습니다.');
        navigate('/service/gallery'); // 삭제 후 절대 경로로 이동
      } catch (error) {
        console.error('글 삭제 중 오류 발생: ', error);
        alert('글을 삭제하는 중 문제가 발생했습니다.');
      }
    } else {
      alert('삭제할 권한이 없습니다.');
    }
  };


  // 글 수정 모달 열기
  const openEditModal = () => {
    if (currentUserNickname === showAuthor) {
      setIsEditModalOpen(true);
    } else {
      alert('수정할 권한이 없습니다.');
    }
  };

// 글 수정 처리
  const handleEditSubmit = async (updatedPost) => {
    try {
      // src가 비어 있을 경우 기본 이미지 추가
      let updatedSrc = updatedPost.src;
      if (updatedSrc.length === 0) {
        updatedSrc = ['https://firebasestorage.googleapis.com/v0/b/kidsbridge-d58cc.appspot.com/o/Reminiscence%2FtempImg.png?alt=media&token=3298286b-fefa-4c85-8b39-a48b5092dd2f'];
      }

      const docRef = doc(db, 'post', `document${postNum}`);
      await updateDoc(docRef, {
        title: updatedPost.title,
        contents: updatedPost.contents,
        src: updatedSrc,
      });

      alert('글이 성공적으로 수정되었습니다.');
      closeWriteModal(); // 수정 완료 후 모달 닫기
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('글 수정 중 오류 발생: ', error);
      alert('글을 수정하는 중 문제가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="top_sticky_title">
        {showBackBtn === true ? (
          <div className="top_sticky_with_back_title">
            <button onClick={goBack}>
              <ArrowLeft/>
            </button>
            <div>
              {showTitle}
            </div>
          </div>
        ) : (
          <div>
            {showTitle}
          </div>
        )}
        {showWriteBtn === true ? (
          <button className="writeBtn btn_basic" onClick={openWriteModal}>
            글쓰기
          </button>
        ) : null}
      </div>
      {showSelectBtn && (
        <SelectBtn
          onGridClick={onGridClick}
          onListClick={onListClick}
          viewMode={viewMode}
        />
      )}
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
                <WriteFormWithEditor onCancel={closeWriteModal}/>
              </div>
            )}
            {isEditModalOpen && (
              <div className="modal_write">
                <WriteFormWithEditor
                  onCancel={closeWriteModal}
                  onSubmit={handleEditSubmit}
                  initialTitle={postTitle}
                  initialContent={postContent}
                  initialSrc={postSrc}
                  isEditMode={true} // 수정 모드 표시
                />
              </div>
            )}
          </div>
          <div className="writer_info">
            <div>
              {currentUserNickname === showAuthor && (
                <button className="editBtn btn_basic" onClick={openEditModal}>
                  수정
                </button>
              )}
              {currentUserNickname === showAuthor && (
                <button className="deleteBtn btn_basic" onClick={handleDelete}>
                  삭제
                </button>
              )}
            </div>
            <div className="writer_info2">
              <div>
                {showAuthor}
              </div>
              <div>
                {showTime}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin_gap"/>
    </div>
  );
}

export default BaseBoardGrid;
