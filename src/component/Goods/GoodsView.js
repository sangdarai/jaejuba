import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import "../../css/GoodsView.css"
// import HeaderView from "./section/HeaderView";
// import FooterView from "./FooterView";
import React, { useEffect, useRef, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Card, Navbar, Button } from "react-bootstrap";
import { set } from "date-fns";


export default function GoodsView(props){

    const [getSerchSelect, setSerchSelect]= useState("");
    const [getSerchTitle, setSerchTitle]= useState("");
    const [getSerchSelectItem, setSerchSelectItem]= useState("전체");
    const [getSerchTitleItem, setSerchTitleItem]= useState("");
    const serchSelectHendler = (e) => {setSerchSelectItem(e.currentTarget.value)};
    const serchTitleHendler = (e) => {setSerchTitleItem(e.currentTarget.value)};
    const [number, setNumber] = useState(0)

    const [getGoodsItem, setGoodsItem] = useState([{
        GoodsSeq : "",
        GoodsCode : "",
        GoodsaddID : "",
        GoodsDivision : "",
        Goodsimg : "",
        GoodsTitle : "",
        GoodsPrice : "",
        GoodsEndDate : "",
        GoodsContent : "",
        GoodsState : "",
        Goodsdate : ""
    }]);

    const goodsList = async () => {

        const serchItem = {
            selectserchitem: getSerchSelect,
            titleserchitem : getSerchTitle
        }
        const sItem = {selectserchitem: getSerchSelect}
        const tItem = {titleserchitem: getSerchTitle}

        if(getSerchSelect == "" && getSerchTitle == ""){
           const response = await API.post("https://www.jaejuba.com:4000/Goods/GoodsInfo")
           console.log(response)
           serchread(response);
        } else if(getSerchSelect != "전체" && getSerchTitle == ""){
           const response = await API.post("/Goods/GoodsInfo/serch/select", sItem)    
           serchread(response);
        } else if(getSerchSelect == "전체" && getSerchTitle != ""){
            const response = await API.post("/Goods/GoodsInfo/serch/title", tItem)    
            serchread(response);
         } else if(getSerchSelect != "전체" && getSerchTitle != ""){
            const response = await API.post("/Goods/GoodsInfo/serch/title&select", serchItem)    
            serchread(response);
         }else if(getSerchSelect == "전체" && getSerchTitle == ""){
            const response = await API.post("/Goods/GoodsInfo") 
            serchread(response);
         } else if ( getGoodsItem.length == 1){
            const response = await API.post("/Goods/GoodsInfo")
            serchread(response);
         }
    }

    function serchread(res){
        const inputData = res.data.map((rowData) => ({
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
        setGoodsItem(getGoodsItem.concat(inputData))
    }

    const serchHendler = (e) => {
        e.preventDefault()
        setSerchSelect(getSerchSelectItem)
        setSerchTitle(getSerchTitleItem)
        getGoodsItem.length = 1;
        setNumber(number + 1)
    }
    
    useEffect(()=>{
        goodsList();
    }, [number])

    return(
        <div >
            <HeaderView />
            <Navbar id="navbar" style={{height:"7em"}} expand="lg">
                <Container>
                    <Col xs={12} md={2}></Col>
                    <Col xs={12} md={8}>
                        <Form className={"d-flex"} onSubmit={serchHendler}>
                                <Form.Select onChange={serchSelectHendler} style={{height:"3.5em", width:"10em"}} value={getSerchSelectItem}>
                                    <option value={"전체"}>전체</option>
                                    <option value={"창작"}>창작</option>
                                    <option value={"희소성"}>희소성</option>
                                    <option value={"특이한물건"}>특이한물건</option>
                                    <option value={"명품"}>명품</option>
                                </Form.Select>
                                <Form.Control
                                    onChange={serchTitleHendler}
                                    value={getSerchTitleItem}
                                    style={{height:"3.5em"}}
                                    type="search"
                                    placeholder="Serch"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button type="submit" style={{width:"7em", height:"3.5em", fontWeight:"bold", color:"black"}} variant="warning">검 색</Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={2}></Col>
                </Container>
            </Navbar>
            <Container id="Goodsbody">
                <Row xs={1} md={3} className="g-4">
                    {getGoodsItem.map((rowData, idx) => {
                            if(idx > 0){
                                return(
                                    <Col key={rowData.GoodsCode}>
                                        <Card >
                                            <Link to={`/GoodsDetail/${rowData.GoodsCode}`} style={{ textDecoration: "none", color:"black" }}>
                                                <Card.Img variant="top" src={"https://www.jaejuba.com:4000/"+rowData.Goodsimg} style={{height:"300px"}}/>
                                                <Card.Body>
                                                    <Card.Title style={{fontSize:"1em"}}>{rowData.GoodsTitle}</Card.Title>
                                                    <Card.Title style={{fontSize:"0.8em"}}>{rowData.GoodsaddID}</Card.Title>
                                                    <Card.Title style={{fontSize:"0.7em"}}>{rowData.GoodsDivision}</Card.Title>
                                                    <Card.Title style={{fontSize:"0.7em"}}>{rowData.GoodsPrice+"원"}</Card.Title>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Card.Text style={{fontSize:"0.7em"}}>{"종료일 : "+rowData.GoodsEndDate}</Card.Text>
                                                </Card.Footer>    
                                            </Link>
                                        </Card>
                                    </Col>
                                )
                            }
                        })}              
                </Row>
            </Container>
            <FooterView />
        </div>
    )
}