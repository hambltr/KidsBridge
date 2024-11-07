import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BaseBoardGrid from "../basic_component/base_board_grid";
import ImageGallery from "../basic_component/base_image_gallery";
import Loader from "../basic_component/loading_circle";
import useFormatKST from "../basic_component/uesFormatKST";

function Detail() {
  const { postId } = useParams(); // URL에서 postId를 가져옵니다.
  const [Images, setImages] = useState([]); // 이미지 URL 배열을 저장할 상태
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(""); // API로부터 받아온 시간을 저장할 상태

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://firestore.googleapis.com/v1/projects/kidsbridge-d58cc/databases/(default)/documents/post/document${postId}`);
        const doc = response.data;
        const post = {
          id: doc.fields.id.integerValue,
          src: doc.fields.src.arrayValue.values.map(item => item.stringValue), // 'src' 필드는 배열로 처리합니다.
          title: doc.fields.title.stringValue,
          author: doc.fields.author.stringValue,
          time: doc.fields.time.timestampValue,
          contents: doc.fields.contents.stringValue
        };
        // console.log(response.data);
        setImages([post]);
        setTime(doc.fields.time.timestampValue);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [postId]);


  const formattedTime = useFormatKST(time);

  if (isLoading || Images.length === 0) {
    return <Loader/>;
  }

  return (
    <BaseBoardGrid
      showBackBtn={true}
      showTitle={"추억담 상세보기"}
      showContentsTitle={Images[0].title}
      showAuthor={Images[0].author}
      showContents={Images[0].contents}
      showTime={formattedTime}
    >
      <ImageGallery
        data={Images}
        initialSelectedImgIndex={0}
      />
    </BaseBoardGrid>
  );
}

export default Detail;
