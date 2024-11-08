import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, setDoc, serverTimestamp, getDoc, doc, runTransaction } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firebase 초기 설정 import
import { auth } from '../../firebaseConfig'; // Firebase 인증 설정 import
import { onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage 관련 함수 import
import { v4 as uuidv4 } from 'uuid'; // 유니크한 ID 생성을 위한 라이브러리

function WriteFormWithEditor({ onSubmit, onCancel, isEditMode = false, initialTitle = '', initialContent = '', initialSrc = [] }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [author, setAuthor] = useState(''); // 작성자 필드
  const [authorUid, setAuthorUid] = useState(''); // 작성자 UID
  const [src, setSrc] = useState(initialSrc); // 이미지 URL 배열 필드 추가
  const [files, setFiles] = useState([]); // 파일 상태 추가
  const [fileCount, setFileCount] = useState(0); // 선택한 파일 수 추가

  const storage = getStorage();

  // 로그인한 유저의 닉네임 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid); // 'users' 컬렉션에서 현재 로그인된 유저의 문서 참조
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setAuthor(userData.nickname);
            setAuthorUid(user.uid); // 현재 로그인한 사용자의 UID를 저장
          }
        } catch (error) {
          console.error("Failed to fetch user nickname: ", error);
        }
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
  }, []);

  // 수정 모드일 때, 초기값을 설정하는 useEffect
  useEffect(() => {
    if (isEditMode) {
      setTitle(initialTitle);
      setContent(initialContent);
      setSrc(initialSrc);
    }
  }, [isEditMode, initialTitle, initialContent, initialSrc]);

  // 툴바 설정
  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, false]}], // 제목 크기 옵션
      ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일 옵션
      [{'list': 'ordered'}, {'list': 'bullet'}], // 리스트 옵션
      [{'indent': '-1'}, {'indent': '+1'}], // 들여쓰기 옵션
      [{'color': []}, {'background': []}], // 글자색 및 배경색
      [{'align': []}], // 정렬 옵션
      ['clean'] // 서식 제거 버튼
    ],
    clipboard: {
      matchVisual: false // 붙여넣기 서식 제거 = false
    }
  };

  // 사용할 포맷 설정
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'indent',
    'link', 'image', 'video', 'color', 'background', 'align'
  ];

  // 파일 변경 핸들러
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles); // 선택한 파일을 상태에 저장
    setFileCount(selectedFiles.length); // 선택한 파일 수 업데이트

    try {
      const uploadedUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const storageRef = ref(storage, `Reminiscence/images/${uuidv4()}`); // 유니크한 이름으로 이미지 참조
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef); // 다운로드 URL 가져오기
          return downloadURL;
        })
      );

      // src 배열에 업로드된 모든 URL 추가
      setSrc((prevSrc) => [...prevSrc, ...uploadedUrls]);

    } catch (error) {
      console.error("Failed to upload images: ", error);
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (url) => {
    const updatedSrc = src.filter((imageUrl) => imageUrl !== url);
    setSrc(updatedSrc);
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    if (title && author) { // 본문은 별도로 처리하므로, title과 author만 확인

      // 본문 내용에서 HTML 태그 제거 (순수한 텍스트만 남기기)
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(content, 'text/html');
      let textContent = parsedDoc.body.textContent || ''; // 본문 내용에서 텍스트만 가져옴

      // 본문이 비어 있으면 스페이스 하나로 설정
      if (textContent.trim() === '') {
        textContent = ' ';
      }

      // src가 비어있으면 기본 이미지 URL 추가
      let updatedSrc = src;
      if (updatedSrc.length === 0) {
        updatedSrc = ['https://firebasestorage.googleapis.com/v0/b/kidsbridge-d58cc.appspot.com/o/Reminiscence%2FtempImg.png?alt=media&token=3298286b-fefa-4c85-8b39-a48b5092dd2f'];
      }

      if (isEditMode) {
        // 수정 모드인 경우, 새로운 글 생성하지 않고 수정된 데이터만 전달
        if (onSubmit) {
          onSubmit({
            title: title,
            contents: textContent, // 순수한 텍스트 내용 전달
            src: updatedSrc,
          });
        }
        return; // 수정 모드일 경우, 새로운 글 생성 로직을 실행하지 않도록 반환
      }

      // 작성 모드인 경우에만 아래 로직 실행
      try {
        // 로그인된 사용자 UID 가져오기
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert("로그인이 필요합니다.");
          return;
        }
        const authorUid = currentUser.uid;

        // 카운터 값 가져오기 및 업데이트
        const counterDocRef = doc(db, 'counters', 'reminiscenceCounter');
        let newId;

        await runTransaction(db, async (transaction) => {
          const counterDoc = await transaction.get(counterDocRef);
          if (!counterDoc.exists()) {
            throw "Counter document does not exist!";
          }

          const currentCounter = counterDoc.data().count || 0;
          newId = currentCounter + 1;

          // 카운터 값을 증가시킴
          transaction.update(counterDocRef, { count: newId });
        });

        // 'post' 컬렉션에 데이터 추가 (ID 포함)
        const reminiscenceCollectionRef = collection(db, 'post');
        const documentId = `document${newId}`; // 원하는 문서 ID 형식

        await setDoc(doc(reminiscenceCollectionRef, documentId), {
          id: newId,                    // 추가된 정수 ID
          author: author,               // 작성자
          authorUid: authorUid,         // 작성자의 UID
          title: title,                 // 제목
          contents: textContent,        // 순수한 텍스트 내용 저장 (비어 있으면 " ")
          src: updatedSrc,              // 이미지 URL 배열 (기본 이미지 포함)
          time: serverTimestamp()       // 서버 타임스탬프
        });

        console.log("Document written with custom ID: ", documentId);
        if (onSubmit) {
          onSubmit({
            id: newId,                   // 정수 ID
            title: title,                // 제목
            author: author,              // 작성자
            authorUid: authorUid,        // 작성자의 UID
            time: new Date().toISOString(), // 현재 시간을 문자열로 변환
            contents: textContent,       // 본문 내용 (비어 있으면 " ")
            src: updatedSrc              // 이미지 URL 배열 (기본 이미지 포함)
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("제목 또는 본문을 작성해주세요.");
    }
    window.location.reload();
  };


  return (
    <div className="write_form">
      <input
        className="write_input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <div>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="내용을 입력하세요."
        />
      </div>
      {/* 이미지 미리보기 추가 */}
      <div className="img_preview_wrap">
        {src.map((url, index) => (
          <div key={index} className="img_preview">
            <img src={url} alt={`이미지 ${index}`} className="preview_img" />
            <button className="delete_img_btn" onClick={() => handleImageDelete(url)}>삭제</button>
          </div>
        ))}
      </div>
      {/* 이미지 파일 입력 추가 */}
      <div className="img_input_wrap">
        <input
          className="img_input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div className="btn_wrap write_btn_wrap">
        <button className="btn_basic write_btn cancel_btn" onClick={onCancel}>취소</button>
        <button className="btn_basic write_btn" onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
}

export default WriteFormWithEditor;
