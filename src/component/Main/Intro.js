import { Container, Row, Col, Image, Nav, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import charge from "/home/my-app9/src/component/Main/charge.PNG"
import AutionJoin from "/home/my-app9/src/component/Main/AutionJoin.png"
import parson1 from "/home/my-app9/src/component/Main/n_1_fj@2x.png"
import parson2 from "/home/my-app9/src/component/Main/n_2_fm.png"
import ActionLoad from "/home/my-app9/src/component/Main/actionload.PNG"
import React, { useEffect, useRef, useState } from "react";
import API from "../../API";

export default function Intro(){

    const [getgoodsCount, setgoodsCount] = useState(4);

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

    const newGoodsList = async () => {
        const serchItem = {
            goodsCount : getgoodsCount
        }

        const response = await API.get("/Intro/Goods/GoodsInfo", serchItem)
        console.log(response)
        newGoodsData(response);
    }

    function newGoodsData(res){
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

    useEffect(()=>{
        newGoodsList();
    }, [])


    return(
        <Container>
                <HeaderView/>
                <Row>
                    <Image  src={charge} />
                </Row>
                <Row>
                    <p>Hot </p>
                </Row>
                <Row xs={1} md={2}>
                    <Col>
                        <Button href="/GoodsView" style={{backgroundColor:"transparent", border:"0"}}><Image src={AutionJoin} /></Button>
                    </Col>
                    <Col>
                        <Row><Image src={parson1} style={{ marginTop:"1em" }} /></Row>
                        <Row><Image src={parson2} style={{ marginTop:"1em" }} /></Row>
                    </Col>
                </Row>
                <Row>

                </Row>
                <p>New</p>
            <Container id="Goodsbody">
                <Row xs={1} md={4} className="g-4">
                    {getGoodsItem.map((rowData, idx) => {
                            if(idx > 0){
                                return(
                                    <Col key={rowData.GoodsCode}>
                                        <Card >
                                            <Link to={`/GoodsDetail/${rowData.GoodsCode}`} style={{ textDecoration: "none", color:"black" }}>
                                                <Card.Img variant="top" src={"https://www.jaejuba.com:4000/"+rowData.Goodsimg} style={{height:"230px"}}/>
                                                <Card.Body>
                                                    <Card.Title style={{fontSize:"0.5em"}}>{rowData.GoodsTitle}</Card.Title>
                                                    <Card.Title style={{fontSize:"0.9em", fontWeight:"bold"}}>{rowData.GoodsPrice+"원"}</Card.Title>
                                                    <Card.Title style={{fontSize:"0.6em"}}>{rowData.GoodsaddID}</Card.Title>
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                )
                            }
                        })}              
                </Row>
            </Container>
                <Row>
                    <Image  src={ActionLoad} style={{ marginTop:"1em"}}/>
                </Row>
            <FooterView />
        </Container>
    )
}