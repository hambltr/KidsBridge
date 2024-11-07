import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const auth = getAuth();  // Firebase 인증 인스턴스 가져오기

  const handleLogout = () => {
    console.log("logout을 시도합니다.");
    signOut(auth)
      .then(() => {
        // 로그아웃 성공 시 처리
        alert("로그아웃 되었습니다.");
        navigate('/');  // 홈 페이지로 이동
      })
      .catch((error) => {
        // 로그아웃 실패 시 처리
        console.error("Logout failed:", error);
        alert("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  };

  return (
    <button onClick={handleLogout} className="logout_button">
      로그아웃
    </button>
  );
}

export default LogoutButton;
