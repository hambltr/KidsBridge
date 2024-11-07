import {BellFill, GearFill, HouseGearFill, People, Power, House} from 'react-bootstrap-icons';
import {ReactComponent as SvgCS} from "../../img/icon/svg_cs_center.svg";
import {ReactComponent as SvgBoard} from "../../img/icon/svg_board.svg";
import {ReactComponent as SvgCheckedBoard} from "../../img/icon/svg_checked_board.svg";
import {ReactComponent as SvgDiet} from "../../img/icon/svg_mamma.svg";
import {ReactComponent as SvgMedikit} from "../../img/icon/svg_medikit.svg";
import {ReactComponent as SvgReturnHome} from "../../img/icon/svg_return_home.svg";
import {ReactComponent as SvgMemory} from "../../img/icon/svg_photo.svg";
import {ReactComponent as Logo2} from "../../img/icon/KidsBridge_logo_black.svg";
import {ReactComponent as Menu} from "../../img/icon/svg_menu.svg";


import React, {useEffect, useState, useRef, useMemo} from "react";
import {Outlet, useNavigate} from 'react-router-dom';
// import axios from 'axios';

//Firebase 관련 설정
import {auth, db} from "../../firebaseConfig";
import {getDoc, doc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";


import News from "../news/news";
import Weather from "../weather/weather";
import UnAuth from "../basic_component/un_auth";
import Notice from "../notice/notice";
import NoticeBoard from "../notice/notice_board";
import Base from "../basic_component/base";
import Mini from "../basic_component/inner_mini";
import BoardList from "../basic_component/base_board_list";
import loading from "../basic_component/loading_circle";
import LogoutButton from "../logout";

import useFetchNews from "../hooks/useFetchNews";


function Frame() {

  const navigate = useNavigate();

  // 팝업을 감지할 ref
  const notiRef = useRef(null);
  const profileRef = useRef(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  //메뉴 목록 배열
  const [menuItems] = useState([
    {id: 0, name: '홈', icon: <Menu/>, path: '/service'},
    {id: 1, name: '알림장', icon: <SvgCheckedBoard/>, path: '/service/notice'},
    {id: 2, name: '추억담', icon: <SvgMemory/>, path: '/service/gallery'},
    {id: 3, name: '식단표', icon: <SvgDiet/>, path: '/service/diet'},
    {id: 4, name: '투약의뢰서', icon: <SvgMedikit/>, path: '/service/medicine'},
    {id: 5, name: '귀가동의서', icon: <SvgReturnHome/>, path: '/service/returnHome'}
  ]);

  //footer 목록 배열
  const [footerItems] = useState([
    {
      id: 0, name: '회사소개'
    },
    {
      id: 1, name: '원격지원'
    },
    {
      id: 2, name: '약관 및 정책'
    }
  ]);

  //개발자 정보 및 연락처
  const [devInfo] = useState([
    // {
    //   id: 0,
    //   name: 'Email: hambltr@gmail.com'
    // },
    // {
    //   id: 1,
    //   name: '서울 구로구 디지털로 306 대륭포스트타워 2차 203호'
    // },
    // {
    //   id: 2, name: '개발자: 강재준'
    // }
  ]);

  //새 알림 붉은 스티커 (종 위에 점)
  const [notiMark, setNotiMark] = useState(true);

  const {newsItems, loading} = useFetchNews();

  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const toggleNotification = () => {
    setNotiMark(false);
    setIsNotiVisible(prevState => {
      if (!prevState) {
        setIsProfileVisible(false);
      }
      return !prevState;
    });
  };

  const toggleProfile = () => {
    setIsProfileVisible(prevState => {
      if (!prevState) {
        setIsNotiVisible(false);
      }
      return !prevState;
    });
  };

  // 팝업 외부 클릭 감지 핸들러
  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (isNotiVisible && notiRef.current && !notiRef.current.contains(event.target)) {
        setIsNotiVisible(false);
      }
      // if (isProfileVisible && profileRef.current && !profileRef.current.contains(event.target)) {
      //   //로그아웃 버튼은 팝업을 즉시 닫지 않도록 설정
      //   if (!event.target.closest('.logout_button')) {
      //     setIsProfileVisible(false);
      //   }
      //   setIsProfileVisible(false);
      // }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [isNotiVisible, isProfileVisible]);

  // 사용자 데이터 상태 관리
  const [userData, setUserData] = useState({
    nickname: "",
    profileImageUrl: "",
  });

// Firestore에서 사용자 데이터 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Firestore의 'users' 컬렉션에서 현재 사용자 문서 참조
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data()); // 문서 데이터로 상태 업데이트
          } else {
            console.log("사용자 데이터를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
        } finally {
          // setLoading(false); // 로딩 상태 해제
        }
      } else {
        // alert("잘못된 접근입니다. 메인 페이지로 돌아갑니다.");
        console.log("로그인된 사용자가 없습니다.");
        // navigate(`/`);
        // setLoading(false); // 로그인된 사용자가 없을 때도 로딩 상태 해제
      }
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  // useMemo를 사용하여 userData를 메모이제이션 (userData가 변경되지 않으면 메모이제이션된 데이터 사용)
  const memoizedUserData = useMemo(() => {
    return userData;
  }, [userData]);

  return (<>
    <nav>
      <button>
        <div className="logo" onClick={() => handleNavigate('/service')}>
          <Logo2 id="logo2"/>
          <h3>KidsBridge</h3>
        </div>
      </button>
      <div className="nav_right_profile">
        <div className="nav_notification">
          <button type="button" className="btn_classic" onClick={toggleNotification}>
            <BellFill/>
            {
              notiMark && <div className="noti_dot_popup btn_classic"/>
            }
          </button>
        </div>
        {isNotiVisible &&
          (
            <div className="notification_popup" ref={notiRef} onClick={() => setIsNotiVisible(false)}>
              {loading ? (
                <loading/>
              ) : (<News newsItems={newsItems} height={"300px"}/>
              )}
            </div>
          )}
        <div className="nav_profile">
          <button className="btn_classic child_pic_mini" onClick={toggleProfile} ref={profileRef}>
            {memoizedUserData.profileImageUrl ? (
              <img src={memoizedUserData.profileImageUrl} alt="account_child_picture"/>
            ) : (
              <div className="temp_load_prof"></div>
            )}
          </button>
        </div>
        {isProfileVisible && (
          <ul className="profile_popup">
            <li>
              <button onClick={() => setIsNotiVisible(false)}>
                <div><GearFill/>설정</div>
              </button>
            </li>
            <li>
              <button onClick={() => setIsNotiVisible(false)}>
                <div><HouseGearFill/>원설정</div>
              </button>
            </li>
            <li>
              <div>
                <Power/><LogoutButton/>
              </div>
            </li>
          </ul>
        )
        }
      </div>
    </nav>
    <aside className="left_aside_menu">
      <div className="child_info_wrap">
        <div className="child_info">
          <div className="pin_hole"></div>
          <p>원아증</p>
          <div className="child_pic_wrap">
            {memoizedUserData.profileImageUrl ? (
              <img className="child_pic" src={memoizedUserData.profileImageUrl} alt="account_child_picture"/>
            ) : (
              <div className="temp_load_prof"></div>
            )}
          </div>
          <p className="child_nickname">{memoizedUserData.nickname ? memoizedUserData.nickname : " "}</p>
        </div>
      </div>
      <div className="menu_wrap">
        <ul className="menu">
          <div className="inner_menu_frame">
            {menuItems.map((item) => (
                <li key={item.id} className="menu_item" onClick={() => handleNavigate(item.path)}>
                  <button>
                    <div>{item.icon}</div>
                    <div><p>{item.name}</p></div>
                  </button>
                </li>
              )
            )}
          </div>
        </ul>
      </div>
    </aside>
    <section className="contents_wrap">
      <div className="contents">
        {/*가장 많이 수정해야 하는 부분===========================================*/}
        <div className="main_divided">
          <Outlet/>
        </div>
        {/*가장 많이 수정해야 하는 부분===========================================*/}
        <div className="sub_divided">
          <div className="cs_center">
            <div>
              <SvgCS/>
            </div>
            <h3>키즈브릿지<br/>고객센터 안내</h3>
            <h4>고객센터<br/>1234-5678<br/></h4>
            <h5>평일 9:00~18:00</h5>
          </div>
        </div>
      </div>
      <footer className="main_footer">
        <div className="inner_footer">
          <ul>
            {footerItems.map((item) => (<li key={item.id}>
              <div><p>{item.name}</p></div>
            </li>))}
          </ul>
          <ul>
            {devInfo.map((item) => (<li key={item.id}>
              <div><a href="#"><p>{item.name}</p></a></div>
            </li>))}
          </ul>
        </div>
      </footer>
    </section>
  </>);
}

export default Frame;