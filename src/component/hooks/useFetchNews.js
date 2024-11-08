import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://firestore.googleapis.com/v1/projects/kidsbridge-d58cc/databases/(default)/documents/post');

                const news = response.data.documents.map(doc => {
                    const utcDate = new Date(doc.fields.time.timestampValue);
                    const kstDate = new Date(utcDate.getTime());
                    const year = kstDate.getFullYear();
                    const month = kstDate.getMonth() + 1;
                    const date = kstDate.getDate();

                    const kstTimeString = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}.`;

                    return {
                        id: doc.fields.id.integerValue,
                        title: doc.fields.title.stringValue,
                        author: doc.fields.author.stringValue,
                        time: kstTimeString,
                        sortTime: utcDate,
                        contents: doc.fields.contents.stringValue
                    };
                });

                setNewsItems(news);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { newsItems, loading };
};

export default useFetchNews;
