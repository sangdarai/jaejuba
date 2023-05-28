import "../../css/Login.css";
import { Link, useNavigate} from "react-router-dom";
import {React, useState} from 'react';
import API from "../../API";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

export default function Login(){

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [loginCheck, setLoginCheck] = useState(false);

    const inputIdHandler = (e) => {setLoginId(e.currentTarget.value);}
    const inputPasswordHandler = (e) => {setLoginPwd(e.currentTarget.value);}
    
    const submitLogin = async(e) => {
        e.preventDefault();
        const loginInfo = {
            loginId : loginId,
            loginPwd : loginPwd
        }
        const response = await API.post('/api/login', loginInfo)
        console.log(response.data)
        if(response.data === false) {
            window.alert("아이디와 패스워드가 불일치합니다")
        } else {
            sessionStorage.setItem('nick', response.data.nickname);
            navigate(`/`); //Main Page 이동
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
    }

    return(
        <Container>
            <Form className="top" onSubmit={submitLogin}>
            <Row >
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>아이디(이메일)</Form.Label>
                        <Form.Control onChange={inputIdHandler} type="email" placeholder="Enter email" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control onChange={inputPasswordHandler} type="password" placeholder="Password" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Button style={{width:"100%", height:"3em", fontWeight:"bold"}} variant="warning" type="submit">로그인</Button>
                </Col>
            </Row>
        </Form>
      </Container>
    )
}

