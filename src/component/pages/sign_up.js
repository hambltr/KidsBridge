import React, {useEffect, useState} from "react";
import {ChevronRight as ArrowRight} from "react-bootstrap-icons";
import {useNavigate} from 'react-router-dom';
import { auth } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SignUp() {

  const navigate = useNavigate();

  const fields = [
    { id: 'name', label: '이름', type: 'text', placeholder: '이름 입력' },
    { id: 'phone', label: '휴대전화번호', type: 'text', placeholder: '휴대전화번호 입력', maxLength: '13',
      validate: (event) => {
        // 숫자, 백스페이스, 탭, 이스케이프, 엔터만 허용
        if (!/[0-9]+/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'Escape' && event.key !== 'Enter') {
          event.preventDefault();
        }
      }},
    { id: 'email', label: '이메일', type: 'email', placeholder: '이메일 입력' },
    { id: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력'}
  ];

  const [page, setPage] = useState(1);

  const goBack = () => {
    setPage(1);
  }


  //회원가입 기능 (파이어베이스)
  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = inputs; // inputs 상태에서 email과 password를 추출
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 회원가입 성공 시 처리
        console.log("User created:", userCredential.user);
        alert("회원가입 완료, 로그인 페이지로 이동합니다.")
        navigate(`/login`);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error signing up:", error);
        alert(error.message);
      });
  };


  // 입력값 상태 관리
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  // 유효성 검사 및 폰번호 포맷 적용
  const handleChange = (id, value) => {
    if (id === 'phone') {
      const onlyNums = value.replace(/[^0-9]/g, ''); // 숫자만 추출
      let formattedNumber = '';
      if (onlyNums.length <= 3) {
        formattedNumber = onlyNums;
      } else if (onlyNums.length <= 7) {
        formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      } else if (onlyNums.length <= 11) {
        formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
      } else {
        formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
      }
      setInputs(prev => ({ ...prev, [id]: formattedNumber }));
    } else {
      setInputs(prev => ({ ...prev, [id]: value }));
    }
  };

  const checkBoxes = [
    {id: 'over_14', label: '만 14세 이상 회원입니다.', required: true},
    {id: 'terms_agree', label: '이용약관 동의', required: true},
    {id: 'privacy_agree', label: '개인정보 수집 및 이용 동의', required: true},
    {id: 'marketing_agree', label: '마케팅 정보 수신 동의', required: false}
  ];

  const [isChecked, setIsChecked] = useState({
    agree_all: false,
    over_14: false,
    terms_agree: false,
    privacy_agree: false,
    marketing_agree: false //선택사항
  });

  const handleCheck = (e) => {
    const {id, checked} = e.target;
    if (id === "agree_all") {
      setIsChecked({
        agree_all: checked,
        over_14: checked,
        terms_agree: checked,
        privacy_agree: checked,
        marketing_agree: checked,
      });
    } else {
      setIsChecked({...isChecked, [id]: checked});

      // 'agree_all' 상태를 업데이트하지 않고, 개별 체크박스 변경 시에만 상태를 업데이트
      if (Object.values({...isChecked, [id]: checked}).slice(1).every(value => value)) {
        setIsChecked(prevState => ({...prevState, agree_all: true}));
      } else {
        setIsChecked(prevState => ({...prevState, agree_all: false}));
      }

    }
  };

  const allRequiredChecked = isChecked.over_14 && isChecked.terms_agree && isChecked.privacy_agree;

  useEffect(() => {
    if (allRequiredChecked) {
      // 모든 필수 체크박스가 선택되면 'agree_all'도 자동으로 선택됩니다.
      setIsChecked(prevState => ({...prevState, agree_all: true}));
    } else {
      setIsChecked(prevState => ({...prevState, agree_all: false}));
    }
  }, [allRequiredChecked]);

  return (
    <div className="sign_up_wrap">
      {page === 1 &&
        (
          <form className="sign_up">
            <div className="sign_up_logo">
              <button>
                <h1>KidsBridge</h1>
              </button>
            </div>
            <div className="sign_up_header">
              <h3>
                키즈브릿지와 함께<br/>
                특별한 순간을 만들어 가요!
              </h3>
              <p>
                서비스 가입을 위해 아래 약관에 동의가 필요해요.
              </p>
            </div>
            <ul>
              <li>
                <label htmlFor="agree_all">
                  <div>
                    <input id="agree_all" type="checkbox" checked={isChecked.agree_all} onChange={handleCheck}/>
                    <span>모두 동의합니다.</span>
                  </div>
                </label>
              </li>
              <div className="border_bottom_line"/>
              {checkBoxes.map((box, index) => (
                <li key={index}>
                  <label htmlFor={box.id}>
                    <div>
                      <input id={box.id} type="checkbox" checked={isChecked[box.id]} onChange={handleCheck}/>
                      <span>{box.label}</span>
                      <span className="sign_up_text"
                            style={{color: box.required ? "black" : "#797979"}}>{box.required ? "(필수)" : "(선택)"}</span>
                    </div>
                  </label>
                  <button className="svg_box terms">
                    <ArrowRight/>
                  </button>
                </li>
              ))}
              <button className={`sign_up_submit_btn ${allRequiredChecked ? "active" : ""}`}
                      disabled={!allRequiredChecked}
                      onClick={() => {
                        if (allRequiredChecked) {
                          setPage(2);
                        }
                      }}
              >
                <span>동의 후 가입하기</span>
              </button>
            </ul>
          </form>
        )
      }
      {page === 2 &&
        (
          <form className="sign_up">
            <div>
              <h2>회원가입</h2>
              <p>본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해 주세요.</p>
            </div>
            {fields.map(field => (
              <div key={field.id} className="sign_up_input_wrap">
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={inputs[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  onKeyPress={field.validate}
                />
              </div>
            ))}
            <div>
              <button onClick={()=>goBack()}>이전</button>
              <button
                type="button"
                onClick={handleSignUp} // handleSignUp 함수를 onClick 이벤트에 할당
                // disabled={!allRequiredChecked || !inputs.email || !inputs.password}
              >
                가입하기
              </button>

            </div>
          </form>
        )
      }
    </div>
  )
}

export default SignUp;