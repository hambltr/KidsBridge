import {ReactComponent as Logo2} from "../../img/icon/KidsBridge_logo_black.svg";
import React, {useEffect, useState} from "react";
import { ChevronRight as ArrowRight } from "react-bootstrap-icons";

function SignUp() {

  const [isChecked, setIsChecked] = useState({
    agree_all: false,
    over_14: false,
    terms_agree: false,
    privacy_agree: false,
    marketing_agree: false //선택사항
  });

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    if (id === "agree_all") {
      setIsChecked({
        agree_all: checked,
        over_14: checked,
        terms_agree: checked,
        privacy_agree: checked,
        marketing_agree: checked,
      });
    } else {
      setIsChecked({ ...isChecked, [id]: checked });

      // 'agree_all' 상태를 업데이트하지 않고, 개별 체크박스 변경 시에만 상태를 업데이트
      if (Object.values({ ...isChecked, [id]: checked }).slice(1).every(value => value)) {
        setIsChecked(prevState => ({ ...prevState, agree_all: true }));
      } else {
        setIsChecked(prevState => ({ ...prevState, agree_all: false }));
      }

    }
  };

  const allRequiredChecked = isChecked.over_14 && isChecked.terms_agree && isChecked.privacy_agree;

  useEffect(() => {
    if (allRequiredChecked) {
      // 모든 필수 체크박스가 선택되면 'agree_all'도 자동으로 선택됩니다.
      setIsChecked(prevState => ({ ...prevState, agree_all: true }));
    } else {
      setIsChecked(prevState => ({ ...prevState, agree_all: false }));
    }
  }, [allRequiredChecked]);

  return(
    <div className="sign_up_wrap">
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
          <li>
            <label htmlFor="over_14">
              <div>
                <input id="over_14"
                       type="checkbox"
                       checked={isChecked.over_14}
                       onChange={handleCheck}/>
                <span>만 14세 이상 회원입니다.</span><span className="sign_up_text">(필수)</span>
              </div>
            </label>
            <button className="svg_box">
              <ArrowRight/>
            </button>
          </li>
          <li>
            <label htmlFor="terms_agree">
              <div>
                <input id="terms_agree"
                       type="checkbox"
                       checked={isChecked.terms_agree}
                       onChange={handleCheck}/>
                <span>이용약관 동의</span><span className="sign_up_text">(필수)</span>
              </div>
            </label>
            <button className="svg_box">
              <ArrowRight/>
            </button>
          </li>
          <li>
            <label htmlFor="privacy_agree">
              <div>
                <input id="privacy_agree"
                       type="checkbox"
                       checked={isChecked.privacy_agree}
                       onChange={handleCheck}/>
                <span>개인정보 수집 및 이용 동의</span><span className="sign_up_text">(필수)</span>
              </div>
            </label>
            <button className="svg_box">
              <ArrowRight/>
            </button>
          </li>
          <li>
            <label htmlFor="marketing_agree">
              <div>
                <input id="marketing_agree"
                       type="checkbox"
                       checked={isChecked.marketing_agree}
                       onChange={handleCheck}/>
                <span>마케팅 정보 수신 동의</span><span className="sign_up_text" style={{color:"#797979"}}>(선택)</span>
              </div>
            </label>
            <button className="svg_box">
              <ArrowRight/>
            </button>
          </li>
          <button className={`sign_up_submit_btn ${allRequiredChecked ? "active" : ""}`} disabled={!allRequiredChecked}>
            <span>동의 후 가입하기</span>
          </button>
        </ul>
      </form>
    </div>
  )
}

export default SignUp;