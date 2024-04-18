import { useState, useEffect } from 'react';

// UTC 시간을 대한민국 시간대로 변환하고 포맷팅하는 커스텀 훅
function useFormatKST(dateString) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (!dateString) return;

    const date = new Date(dateString);
    const formatted = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    setFormattedDate(formatted);
  }, [dateString]);

  return formattedDate;
}
export default useFormatKST;
