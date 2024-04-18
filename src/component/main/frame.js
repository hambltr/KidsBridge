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


import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import News from "../news/news";
import Weather from "../weather/weather";
import UnAuth from "../basic_component/un_auth";
import Notice from "../notice/notice";
import NoticeBoard from "../notice/notice_board";
import Base from "../basic_component/base";
import Mini from "../basic_component/inner_mini";
import BoardList from "../basic_component/base_board_list";

function Frame() {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [menuItems] = useState([
    { id: 0, name: '홈', icon: <Menu/>, path: '/service' },
    { id: 1, name: '알림장', icon: <SvgCheckedBoard/>, path: '/service/notice' },
    { id: 2, name: '추억담', icon: <SvgMemory/>, path: '/service/gallery' },
    { id: 3, name: '식단표', icon: <SvgDiet/>, path: '/service/diet' },
    { id: 4, name: '투약의뢰서', icon: <SvgMedikit/>, path: '/service/medicine' },
    { id: 5, name: '귀가동의서', icon: <SvgReturnHome/>, path: '/service/returnHome' }
  ]);


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

  const [devInfo] = useState([
    {
      id: 0,
      name: 'Email: hambltr@gmail.com'
    },
    {
    id: 1,
      name: '서울 구로구 디지털로 306 대륭포스트타워 2차 203호'
    },
    {
      id: 2, name: '팀원: 강재준, '
    }
  ]);

  const [newsItems, setNewsItems] = useState([]);

  const [notiMark, setNotiMark] = useState(true);


  useEffect(() => {
    // 추후 api 통신으로 데이터 배열 받아오는 곳
    const fetchedNewsItems = [
      {
        id: 0,
        title: "제목 1",
        author: "작성자 1",
        time: "시간 1",
        contents: "짬뽕뉴스알림다여기뜸예아",
        comments: 5
      },
      {
        id: 1,
        title: "제목 2",
        author: "작성자 2",
        time: "시간 2",
        contents: "왈랄랄루2"
      },
      {
        id: 2,
        title: "제목 1",
        author: "작성자 1",
        time: "시간 1",
        contents: "짬뽕뉴스알림다여기뜸예아",
        comments: 5
      },
      {
        id: 3,
        title: "제목 2",
        author: "작성자 2",
        time: "시간 2",
        contents: "왈랄랄루2"
      },
      {
        id: 4,
        title: "제목 1",
        author: "작성자 1",
        time: "시간 1",
        contents: "짬뽕뉴스알림다여기뜸예아",
        comments: 5
      }
    ];
    setNewsItems(fetchedNewsItems);
  }, []);


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
            <div className="notification_popup">
              <News newsItems={newsItems} height={"300px"}/>
            </div>
          )}
        <div className="nav_profile">
          <button className="btn_classic" onClick={toggleProfile}>
            <img src={"https://item.kakaocdn.net/do/5f9b01433b1accf2269d12569ecbb2a69f5287469802eca457586a25a096fd31"}
                 alt="profile_img"/>
          </button>
        </div>
        {isProfileVisible && (
          <ul className="profile_popup">
            <li>
              <button>
                <div><GearFill/>설정</div>
              </button>
            </li>
            <li>
              <button>
                <div><HouseGearFill/>원설정</div>
              </button>
            </li>
            <li>
              <button>
                <div><Power/>로그아웃</div>
              </button>
            </li>
          </ul>
        )
        }
      </div>
    </nav>
    <aside className="left_aside_menu">
      <div className="child_info_wrap">
        <div className="child_info">
          <div></div>
          <p>원아증</p>
          <div>
            <img src="https://item.kakaocdn.net/do/5f9b01433b1accf2269d12569ecbb2a69f5287469802eca457586a25a096fd31"
                 alt="child_pic"/>
          </div>
          <p>애이름</p>
          <p>애가다니는원</p>
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