import React, { useState, useEffect } from 'react';
import { ChevronCompactLeft, ChevronCompactRight, XLg } from 'react-bootstrap-icons';

function ImageGallery({ data, initialSelectedImgIndex }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(initialSelectedImgIndex);

  const openModal = (index) => {
    setSelectedImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex + 1) % data[0].src.length);
  };

  const prevImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex - 1 + data[0].src.length) % data[0].src.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // 이미지 URL 배열에서 현재 선택된 이미지를 표시합니다.
  return (
    <>
      <div className="contents_flex_wrap">
        {data[0].src.map((srcUrl, index) => (
          <div key={index} className="img_card">
            <button onClick={() => openModal(index)}>
              <img src={srcUrl} alt={`pic ${index}`} />
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal_backdrop" onClick={closeModal}>
          <div className="prev_button_container" onClick={(e) => e.stopPropagation()}>
            <button className="prev_button" onClick={prevImage}><ChevronCompactLeft /></button>
          </div>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            {/* 선택된 이미지 인덱스를 기반으로 모달에서 이미지를 표시 */}
            <img src={data[0].src[selectedImgIndex]} alt={`Selected ${selectedImgIndex}`} />
          </div>
          <div className="next_button_container" onClick={(e) => e.stopPropagation()}>
            <button className="next_button" onClick={nextImage}><ChevronCompactRight /></button>
          </div>
          <button className="close_button" onClick={closeModal}><XLg /></button>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
