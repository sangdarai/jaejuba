import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import { Container, Table, Tabs, Tab, Button, Pagination, Form, Col, Row, Nav, Card} from "react-bootstrap";
import { useEffect, useState } from "react";
import API from "../../API";
import { Link } from "react-router-dom";

export default function ADMINPage(){

    const getId = sessionStorage.getItem('nick');

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

    const myGoodsList = async () => {
        const myItem = { GoodsId : getId}
        const response = await API.post("/api/myAdmin", myItem);
        serchmyItem(response);
    }

    function serchmyItem(res){
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

    useEffect(() => {
        myGoodsList();
    }, [])

    return(
        <div>
            <HeaderView />
            <Container id="Goodsbody">
                    {getGoodsItem.map((rowData, idx) => {
                            if(idx > 0){
                                return(
                                        <Card key={rowData.GoodsCode} style={{marginTop:"2em", height:"70%"}}>
                                                <Row>
                                                    <Col xs={12} md={3}>
                                                        <Card.Img  src={"https://www.jaejuba.com:4000/"+rowData.Goodsimg} style={{padding:"0.7em"}}/>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Card.Body style={{marginTop:"2em"}}>
                                                            <Card.Title style={{fontSize:"2em", fontWeight:"400"}}>{rowData.GoodsTitle}</Card.Title>
                                                            <Card.Title style={{fontSize:"1em"}}>{rowData.GoodsaddID}</Card.Title>
                                                            <Card.Title style={{fontSize:"1em"}}>{rowData.GoodsDivision}</Card.Title>
                                                            <Card.Title style={{fontSize:"1em"}}>{rowData.GoodsPrice+"원"}</Card.Title>
                                                            <Card.Text style={{fontSize:"1em"}}>{"종료일 : "+rowData.GoodsEndDate}</Card.Text>
                                                        </Card.Body>
                                                    </Col>
                                                    <Col xs={12} md={2} style={{textAlign:"center", margin:"auto"}}>
                                                            <Card.Body style={{marginTop:"2em"}}>
                                                                <Button variant="outline-success" style={{fontSize:"1em", width:"5em"}} href={`/GoodsDetail/${rowData.GoodsCode}`}>수정</Button>
                                                                <Button variant="success" style={{fontSize:"1em", width:"5em"}}>진행중</Button>
                                                             </Card.Body>
                                                    </Col>
                                                </Row>
                                        </Card>
                                )
                            }
                        })}
            </Container>
            <FooterView />
        </div>
    )
}