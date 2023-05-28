import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import "../../css/GoodsDetail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../API";
import { Card, Col, Container, Row, FloatingLabel, Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export default function GoodsDetail(){
    const getId = sessionStorage.getItem('nick');
    const [getGoodsHidden, setGoodsHidden] = useState("")
    const Goodsdata = useParams();
    const [getReview, setReview] = useState("")
    const [getGoodsCode, setGoodsCode] = useState("")
    const [getGoodsTitle, setGoodsTitle] = useState("");
    const [getGoodsPrice, setGoodsPrice] = useState("");
    const [getGoodsAddId, setGoodsAddId] = useState("");
    const [getGoodsSelect, setGoodsSelect] = useState("창작");
    const [gettitleImgRef, settitleImgRef] = useState("");
    const [getEndDate, setEndDate] = useState("");
    const [getGoodsContent, setGoodsContent] = useState("");
    const [getGoodsAutionEnter, setGoodsAutionEnter] = useState(false);
    const [getGoodsAutiionHistory, setGoodsAutiionHistory] = useState(false);
    const [getGoodsAutionMaxPrice, setGoodsAutionMaxPrice] = useState("");
    const [getGoodsAutionMaxSeq, setGoodsAutionMaxSeq] = useState("");
    const [show, setShow] = useState(false);
    const [getDeldteModeal, setDeldteModeal] = useState(false);

    const [getautionPrice, setautionPrice] = useState("");

    const autionPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        if(value.length < 30){
            const removedCommaValue: number = Number(value.replaceAll(",", ""));
            setautionPrice(removedCommaValue.toLocaleString());
        } else {
            window.alert("가격을 다시 생각해 보세요");
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
////////////////////////////////////////////////////////////////////////////////////////
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

    const GoodsInfo = async ()  => {
        const Goodsinfo = {GoodsItem : Goodsdata.GoodsCode}
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
        setGoodsItem(getGoodsItem.concat(inputData))
        setGoodsTitle(inputData[0].GoodsTitle)
        settitleImgRef("https://www.jaejuba.com:4000/"+inputData[0].Goodsimg)
        setGoodsAddId(inputData[0].GoodsaddID)
        setEndDate(inputData[0].GoodsEndDate)
        setGoodsPrice(inputData[0].GoodsPrice)
        setGoodsSelect(inputData[0].GoodsDivision)
        setGoodsContent(inputData[0].GoodsContent.replaceAll("\{https", "\"https").replaceAll("png}", "png\"").replaceAll( "contenteditable={false}", "contenteditable=\"false\""))
    }
////////////////////////////////////////////////////////////////////////////////////////
    const [getAutionPriceHistory, setAutionPriceHistory] = useState([{
        GoodsAutionEachSeq : "",
        GoodsAutionEnterId : "",
        GoodsAutionpirce : ""
    }])

    const AutionPriceHistory = async () => {
        const Goodsinfo = {GoodsItem : Goodsdata.GoodsCode}
        const response = await API.post("/Goods/autionHistory", Goodsinfo)
        const inputData = await response.data.map((rowData) => ({
            GoodsAutionEachSeq : rowData.GoodsAutionEachSeq,
            GoodsAutionEnterId : rowData.GoodsAutionEnterId,
            GoodsAutionpirce : rowData.GoodsAutionpirce
        }))
        setAutionPriceHistory(getAutionPriceHistory.concat(inputData));

    }
////////////////////////////////////////////////////////////////////////////////////////
    const [getAutionMax, setAutionMax] = useState([{
        GoodsAutionpirce : "",
        GoodsAutionEachSeq : ""

    }])

    const AutionMaxData = async() => {
        const Goodsinfo = {GoodsItem : Goodsdata.GoodsCode}
        const response = await API.post("/Goods/AutionMax", Goodsinfo)

        if(response.data[0].MaxPrice == null && response.data[0].MaxSeq == null){
            setGoodsAutionMaxPrice(getGoodsPrice)
            setGoodsAutionMaxSeq("")
        }else{
            const inputData = await response.data.map((rowData) => ({
                GoodsAutionpirce : rowData.MaxPrice,
                GoodsAutionEachSeq : rowData.MaxSeq
            }))
            setGoodsAutionMaxPrice(inputData[0].GoodsAutionpirce)
            setGoodsAutionMaxSeq(inputData[0].GoodsAutionEachSeq)
        }

        // console.log(typeof(getGoodsAutionMaxPrice))
    }
////////////////////////////////////////////////////////////////////////////////////////
const [getReviewItem, setReviewItem] = useState([{
    reviewCode : "",
    reviewCodeseq : "",
    reviewId : "",
    reviewcontent : "댓글이 없습니다",
    reviewtime : ""
}]);

const addReview = async () => {
    const Goodsinfo = {GoodsItem : Goodsdata.GoodsCode}
    const response = await API.post("/Goods/ReviewItem", Goodsinfo)

    const inputData = await response.data.map((rowData) => ({
        reviewCode : rowData.reviewCode,
        reviewCodeSeq : rowData.reviewCodeSeq,
        reviewId : rowData.reviewId,
        reviewcontent : rowData.reviewcontent,
        reviewtime : rowData.reviewtime
    }))
    setReviewItem(getReviewItem.concat(inputData));
}
////////////////////////////////////////////////////////////////////////////////////////

    const GoodsId = async () => {
        const Goodsinfo = {GoodsItem : Goodsdata.GoodsCode}
        const responseId = await API.post("/Goods/GoodsItemId", Goodsinfo)
        if(getId == Object.values(responseId.data[0])){
            setGoodsHidden("visible")
        }else{
            setGoodsHidden("hidden")
        }
        setGoodsCode(Object.values(Goodsdata)) 
    }

    const reviewText = (e) => {
        if(getId == null){
            window.alert("로그인을 하세요")
        }else {
            const value = e.currentTarget.value;
            if(value.length < 300){
                setReview(value)
            } else {
                window.alert("댓글의 최대 수는 300자 입니다")
            }
            
        }
    }

    const reviewClick = async (e) => {
        if(getReview == ""){
            window.alert("댓글이 없습니다")
        } else {
            const review = {
                reviewCode : Object.values(Goodsdata),
                reviewCodeSeq :  getReviewItem.length,
                reviewId : getId,
                reviewContent : getReview
            }
            await API.post("/Goods/GoodsReview", review)
        }

    }

    const AutionEnter = () => {
        if(getId == null){
            return(setShow(true))
        }
        setGoodsAutionEnter(true);

    }

    const EnterPrice = async () => {
        const EnterPrice = {
            autionGoodscode : Goodsdata.GoodsCode,
            autionEachsseq : getGoodsAutionMaxSeq+1,
            autionEnterId : getId,
            autionPrice : getautionPrice,
        }
        const customerPrice = await API.post("/Goods/autionPrice", EnterPrice);
        console.log(Goodsdata.GoodsCode);
        window.location.replace("/GoodsDetail/"+Goodsdata.GoodsCode)
        
    }

    const AutionHistory = () => {
        setGoodsAutiionHistory(true);
        
    }

    const funcDelete = () => {
        setDeldteModeal(true);
    }

    const modalClose = () => {
        setDeldteModeal(false);
    }

    const modalDelete = async () => {
        window.location.replace("/GoodsView");
        const GoodsCode = {GoodDeleteCode : Goodsdata.GoodsCode};
        const fdelete = await API.post("/Goods/GoodsDelete", GoodsCode)
        
    }
 
    useEffect(()=>{
        GoodsInfo()
        GoodsId()
        addReview()
        AutionPriceHistory()
        AutionMaxData()

    }, []) 

    return(
            <div>
                <HeaderView />
                <Container>
                    <Container>
                        <Row >
                            <Col style={{flaot:"right"}} >
                            <Button variant="dark" style={{visibility:getGoodsHidden, float:"right", marginLeft:"10px"}} class="btn float-right">
                                <Link to={`/GoodsUpdate/${getGoodsCode}`} style={{color:"white", textDecoration:"none"}} >수    정</Link>
                            </Button>
                            <Button class="btn float-right" onClick={funcDelete} variant="dark" style={{visibility:getGoodsHidden,  float:"right"}}>
                             삭    제</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <Card style={{fontSize:'2em'}}>
                                    <ListGroup>
                                        <ListGroupItem style={{textAlign:"center", fontWeight:"700", fontSize:"1.3em"}}>{getGoodsTitle}</ListGroupItem>
                                        <ListGroupItem><img style={{ width:'100%'}} src={ gettitleImgRef} id="GoodsContentImg"/></ListGroupItem>
                                        <ListGroupItem style={{fontSize:"0.8em"}}>
                                            { 
                                            "현재경매가 : " + getGoodsAutionMaxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            } 
                                            <Button onClick={AutionHistory} variant="success" style={{float:"right"}}>경매기록</Button>
                                            </ListGroupItem>
                                            {
                                                getGoodsAutiionHistory  == true 
                                                ? <ListGroup>
                                                     <ListGroupItem>경매순위</ListGroupItem>
                                                    {getAutionPriceHistory.map((rowData,idx) => {
                                                        if(idx>0){
                                                            return(
                                                                <ListGroupItem style={{fontSize:"0.6em"}}>
                                                                    <Row>
                                                                    <Col>{idx} 위</Col>
                                                                    <Col>{rowData.GoodsAutionEnterId}</Col>
                                                                    <Col xs={8}>{rowData.GoodsAutionpirce}</Col>
                                                                    </Row>
                                                                </ListGroupItem>
                                                            )
                                                        }

                                                    })}
                                                    </ListGroup>
                                                : null
                                            }
                                        <ListGroupItem style={{fontSize:"0.8em", fontFamily:"var(--font-NanumGothic)"}}>{"등록ID : " + getGoodsAddId }</ListGroupItem>
                                        <ListGroupItem style={{fontSize:"0.8em"}}>{"구분 : " + getGoodsSelect }</ListGroupItem>
                                        <ListGroupItem style={{fontSize:"0.8em"}}>
                                            {"시작가 : " + getGoodsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            <Button onClick={AutionEnter} variant="warning" style={{float:"right"}}>경매참여</Button>
                                            </ListGroupItem>
                                            {
                                                getGoodsAutionEnter == true
                                                ? <ListGroup>
                                                    <ListGroupItem style={{fontSize:"0.8em"}}>

                                                        <Row>
                                                            <Col><Form.Label>제시가격</Form.Label></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={8} md={9}><Form.Control type="text" onChange={autionPrice}  placeholder="가격제시" value={ getautionPrice || '' }/></Col>
                                                            <Col xs={4} md={3}><Button onClick={EnterPrice} variant="warning" style={{float:"right", width:"100%"}}>가격제시</Button></Col>
                                                        </Row>
   
                                                    </ListGroupItem>
                                                </ListGroup>
                                                : null
                                            }
                                        
                                        <ListGroupItem style={{fontSize:"0.8em"}}>{"마감일 : " + getEndDate }</ListGroupItem>
                                        <ListGroup>
                                            <Container id="GoodsMainContent" dangerouslySetInnerHTML={{__html:getGoodsContent}} />
                                        </ListGroup>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
 
                        </Container>
                        <Container>
                            <Container style={{marginTop:"30px"}}>
                                <Card>
                                    <Card.Header>댓글</Card.Header>
                                    <Card>
                                        {getReviewItem.map((rowData, idx)=>{
                                            if(idx > 0){
                                                return(
                                                <Card.Body key={rowData.reviewCode}>
                                                    <Row >
                                                        <Col><Card.Title>{rowData.reviewId}</Card.Title></Col>
                                                        <Col><Card.Text style={{position: 'absolute', right: 0, marginRight: "30px"}}>{rowData.reviewtime}</Card.Text></Col>
                                                        <Card.Text>{rowData.reviewcontent}</Card.Text>
                                                    </Row>
                                                </Card.Body>
                                                )
                                            } else if(getReviewItem.length == 1){
                                                return(
                                                    <Card.Body key={rowData.reviewCode}>
                                                        <Row style={{height:'100px'}}>
                                                            <Col><Card.Text style={{fontSize:'1em', color:"gray", marginLeft:'10px'}}>{"댓글이 없습니다"}</Card.Text></Col>
                                                        </Row>
                                                    </Card.Body>
                                                ) 
                                            }
                                        })}
                                    </Card>
                                </Card>
                            </Container>
                        </Container>
                        <Container>
                            <Container id="ReviewComtext" style={{marginTop:"30px"}}>
                                <Card>
                                <Card.Header >댓글내용</Card.Header>
                                </Card>
                                <FloatingLabel controlId="floatingTextarea2">
                                    <Form onSubmit={reviewClick}>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="댓글을 작성해주세요"
                                            style={{ height: '100px' }}
                                            onChange={reviewText}
                                            />
                                            <Row><Button type="submit">댓글등록</Button></Row>
                                    </Form>

                                </FloatingLabel>
                            </Container>
                        </Container>
                        
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>로그인이 필요한 서비스입니다</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link to={"/Login"}><Button variant="primary">
                        Login
                    </Button></Link>
                    </Modal.Footer>
                </Modal>

                <Modal show={getDeldteModeal} onHide={modalClose} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>삭제</Modal.Title> </Modal.Header>
                        <Modal.Body>
                            <p>삭제하시면 복구가 불가능 합니다</p> 
                            <p>삭제하시겠습니까?</p></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={modalClose}>취소</Button>
                            <Button variant="primary" onClick={modalDelete}>삭제</Button>
                        </Modal.Footer>
                </Modal>
                <FooterView />
            </div>
    ) 
}