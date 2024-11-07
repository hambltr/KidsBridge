import Weather from "../weather/weather";
import UnAuth from "../basic_component/un_auth";
import News from "../news/news";
import Notice from "../notice/notice";
import Diet from "../diet/diet";
import NoticeBoard from "../notice/notice_board";
import {useEffect, useState} from "react";
import axios from "axios";
import useFetchNews from "../hooks/useFetchNews";

function Home() {

    const { newsItems, loadingCircles } = useFetchNews();

  return (
    <section>
      {/*<div className="margin_gap_2"/>*/}
      {/*<Weather/>*/}
      {/*<div className="margin_gap_2"/>*/}
      {/*<UnAuth showUnAuth={true}/>*/}
      <div className="margin_gap_2"/>
      <News newsItems={newsItems}/>
      <div className="margin_gap_2"/>
      <Notice/>
      <div className="margin_gap_2"/>
      <Diet/>
    </section>
  )
}

export default Home;