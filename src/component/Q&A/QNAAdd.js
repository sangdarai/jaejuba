import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import { useEffect, useState } from "react";
import { Form, Button, Container} from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../../API";

export default function QNAAdd(){

    const [getQNATitle, setQNATitle] = useState("");
    const [getQNAContent, setQNAContent] = useState("");
    const getId = sessionStorage.getItem('nick');
    const QNACodeData = useParams()
    const [getQNATitleErr, setQNATitleErr] = useState("");
    const [getQNAContentErr, setQNAContentErr] = useState("");
    const QNATitleHandler = (e) => {setQNATitle(e.currentTarget.value)}
    const QNAContentHandler = (e) => {setQNAContent(e.currentTarget.value)}

    const onHandlerEvent = (e) => {
        e.preventDefault();
        const qnadata = {
            qnaid : getId,
            qna_division : QNACodeData.QNACode,
            qnatitle : getQNATitle,
            qnacontent : getQNAContent
        }

        if(getQNATitle == "" ){
            setQNATitleErr("제목을 입력해주세요!")
        }
        if(getQNAContent == ""){
            setQNAContentErr("내용을 입력해주세요!")
        }
        if(getQNATitle != "" && getQNAContent != ""){
            API.post('/api/anaAdd', qnadata);
            window.location.href = "/QnAsignup";
        }

    }

    useEffect(() => {
        console.log(QNACodeData.QNACode);
    }, [])

    return(
        <div>
            <HeaderView />
                <Container>
                        <Container>
                        <h1 style={{fontWeight:"bold", textAlign:"center", marginTop:"2em",fontSize:"3em"}}>Q&A 질문</h1>
                    </Container>
                    <Container style={{marginTop:"5em"}}>
                        <Form onSubmit={onHandlerEvent}>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>제 목</Form.Label>
                                <Form.Control placeholder="문의사항 제목을 입력해주세요" onChange={QNATitleHandler}/>
                                <Form.Text style={{color:"red"}}>{getQNATitleErr}</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Label>내용</Form.Label>
                                <Form.Control
                                    onChange={QNAContentHandler}
                                    as="textarea"
                                    placeholder="문의사항을 작성해주세요"
                                    style={{ height: '20em' }}
                                    />
                                <Form.Text style={{color:"red"}}>{getQNAContentErr}</Form.Text>
                            </Form.Group>
                            <Button variant="warning" type="submit" style={{ width:"100%", fontWeight:"bold", color:"white"}}>
                                문의사항 등록
                            </Button>
                        </Form>
                    </Container>
                </Container>
            <FooterView />
        </div>
    )
}