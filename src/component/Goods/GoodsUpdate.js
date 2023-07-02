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
import { useNavigate, useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import dateFormat, { masks } from "dateformat";
 
export default function GoodsUpdate(){
    const LoadData = useParams();
    const editorRef = useRef();
    const imgRef = useRef("");
    const [imgFile, setImgFile] = useState("");
    const [getGoodsTitle, setGoodsTitle] = useState(null);
    const [getGoodsPrice, setGoodsPrice] = useState(null);
    const [getGoodsSelect, setGoodsSelect] = useState("");
    const [gettitleImgRef, settitleImgRef] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [getGoodsUpdateDate, setGoodsUpdateDate] = useState("")
    const [getContent, setContent] = useState("")
    const [uploadPreview, setUploadPreview] = useState([]);

    const GoodsTitleHandler = (e) =>{
        const Title = e.currentTarget.value
        if(Title.length < 50){
            setGoodsTitle(Title)
        } else {
            window.alert("최대 제목 길이는 50입니다");
        }
    }
    
    const GoodsPriceHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        const value: string = e.currentTarget.value;
        if(value.length < 30){
            const removedCommaValue: number = Number(value.replaceAll(",", ""));
            setGoodsPrice(removedCommaValue.toLocaleString());
        } else {
            window.alert("금액을 다시 생각해 보세요");
        }
    }
    
    const GoodsSelectHandler = (e) =>{setGoodsSelect(e.currentTarget.value)}

    const LoadGoods = async () => {
        const Goodsinfo = { GoodsItem : LoadData.GoodsCode }
        const response = await API.post("/Goods/GoodsItem", Goodsinfo)
        const inputData = await response.data.map((rowData) => ({
            GoodsSeq : rowData.GoodsSeq,
            GoodsCode : rowData.GoodsCode,
            GoodsaddID : rowData.GoodsaddID,
            GoodsDivision : rowData.GoodsDivision,
            Goodsimg : rowData.Goodsimg,
            GoodsTitle : rowData.GoodsTitle,
            GoodsPrice : rowData.GoodsPrice,
            GoodsEndDate : rowData.GoodsEndDate,
            GoodsContent : rowData.GoodsContent,
            GoodsState : rowData.GoodsState,
            Goodsdate : rowData.Goodsdate,
        }))

        setGoodsTitle(inputData[0].GoodsTitle)
        settitleImgRef(inputData[0].Goodsimg)
        setEndDate(inputData[0].GoodsEndDate)
        console.log(getEndDate);
        setGoodsPrice(inputData[0].GoodsPrice)
        setGoodsSelect(inputData[0].GoodsDivision) 
        editorRef.current.getInstance().setHTML((inputData[0].GoodsContent).replaceAll("\{https", "\"https").replaceAll("png}", "png\"").replaceAll( "contenteditable={false}", "contenteditable=\"false\""))
        console.log((inputData[0].GoodsContent).replaceAll("\{https", "\"https").replaceAll("png}", "png\"").replaceAll( "contenteditable={false}", "contenteditable=\"false\""));
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
                goodsupdateCode : Object.values(LoadData),
                goodsSelect : getGoodsSelect,
                goodsImgname : gettitleImgRef,
                goodsTitle : getGoodsTitle,
                goodsPrice : getGoodsPrice,
                goodsEndDate : getEndDate,
                GoodsContents : contentHtml.replaceAll("\"http","\{http").replaceAll("png\"","png}").replaceAll("contenteditable=\"false\"", "contenteditable={false}"),
                GoodsState : true,
            }
            API.post('/api/Updategoodssdata', GoodsData);
            window.location.replace("https://www.jaejuba.com/GoodsDetail/"+LoadData.GoodsCode);
        }
    } 

    const saveImgFile = async (e) => {
        const imgaeFile = e.target.files[0];
        try{
            const option = {
                maxSizeMb : 1,
            }
            const compressedFile =  await imageCompression(imgaeFile, option);
            const formdata = new FormData();
            formdata.append("img", compressedFile);
            const res = await API.post('/api/goodsimg', formdata, {
                headers: {"Content-Type" : "multipart/form-data"}
            })
            settitleImgRef(res.data);
        } catch(e){
            console.log(e)
        }
    }

    const onUploadImage = async (blob, callback ) => {
        try{
            const option = {
                maxSizeMb : 1,
            }
            const compressedFile =  await imageCompression(blob, option);
            const formData = new FormData();
            formData.append('img', compressedFile);
            const res = await API.post('/api/goodsimg', formData, 
            { headers:{"Content-Type": "multipart/form-data"}
            }).then(res=>{
                callback("https://www.jaejuba.com:4000/" + res.data)
            })
            .catch(err=>{
                window.alert("업로드 실패");
            });
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        LoadGoods()
    },[])

    const setEndDateHendler = (date) =>{

        const year = new Date(date).getFullYear() ;
        const month = new Date(date).getMonth()+1 ;
        const day = new Date(date).getDate() ;
        const endDay = year+"-"+month+"-"+day;
        setEndDate(year+"-"+month+"-"+day);
    }

    return(
        <div className="Goods">
            <HeaderView />
            <Container>
                <Form onSubmit={handleClick}> 
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Row><Form.Label style={{ fontSize:"1em" }}>메인이미지</Form.Label></Row>
                                <Row xs={1} md={1}>
                                    <Container>
                                        <img src={"https://www.jaejuba.com:4000/"+gettitleImgRef} id="profilimg" alt="프로필 이미지"/>
                                        <Form.Control type="file" accept="image/+*" id="profileImg" onChange={saveImgFile} ref={imgRef}/>
                                    </Container>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>제    목</Form.Label>
                                <Form.Control placeholder="제목을 입력해주세요" onChange={GoodsTitleHandler} value={getGoodsTitle || ''}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">   
                                <Form.Label>기    간</Form.Label>
                                <DatePicker 
                                        value={getEndDate}
                                        dateFormat="yyyy-MM-dd"
                                        onSelect={date => setEndDateHendler(date)}
                                        locale={ko} 
                                        customInput={		      // 날짜 뜨는 인풋 커스텀
                                            <Form.Control rows={1} style={{width:"100%"}}/>
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3"> 
                                <Form.Label>금    액</Form.Label>
                                <Form.Control placeholder="금액을 입력해주세요" type="text" onChange={GoodsPriceHandler} value={getGoodsPrice  || ''}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3"> 
                                <Form.Label>카테고리</Form.Label>
                                    <Form.Select onChange={GoodsSelectHandler} value={getGoodsSelect}>
                                        <option value={"창작"}>창작</option>
                                        <option value={"희소성"}>희소성</option>
                                        <option value={"특이한물건"}>특이한물건2</option>
                                        <option value={"명품"}>명품</option>
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                        <Row><Button className="btnGoodsSave" type="submit">저  장</Button></Row>
                    </Row>
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
                                hooks = {{ addImageBlobHook : onUploadImage }}
                                />
                        </Container>
                </Form>
            </Container>
            <FooterView />
        </div>
    )
}