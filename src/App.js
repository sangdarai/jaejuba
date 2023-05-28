import './App.css';
import HeaderView from './component/section/HeaderView';
import FooterView from './component/section/FooterView';
import Content from './component/etc/Content';
import Login from './component/access/Login';
import SignUp from './component/access/SignUp';
import AddGoods from './component/Goods/AddGoods';
import GoodsView from './component/Goods/GoodsView';
import GoodsDetail from './component/Goods/GoodsDetail';
import GoodsUpdate from './component/Goods/GoodsUpdate';
import QnAsignup from './component/Q&A/QnAsignup';
import QNAAdd from './component/Q&A/QNAAdd';
import QNAInfo from './component/Q&A/QNAInfo';
import QnAGoodsAdd from './component/Q&A/QnAGoodsAdd';
import ADMINPage from './component/Admin/ADMINPage';
import Chatbot from './component/Chatbot/Chatbot';
import Yutnori from './component/Unity/Yutnori';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          {/* <HeaderView /> */}
              <Routes>   
                <Route path={"/"}  element={<GoodsView />} />    {/* 메인페이지 */}
                <Route path={"/Login"} element={<Login />} />    {/* 로그인페이지 */}
                <Route path={"/SignUp"} element={<SignUp />} />    {/* 회원가입페이지 */}
                <Route path={"/AddGoods"} element={<AddGoods />} />
                <Route path={"/GoodsView"} element={<GoodsView />} />    {/* 상품페이지 */}
                <Route path={"/GoodsDetail/:GoodsCode"} element={<GoodsDetail />} />
                <Route path={"/GoodsUpdate/:GoodsCode"} element={<GoodsUpdate />} />
                <Route path={"/QnAsignup"} element={<QnAsignup />} />    {/* 문의사항 페이지 */}
                <Route path={"/QNAAdd/:QNACode"} element={<QNAAdd />} />    {/* 문의사항 등록 */}
                <Route path={"/QNAInfo/:QNACode"} element={<QNAInfo />} /> 
                <Route path={"/QnAGoodsAdd"} element={<QnAGoodsAdd />} />
                <Route path={"/ADMINPage"} element={<ADMINPage />} />
                <Route path={"/Chatbot"} element={<Chatbot />} />
                <Route path={"/Yutnori"} element={<Yutnori />} />
              </Routes>
          {/* <FooterView /> */}
        </div>
    </BrowserRouter>
  );
}

export default App;
