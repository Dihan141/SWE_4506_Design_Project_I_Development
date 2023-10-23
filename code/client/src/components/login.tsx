import { Card, Form } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import { useLogin } from "../hooks/useLogin";
import '../assets/css/login.css';
import { useState } from "react";

export interface LoadingProps{
  changeLoadingState:React.Dispatch<React.SetStateAction<boolean>>
}
const Login = ({changeLoadingState}:LoadingProps) => {

  const {error,email,setEmail,password,setPassword,remember,setRemember,login}=useLogin(changeLoadingState);
  const [passwordVisibility,setPasswordVisibility]=useState("password");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };
    return (
      <Card className="login">
        <Card.Body>
          <h4>Login</h4>
          <Form className="form-value" onSubmit={(e)=>handleSubmit(e)}>
            <div id="confirmErrorPassword" className="errorBox">
              {error}
            </div>
            <div className="inputbox">
              <IonIcon icon={mailOutline} />
              <input type="email" required id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
              {(passwordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (passwordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setPasswordVisibility("password")}
                ></IonIcon>
              ))}
              <input type={passwordVisibility} id="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="remember">
              <label htmlFor="remember_me">
                <input type="checkbox" id="remember_me" onChange={()=>setRemember(!remember)}/>
                Remember Me!
              </label>
            </div>
            <div className="forgot_password">
              <label htmlFor="forgot_password">
                <a href="/forgot-password" className="link-to-forgot-password">Forgot Password?</a>
              </label>
            </div>
            <button type="submit" name="submit" id="submit" className="custom-button">
              LOGIN
            </button>
            <hr/>
            <div className="register-link">
              <p>
                Don't have an account? <a href="/signup"  className="link-to-register">Register</a>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
  );
};

export default Login;
