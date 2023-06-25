import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import "../../css/AddGoods.css";
import React, {useEffect, useState } from "react";
import API from "../../API";
import icon from "../../icon/GoodTileImg.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from 'date-fns/esm/locale';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Button, Tooltip } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import dateFormat, { masks } from "dateformat";
import moment from "moment";

export default function AddGoods(){

    const navigate = useNavigate();

    const editorRef = useRef();
    const imgRef = useRef("");
    const [imgFile, setImgFile] = useState("");
    const getId = sessionStorage.getItem('nick');
    const [getGoodsTitle, setGoodsTitle] = useState(null);
    const [getGoodsPrice, setGoodsPrice] = useState(null);
    const [getGoodsSelect, setGoodsSelect] = useState("창작");
    // const titleImgRef = useRef("");
    const [gettitleImgRef, settitleImgRef] = useState("");
    const [getEndDate, setEndDate] = useState(new Date());
    const [uploadPreview, setUploadPreview] = useState([]);
    const [getPriceMessage, setPriceMessage] = useState('');
    const [getGoodsCode, setGoodsCode] = useState('');

    const GoodsTitleHandler = (e) =>{
        const Title = e.currentTarget.value
        if(Title.length < 50){
            setGoodsTitle(Title)
        } else {
            window.alert("최대 제목 길이는 50입니다");
        }
    }

    const GoodsSelectHandler = (e) =>{setGoodsSelect(e.currentTarget.value)}

    const GoodsPriceHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        const value: string = e.currentTarget.value;
        if(value.length < 30){
            const removedCommaValue: number = Number(value.replaceAll(",", ""));
            setGoodsPrice(removedCommaValue.toLocaleString());
        } else {
            window.alert("금액을 다시 생각해 보세요");
        }
    }

    const compressImg = async (e) => {
        const imgaeFile = e.target.files[0];
        try{
            const option = {
                maxSizeMb : 2,
            }
            const compressedFile =  await imageCompression(imgaeFile, option);
            const formdata = new FormData();
            formdata.append("img", compressedFile);
            const res = await API.post('/api/goodsimg', formdata, {headers: {"Content-Type" : "multipart/form-data"}
            })
            settitleImgRef(res.data);
            setUploadPreview("https://www.jaejuba.com:4000/"+res.data);
        } catch(e){
            console.log(e)
        }
    }

    function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const addCodeNumber = () => {
        setGoodsCode(randomNumberInRange(1,10000000)+getId)
    }

    const handleClick = (e) => {
        e.preventDefault();

        if(getGoodsTitle === null){
            window.alert("제목을 입력하세요");
        } else if(getGoodsPrice === null){
            window.alert("금액을 입력하세요");
        } else if(getGoodsPrice === "0"){
            window.alert("금액을 0원 이상 입력하세요");
        } else {
            const editorIns = editorRef.current.getInstance(); 
            // const contentMark = editorIns.getMarkdown(); 
            const contentHtml = editorIns.getHTML();
    
            console.log(contentHtml)
    
            const GoodsData = {
                goodscode : getGoodsCode,
                goodsid : getId,
                goodsSelect : getGoodsSelect,
                goodsImgname : gettitleImgRef,
                goodsTitle : getGoodsTitle,
                goodsPrice : getGoodsPrice,
                goodsEndDate : moment(getEndDate).format("YYYY-MM-DD HH:mm"),
                GoodsContents : contentHtml,
                GoodsState : true,
            }
            console.log(getGoodsTitle)
            API.post('/api/addgoodssdata', GoodsData)
            window.location.replace("/GoodsDetail/"+getGoodsCode)
        }
    }

    const onUploadImage = async (blob, callback) => {
        const imgFile = blob;
        try{
            const option = {
                maxSizeMb : 2,
            }
            const compressedFile =  await imageCompression(imgFile, option);
            const formData = new FormData();
            formData.append('img', compressedFile);
            console.log(formData)
            await API.post('/api/goodsimg', formData, {headers:{"Content-Type": "multipart/form-data"}})
            .then(res=>{
                callback("https://www.jaejuba.com:4000/" + res.data)
            })
            .catch(err=>{
                window.alert("업로드 실패");
            });
        } catch(e){
        }
    }

    const setEndDateHendler = (date) =>{
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth()+1;
        const day = new Date(date).getDate();
        
        const endDay = year+"-"+month+"-"+day;
        setEndDate(year+"-"+month+"-"+day);
    }

    useEffect(()=>{
        addCodeNumber();
    },[])

    return( 
        <div className="Goods">
            <HeaderView />
            <Container>
                <Form onSubmit={handleClick}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Row><Form.Label style={{ fontSize:"1em" }}>메인이미지</Form.Label></Row>
                                <Row xs={1} md={1}>
                                    <Container>
                                        <img id="titleImgView" src={uploadPreview}  alt="프로필 이미지"/>
                                        <Form.Control type="file" accept="image/+*"  onChange={compressImg} ref={imgRef}/>
                                    </Container>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>제    목</Form.Label>
                                <Form.Control placeholder="제목을 입력해주세요" onChange={GoodsTitleHandler}></Form.Control>
                                <Form.Text className="text-muted">{}</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">   
                                <Form.Label>기    간</Form.Label>
                                <DatePicker
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        onChange={date => setEndDate(date)}
                                        selected={getEndDate}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30} // 15분 단위로 선택 가능한 box가 나옴
                                        timeCaption="time"
                                        minDate={new Date()}
                                        locale={ko}
                                        customInput={		      // 날짜 뜨는 인풋 커스텀
                                            <Form.Control as="textarea" rows={1} style={{width:"100%"}} />
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3"> 
                                <Form.Label>금    액</Form.Label>
                                <Form.Control 
                                type="text" placeholder="금액을 입력해주세요" onChange={GoodsPriceHandler} value={getGoodsPrice || '' }
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3"> 
                                <Form.Label>카테고리</Form.Label>
                                    <Form.Select onChange={GoodsSelectHandler}>
                                        <option value={"창작"}>창작</option>
                                        <option value={"희소성"}>희소성</option>
                                        <option value={"특이한물건"}>특이한물건</option>
                                        <option value={"명품"}>명품</option>
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row><Button className="btnGoodsSave" type="submit">저  장</Button></Row>
                        
                    <div id="editorView"></div>
                        <Container>
                            <Editor
                                ref = {editorRef}
                                preventDefault="hellow"
                                initialValue="WYSIWYG"
                                previewStyle="vertical"
                                height="1300px"
                                initialEditType="WYSIWYG"
                                useCommandShortcut={true}
                                language="ko-KR"
                                hooks = {{
                                    addImageBlobHook : onUploadImage
                                }}
                                />
                        </Container>
                    
                    
                </Form>
            </Container>
            <FooterView />
        </div>
    )
}                                                               
