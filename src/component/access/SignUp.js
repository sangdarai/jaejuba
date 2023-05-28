import "../../css/SignUp.css"
import { Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import API from "../../API";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function SignUp(){

    const navigate = useNavigate(); //Main Page 이동

    //초기값 세팅 - 아아디(이메일), 패스워드, 패스워드확인, 이름, 전화번호, 닉네임
    const [Id, setId] = useState('');
    const [Pwd, setPwd] = useState('');
    const [Cpwd, setCheckPwd] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Nickname, setNickname] = useState('');

    // const [checkNicknameResult, setcheckNicknameResult] = useState(false);/

    //오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [pwdMessage, setPwdMessage] = useState('');
    const [cpwdMessage, setCheckPwdMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [btnCheckMessage, setbtnCheckMessage] = useState('');

    //유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isCpwd, setIsCheckPwd] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    //아이디
    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
        const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!idRegExp.test(Id)){
            setIdMessage("이메일의 형식이 올바르지 않습니다!");
        } else {
            setIdMessage("ID 중복체크를 부탁드립니다");
        }
    }

    //아이디 중복체크 버튼
    const idCheckBtnHandler = async(e) => {
        e.preventDefault();
        const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        const checkId = {
            checkid : Id,
        }
        const response = await API.post('/api/checkid', checkId);     
        if(!idRegExp.test(Id)){
            setIdMessage("이메일의 형식이 올바르지 않습니다!");
        } else {
            if(response.data === true) {
                setIdMessage("사용가능한 ID 입니다");
                setIsId(true);
            } else if(response.data === false){ 
                setIdMessage("ID 중복입니다");
                setIsId(false);
            } 
        }

    }

    //패스워드
    const onPwdHandler = (e) => {
        setPwd(e.currentTarget.value);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(e.currentTarget.value)) {
            setPwdMessage( "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPwd(false);
          } else {
            setPwdMessage("안전한 비밀번호 입니다.");
            setIsPwd(true);
        }
    };
    
    //패스워드 체크
    const oncheckPwdHandler = (e) => {
        const currentPasswordConfirm = e.currentTarget.value;
        setCheckPwd(e.currentTarget.value);
        if (Pwd !== currentPasswordConfirm) {
            setCheckPwdMessage("비밀번호가 다릅니다!");
            setIsCheckPwd(false);
          } else {
            setCheckPwdMessage("비밀번호를 확인했습니다.");
            setIsCheckPwd(true);
          }
    };

    //이름
    const onNameHandler = (e) => {
        setName(e.currentTarget.value);

        if (Name == null) {
            setNameMessage("이름을 입력해주세요");
            setIsName(false);
          } else {
            setNameMessage("이름을 확인했습니다");
            setIsName(true);
          }
    }

    //휴대폰 번호
    const onPhoneHandler = (e) => {
        setPhone(e.currentTarget.value);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
        if (!phoneRegExp.test(e.currentTarget.value)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
        } else {
            setPhoneMessage("휴대폰번호 중복체크를 부탁드립니다");
        }
    }

    //휴대폰 중복체크 버튼
    const phoneBtnHandler = async(e) => {
        e.preventDefault();
        const phone = {
            phone : Phone,
        }
        const response = await API.post('/api/checkPhone', phone)
        if(response.data === true) {
            setPhoneMessage("사용가능한 번호 입니다");
            setIsPhone(true);
        } else  { 
            setPhoneMessage("이미 가입된 번호입니다");
            setIsPhone(false);
        }
    }

    //닉네임
    const onNicknameHandler = (e) => {
        const currentName = e.currentTarget.value;
        setNickname(e.currentTarget.value);
        if (currentName.length < 2 || currentName.length > 10) {
            setNicknameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
        } else {
            setNicknameMessage("닉네임 중복체크를 부탁드립니다");
        }
    }

    //닉네임 중복체크 버튼
    const nicknameCheckBtnHandler = async(e) => {
        e.preventDefault();
        const checknickname = {
            checknickname : Nickname,
        }
        const response = await API.post('/api/checkNickName', checknickname)
        if(response.data === true) {
            setNicknameMessage("사용가능한 닉네임 입니다");
            setIsNickname(true);
        } else  { 
            setNicknameMessage("닉네임 중복입니다");
            setIsNickname(false);
        }
    }
    
    //submit
    const onSubminHandler = (e) => {
        e.preventDefault();

        // isId, isPwd, isCpwd, isName, isPhone, isNickname
        if(isId === true){
            if(isPwd === true){
                if(isCpwd === true){
                    if(isName === true){
                        if(isPhone === true){
                            if(isNickname === true){
                                const user = {
                                    id : Id,
                                    pwd : Pwd,
                                    name : Name,
                                    phone : Phone,
                                    nickname : Nickname,
                                };
                                const response =  API.post('/api/customer', user)
                                .then(console.log(JSON.stringify(user)));


                                sessionStorage.setItem('nick', Nickname);
                                navigate(`/`); //Main Page 이동
                                // eslint-disable-next-line no-restricted-globals
                                location.reload();
                            } else { setbtnCheckMessage("닉네임정보를 확인해주세요"); }
                        } else {setbtnCheckMessage("휴대폰번호를 확인해주세요"); }
                    } else {setbtnCheckMessage("이름을 확인해주세요"); }
                } else {setbtnCheckMessage("비밀번호 확인을 확인해주세요"); }
            } else {setbtnCheckMessage("비밀번호를 확인해주세요"); }
        } else {setbtnCheckMessage("아이디(메일)를 확인해주세요"); }
    }

    return(
        <Row>
            <Col xs="1"></Col>
            <Col xs="10">
            <Form onSubmit={onSubminHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>아이디(이메일)</Form.Label>
               <Row>
                    <Col xs="8">
                        <Form.Control onChange={onIdHandler} type="email" placeholder="email" />
                    </Col>
                    <Col xs="4">
                        <Button  onClick={idCheckBtnHandler} variant="primary">Id중복체크</Button>
                    </Col>
               </Row>
            <Form.Text className="text-muted">{idMessage}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Row>
                    <Col xs="8"><Form.Control onChange={onPwdHandler} type="password" placeholder="Password" /></Col>
                    <Col xs="4"></Col>
                </Row>
               
                <Form.Text className="text-muted">{pwdMessage}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호확인</Form.Label>
                <Row>
                    <Col xs="8"><Form.Control onChange={oncheckPwdHandler} type="password" placeholder="Password Check" /></Col>
                    <Col xs="4"></Col>
                </Row>
               
                <Form.Text className="text-muted">{cpwdMessage}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>이름</Form.Label>
                <Row>
                    <Col xs="8"><Form.Control onChange={onNameHandler} type="text" placeholder="Name" /></Col>
                    <Col xs="4"></Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>휴대폰번호</Form.Label>
                <Row>
                    <Col xs="8"><Form.Control onChange={onPhoneHandler} type="text" placeholder="Phone Number" /></Col>
                    <Col xs="4"> <Button  onClick={phoneBtnHandler} variant="primary">휴대폰 중복체크 </Button></Col>
                </Row>
                <Form.Text className="text-muted">{phoneMessage}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>닉네임</Form.Label>
                <Row>
                    <Col xs="8"><Form.Control onChange={onNicknameHandler} type="text" placeholder="NickName" /></Col>
                    <Col xs="4"><Button  onClick={nicknameCheckBtnHandler} variant="primary">닉네임중복체크 </Button></Col>
                </Row>
                <Form.Text className="text-muted">{nicknameMessage}</Form.Text>
              
            </Form.Group>
            <Row>
            <Col xs="8"><Row><Button variant="primary" type="submit">회원가입</Button></Row></Col>
            <Col xs="4"></Col>
            </Row>

    </Form>
            </Col>
            <Col xs="1"></Col>

        </Row>
    )
}