import { auth, provider } from "../../config/fire-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { ReactComponent as GoogleIcon } from "../../assets/icons-google.svg";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Sign-in was cancelled.');
      } else {
        console.error('An error occurred during sign-in:', error);
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <div className="box">
      <div className="login-container">
        <h2 className="login-title">Welcome</h2>
        <p className="login-text">Sign In with Google to continue</p>
        <button className="gsi-material-button" onClick={signInWithGoogle}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <GoogleIcon className="thelogo"/>
            </div>
            <span className="gsi-material-button-contents">Sign In</span>
          </div>
        </button>
      </div>
      <div className="heroImg">
        <img src="https://img.freepik.com/premium-vector/investment-fund-abstract-concept-vector-illustration_107173-33302.jpg?w=1380" alt="" srcset="" />
      </div>
      </div>
    </div>
  );
};