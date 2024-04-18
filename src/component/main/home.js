import Weather from "../weather/weather";
import UnAuth from "../basic_component/un_auth";
import News from "../news/news";
import Notice from "../notice/notice";
import Diet from "../diet/diet";
import NoticeBoard from "../notice/notice_board";
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {

  const [newsItems, setNewsItems] = useState([
    {
      id: 0,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 1,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 2,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 3,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 4,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 5,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 6,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 7,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 8,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 9,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 10,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
    {
      id: 11,
      src: 'https://png.pngtree.com/background/20230505/original/pngtree-painting-landscape-ai-generated-picture-image_2500521.jpg',
      title: "개집팝니다",
      author: "만수르",
      time: "2024.2.7.",
      contents: "contents1"
    },
  ]);

  // useEffect(() => {
  //   // 비동기 함수 fetchData 정의
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.example.com/news');
  //       setNewsItems(response.data);
  //     } catch (error) {
  //       console.error('뉴스 데이터를 가져오는 데 실패했습니다:', error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <section>
      {/*<div className="margin_gap_2"/>*/}
      {/*<Weather/>*/}
      <div className="margin_gap_2"/>
      <UnAuth showUnAuth={true}/>
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