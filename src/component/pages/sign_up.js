import React, { useEffect, useState } from "react";
import { ChevronRight as ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


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

  // 회원가입 완료 후 저장할 UID
  const [userUID, setUserUID] = useState(null);

  // 입력값 상태 관리
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    nickname: '',
    email: '',
    password: ''
  });

  //프로필 사진 관리
  const [profileImage, setProfileImage] = useState(null);

  // 이미지 미리보기 URL 관리
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  //페이지 설정 로직
  const [page, setPage] = useState(1);

  const goBack = () => {
    setPage(page - 1);
  }


  //회원가입 기능
  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = inputs; // << 저장할 데이터 email, password, nickname
    const auth = getAuth();

    try {
      // Firebase 인증을 통해 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 가입 UID 정보 State에 남겨둠
      setUserUID(user.uid);
      console.log("user.uid is .. ",user.uid);

      // Firestore에 사용자 데이터 저장
      await setDoc(doc(db, "users", user.uid), {
        name: inputs.name,
        phone: inputs.phone,
        email: email,
        createdAt: new Date().toISOString()
      });

      // 성공적으로 저장되었을 때의 동작
      console.log("User created:", user);
      setPage(3);

    } catch (error) {
      console.error("Error signing up:", error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력해 주세요.");
          break;
        case 'auth/invalid-email':
          alert("유효하지 않은 이메일 형식입니다. 이메일을 올바르게 입력해 주세요.");
          break;
        case 'auth/weak-password':
          alert("비밀번호는 최소 6자 이상의 비밀번호를 입력해 주세요.");
          break;
        case 'auth/operation-not-allowed':
          alert("이메일/비밀번호 방식의 회원가입이 현재 비활성화되어 있습니다. 관리자에게 문의해 주세요.");
          break;
        default:
          alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  // Page 3: 회원가입 추가 정보 업데이트 (닉네임, 프로필 사진)
  const handleProfileSetup = async (event) => {
    event.preventDefault();
    if (!userUID) {
      alert("회원가입 정보가 없습니다. 처음부터 다시 시도해 주세요.");
      return;
    }

    try {
      // Firebase Storage에 이미지 업로드
      let profileImageUrl = "";
      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${userUID}`);
        await uploadBytes(imageRef, profileImage);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      // Firestore에 사용자 추가 정보 저장
      await setDoc(doc(db, "users", userUID), {
        name: inputs.name,
        phone: inputs.phone,
        nickname: inputs.nickname,
        email: inputs.email,
        profileImageUrl: profileImageUrl,
        createdAt: new Date().toISOString()
      });

      alert("프로필 설정 완료. 홈 페이지로 이동합니다.");
      navigate(`/`);  // 회원가입 완료 후 리디렉션

    } catch (error) {
      console.error("Error setting up profile:", error);
      alert("프로필 설정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };


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

  // 파일 선택 시 파일 상태 업데이트 및 미리보기 설정
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file); // 파일 상태 업데이트
      setProfileImagePreview(URL.createObjectURL(file)); // 미리보기 URL 생성 및 상태 저장
    }
  };

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
            <div className="sign_up_guide">
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
            <div className="sign_up_btn_wrap">
              <button onClick={()=>goBack()} id="sign_up_go_back_btn">이전</button>
              <button
                  id="sign_up_comp_btn"
                  type="button"
                  onClick={handleSignUp} // handleSignUp 함수를 onClick 이벤트에 할당
                  disabled={!allRequiredChecked || !inputs.email || !inputs.password}
              >
                다음
              </button>
            </div>
          </form>
        )
      }
      {page === 3 &&
        (
          <form className="sign_up">
            <div className="sign_up_guide">
              <h2>프로필 설정</h2>
              <p>닉네임을 입력하고, 프로필 사진을 업로드해 주세요.</p>
            </div>
            <div className="sign_up_input_wrap">
              <label htmlFor="nickname">별명</label>
              <input
                id="nickname"
                type="text"
                placeholder="사용할 별명 입력"
                value={inputs.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
              />
            </div>
            <div className="sign_up_input_wrap">
              <label htmlFor="profileImage">프로필 사진</label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {profileImagePreview && (
              <div className="image_preview">
                <img src={profileImagePreview} alt="미리보기"/>
                <p>선택한 이미지 미리보기</p>
              </div>
            )}
            <div className="sign_up_btn_wrap">
              <button onClick={() => goBack()} id="sign_up_go_back_btn">이전</button>
              <button
                id="sign_up_comp_btn"
                type="button"
                onClick={handleProfileSetup}
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