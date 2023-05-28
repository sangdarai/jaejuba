import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import { Container, Table, Tabs, Tab, Button, Pagination, Form, Col, Row} from "react-bootstrap";
import API from "../../API";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function QnAGoodsAdd(props){

    const getId = sessionStorage.getItem('nick');
    const [getGoodsUpdate, setGoodsUpdate] = useState("")
    const [getGoodsCode, setGoodsCode] = useState("")
    const [getReview, setReview] = useState("")
    const [page, setPage] = useState(1);
    const limit = 10;
    const offset = (page-1) * limit;
    const [intervalpage, setintervalPage] = useState(5);
    const [nextPage, setnextPage] = useState(4);
    const [prePage, setprePage] = useState(0);
    const [getQnaSerch, setQnaSerch] = useState("");
    const serchHandler = (e) => {setQnaSerch(e.currentTarget.value)} 
    const [number, setNumber] = useState(0)

    const [getQNAItem, setQNAItem] = useState([{
        qna_seq : "",
        qna_Id : "",
        qna_division : "",
        qan_title : "",
        qna_content : "",
        qna_date : "",
    }]);

    const QnaData = async () => {
        const serchItem = {division: 2}
        if(getQnaSerch == ""){
            const qnadata = await API.post("/api/qnaSelect", serchItem)
            const inputData = qnadata.data.map((rowData) => ({
                qna_seq : rowData.qna_seq,
                qna_Id : rowData.qna_Id,
                qna_division : rowData.qna_division,
                qan_title : rowData.qan_title,
                qna_content : rowData.qna_content,
                qna_date : rowData.qna_date 
            }))
            setQNAItem(getQNAItem.concat(inputData)); 
        } else if(getQnaSerch != ""){
            const serchItem = {serchtitle: getQnaSerch, division: 2}
            const qnadata = await API.post("/api/qnaserchSelect", serchItem)
            const inputData = qnadata.data.map((rowData) => ({
                qna_seq : rowData.qna_seq,
                qna_Id : rowData.qna_Id,
                qna_division : rowData.qna_division,
                qan_title : rowData.qan_title,
                qna_content : rowData.qna_content,
                qna_date : rowData.qna_date
            }))
            setQNAItem(getQNAItem.concat(inputData));
        }
    }

    const GoodsId = async () => {
        if(getId != null){
            setGoodsUpdate("visible")
        }else{ 
            setGoodsUpdate("hidden")
        }
    }

    const pagefuntion = (datalenth) => {
        const pagelenth = datalenth/limit;
        setPage(nextPage + 2);
        if(nextPage > datalenth){
            setnextPage(datalenth);
        } else {
            setnextPage(nextPage+intervalpage);
        }
        setprePage(prePage+intervalpage)
    }

    const serchQNAHendler = async (e) => {
        e.preventDefault()
        setintervalPage(5);
        setprePage(0);
        setPage(1);
        
       getQNAItem.length = 1;
        setNumber(number + 1)
        console.log(getQNAItem);
    }

    useEffect(() =>{
        GoodsId()
        QnaData()
    }, [number])

    return(
        <div>
            <HeaderView />
        <Container>
            <Container>
                <h1 style={{fontWeight:"bold", textAlign:"center", marginTop:"2em",fontSize:"3em"}}>Q&A</h1>
            </Container>
            <Container style={{marginTop:"3em", textAlign:"center"}}>
                <Button  style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link" href="/QnAsignup">회원가입</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="warning" href="/QnAGoodsAdd">상품등록</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">판매문의</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">기    타</Button>
            </Container>
            <Container style={{marginTop:"2em"}}>
                <Row>
                    <Col sm={8}></Col>
                    <Col sm={4}>
                        <Form onSubmit={serchQNAHendler} className="d-flex">
                            <Form.Control
                            onChange={serchHandler}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            />
                            <Button type="submit" variant="outline-success" style={{width:"5em"}}>검색</Button>
                        </Form>  
                    </Col>
                </Row>
            </Container>
            <Container style={{marginTop:"1em"}}>
                <Table striped bordered hover>
                    <thead style={{borderBottom:"3px solid Orange", borderTop:"3px solid Orange"}}>
                        <tr>
                            <th style={{fontWeight:"bold", textAlign:"center", width:"3em"}}>No</th>
                            <th style={{fontWeight:"bold", textAlign:"center", width:"15em"}}>제    목</th>
                            <th style={{fontWeight:"bold", textAlign:"center", width:"10em"}}>작성자</th>
                            <th style={{fontWeight:"bold", textAlign:"center", width:"10em"}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getQNAItem.slice( offset, offset + limit + 1 ).map((rowData, idx) => {
                            if(idx > 0){
                                return(
                                    <tr key={rowData.qna_seq}>
                                        <td style={{fontWeight:"bold", textAlign:"center"}}>{rowData.qna_seq}</td>
                                        <td><Link to={`/QNAInfo/${rowData.qna_seq}`}> {rowData.qan_title}</Link></td>
                                        <td style={{fontWeight:"bold", textAlign:"center"}}>{rowData.qna_Id.slice(1,3)+"***"}</td>
                                        <td style={{fontWeight:"bold", textAlign:"center"}}>{
                                        new Date(rowData.qna_date).getFullYear()+"-"+
                                        (new Date(rowData.qna_date).getMonth()+1)+"-"+
                                        new Date(rowData.qna_date).getDate()  
                                        }</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
                <Container>
                    <Pagination  className="d-flex justify-content-center">
                    <Pagination.Prev onClick={() => {setPage(nextPage - intervalpage); setnextPage(nextPage-intervalpage); setprePage(prePage-intervalpage)}} disabled={(page/intervalpage) <= 1 }></Pagination.Prev>
                    {(new Array(Math.ceil((getQNAItem.length/limit)-0.1)).fill()).map((item, index) => {
                        if(prePage <= index && index <= nextPage){
                            return(
                                <Pagination.Item 
                                    key={index + 1}
                                    onClick={() => {setPage(index + 1)}}
                                    aria-current={page === index + 5 ? 'page' : null}
                                    >
                                    {index + 1}
                                </Pagination.Item>
                            )
                        }
                    })}
                    <Pagination.Next  onClick={() => {pagefuntion(getQNAItem.length)}} disabled={ intervalpage-1 > (Math.ceil(getQNAItem.length / limit))-nextPage}></Pagination.Next>
                    </Pagination>
                </Container>
                <Container style={{textAlign:"right"}}>
                    <Button variant="warning" style={{visibility:getGoodsUpdate}}>
                        <Link to={`/QNAAdd/${2}`} style={{textDecoration:"none", color:"white", fontWeight:"bold"}} >문의사항 쓰기</Link>
                    </Button>
                </Container>
            </Container>
        </Container>
        <FooterView />
        </div>
    )
}