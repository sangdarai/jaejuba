import "../../css/HeaderView.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import jaejubalogo from "../../icon/jaejuba_logo.png";

export default function HeaderView(){

    const getId = sessionStorage.getItem('nick');
    const [getMovePage1, setMovePage1] = useState("");
    const [getMovePage2, setMovePage2] = useState("");
    const [getHeaderIdName1, setHeaderIdName1] = useState("");
    const [getHeaderIdName2, setHeaderIdName2] = useState("");
    const [getInsertGoods, setInsertGoods] = useState("");

    useEffect(() => {
        if(getId == null){
            setMovePage1("/SignUp")
            setMovePage2("/Login")
            setHeaderIdName1("회원가입")
            setHeaderIdName2("로그인")
            setInsertGoods("hidden")
        } else {
            setMovePage1("/ADMINPage")
            setMovePage2("/")
            setHeaderIdName1(getId)
            setHeaderIdName2("로그아웃")
            setInsertGoods("visible")
        }
    }, [])

    const reset = () => {
        sessionStorage.removeItem('nick')
        window.location.reload();
    }

    const btnClick = () => {
        if(getId != null){
            return reset()
        }
    }

    return (
            <Navbar expand="lg">
                <Container>
                <Navbar.Brand href="/" style={{width:"3em"}}><img src={jaejubalogo} ></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} href="#home">intro</Button>
                            <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} href="/GoodsView">Item</Button>
                            <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} href="/QnAsignup">QnaA</Button>
                            <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} href="/Chatbot">Chatbot</Button>
                            <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} href="/Yutnori">Yutnori</Button>
                            <Button variant="link" href="/AddGoods"  style={{visibility:getInsertGoods, color:"black", textDecoration:"none", fontWeight:"bold"}}>물건등록</Button>
                        </Nav>
                        <Nav >
                            <Nav href="#home">
                                <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} className="textlink" href={getMovePage1}>{getHeaderIdName1}</Button>
                            </Nav>
                            <Nav href="#link" onClick={btnClick}>
                                <Button variant="link" style={{color:"black", textDecoration:"none", fontWeight:"bold"}} className="textlink" href={getMovePage2}>{getHeaderIdName2}</Button>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}
