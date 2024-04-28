import React from "react";

function terms({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return(
    <div>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}

export default terms;