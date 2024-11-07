import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function Login() {

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 에러 메시지 매핑 객체
  const errorMessages = {
    "auth/invalid-credential": "아이디 또는 비밀번호가 올바르지 않습니다.",
    "auth/user-not-found": "해당 이메일로 등록된 사용자를 찾을 수 없습니다.",
    "auth/wrong-password": "비밀번호가 일치하지 않습니다.",
    "auth/too-many-requests": "잠시 후 다시 시도해 주세요. 로그인 시도가 너무 많습니다.",
    "auth/network-request-failed": "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요."
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    try {
      // Firebase를 이용한 이메일과 비밀번호 로그인 처리
      await signInWithEmailAndPassword(auth, loginId, password);
      console.log("로그인 성공");
      navigate('/service');
    } catch (err) {

      const errorCode = err.code;
      setError("로그인 실패: " + err.message); // 에러 발생 시 메시지 설정

      // 에러 코드에 따른 사용자 친화적인 메시지 설정
      if (errorMessages[errorCode]) {
        alert(errorMessages[errorCode]);
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }

      setError(`로그인 실패: ${err.message}`);
    }
  };

  // useEffect(() => {
  //   // 페이지 로딩 시 로컬 스토리지에서 저장된 아이디를 불러와서 설정
  //   const savedLoginId = localStorage.getItem('savedLoginId');
  //   if (savedLoginId) {
  //     setLoginId(savedLoginId);
  //   }
  // }, []);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //
  //   axios.post('http://localhost:3000/api/account/signin', {
  //     loginId,
  //     password
  //   }).then((response) => {
  //     const { token, expirationTime } = response.data;
  //     const expiresInSeconds = expirationTime;
  //     const expiresInDays = expiresInSeconds / (60 * 60 * 24);
  //     Cookies.set('accessToken', token, {
  //       expires: expiresInDays,
  //       path: '/'
  //     });
  //
  //     // "아이디 저장" 체크박스가 체크되었는지 확인 후, 로컬 스토리지에 아이디 저장
  //     const keepLoggedIn = document.getElementById('keepLoggedIn').checked;
  //     if (keepLoggedIn) {
  //       localStorage.setItem('savedLoginId', loginId);
  //     } else {
  //       localStorage.removeItem('savedLoginId');
  //     }
  //
  //     alert("로그인 성공");
  //     navigate('/frame');
  //   }).catch((error) => {
  //     alert(error.response.data.message);
  //   });
  // };

  return (
    <section className="login_wrap">
      <div className="login_contents">
        <div className="login_left_contents"></div>
        <div className="login_forms">
          <div className="login_text">
            <h1>키즈브릿지</h1>
            <h3>유치원과 가정을 잇다</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <input type="text" id="username" name="username" placeholder="아이디" value={loginId} onChange={(e) => setLoginId(e.target.value)}/>
            </div>
            <div>
              <input type="password" id="password" name="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="input_checkbox">
              <input type="checkbox" id="keepLoggedIn" name="keepLoggedIn"/>
              <label htmlFor="keepLoggedIn">아이디 저장</label>
            </div>
            <div>
              <button className="login_btn" type="submit">
                <h3>로그인</h3>
              </button>
            </div>
          </form>
          <ul className="login_cs_menu">
            <li><button className="btn_classic" onClick={()=>navigate('/signUp')}>회원가입</button></li>
            <li><button className="btn_classic">아이디 찾기</button></li>
            <li><button className="btn_classic">비밀번호 찾기</button></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Login;
