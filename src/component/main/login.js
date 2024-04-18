import React, { useState, useEffect } from 'react'; // useEffect 추가
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로딩 시 로컬 스토리지에서 저장된 아이디를 불러와서 설정
    const savedLoginId = localStorage.getItem('savedLoginId');
    if (savedLoginId) {
      setLoginId(savedLoginId);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4001/api/account/signin', {
      loginId,
      password
    }).then((response) => {
      const { token, expirationTime } = response.data;
      const expiresInSeconds = expirationTime;
      const expiresInDays = expiresInSeconds / (60 * 60 * 24);
      Cookies.set('accessToken', token, {
        expires: expiresInDays,
        path: '/'
      });

      // "아이디 저장" 체크박스가 체크되었는지 확인 후, 로컬 스토리지에 아이디 저장
      const keepLoggedIn = document.getElementById('keepLoggedIn').checked;
      if (keepLoggedIn) {
        localStorage.setItem('savedLoginId', loginId);
      } else {
        localStorage.removeItem('savedLoginId');
      }

      alert("로그인 성공");
      navigate('/frame');
    }).catch((error) => {
      alert(error.response.data.message);
    });
  };

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
