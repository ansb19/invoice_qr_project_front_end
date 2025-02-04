import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import SignUp from './components/user/SignUp';
import EmailVerification from './components/user/EmailVerification';
import TestConnection from './components/TestConnection';
import Login from './components/user/Login';
import FindID from './components/user/FindID';
import FindPassword from './components/user/FindPassword';
import Main from './components/Main';
import Chat from './components/chat/Chat';
import DeliveryStatus from './components/delivery/DeliveryStatus';
import ShopList from './components/shop/ShopList';
import CheckPassword from './components/user/CheckPassword';
import UpdateProfile from './components/user/UpdateProfile';
import ShopCart from './components/shop/ShopCart';
import ShopProduct from './components/shop/ShopProduct';
import NavigationBar from './structure/NavigationBar';
import Invoice from './components/delivery/Invoice';


function App() {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {
                // 세션 정보 요청
                const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/user/session`, { withCredentials: true });
                if (response.data.name) {
                    setUserName(response.data.name); // 사용자 이름 설정
                }
                
            } catch (error) {
                console.error('세션 확인 중 오류 발생:', error);
            }
        };

         checkSession(); // 컴포넌트 마운트 시 세션 확인
    }, []);

    return (
        <Router>
            <div className='app-container'>
            <NavigationBar userName={userName} setUserName={setUserName} />
                <Routes>
                    {/* /user 경로에 대해 Route 묶음 */}
                    <Route path="/user" element={<Outlet />}>
                        <Route path="sign-up" element={<SignUp />} />
                        <Route path="email-cert" element={<EmailVerification />} />
                        <Route path="login" element={<Login />} />
                        <Route path="find-id" element={<FindID />} />
                        <Route path="find-password" element={<FindPassword />} />
                        <Route path="checkpassword" element={<CheckPassword />} />
                        <Route path="update-profile" element={<UpdateProfile />} />
                    </Route>

                    {/* 다른 경로들 */}

                    <Route path="/shop" element={<Outlet />}>
                        <Route path="shoplist" element={<ShopList />} />
                        <Route path="shopcart" element={<ShopCart />} />
                        <Route path="shopproduct/:id" element={<ShopProduct />} />
                    </Route>

                    <Route path="/chat" element={<Outlet />}>
                        <Route path="chat" element={<Chat />} />
                    </Route>

                    <Route path="/delivery" element={<Outlet />}>
                        <Route path="delivery-status" element={<DeliveryStatus />} />
                        <Route path="invoice" element={<Invoice/>} />
                    </Route>

                    <Route path="/main" element={<Main />} />
                    <Route path="/test" element={<TestConnection />} />

                    

                    
                    
            
                    {/* 루트 경로 */}
                    <Route path="/" element={
                        <div className="App">
                            <header className="App-header">
                                <h1>
                                    <Link to="/user/login" className="welcome-link">
                                        Welcome to QR Project
                                    </Link>
                                </h1>
                                <h2>
                                    for QR , Delivery
                                </h2>
                            </header>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
