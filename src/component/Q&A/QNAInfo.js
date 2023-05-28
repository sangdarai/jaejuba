import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import { useEffect, useState } from "react";
import { Container, Button, Table} from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../../API";

export default function QNAInfo(){

    const QNACode = useParams();
    const [getQnAseq, setQnAseq] = useState("");
    const [getQnAid, setQnAid] = useState("");
    const [getQnAdivision, setQnAdivision] = useState("");
    const [getQnAtitle, setQnAtitle] = useState("");
    const [getQnAcontent, setQnAcontent] = useState("");
    const [getQnAdate, setQnAdate] = useState("");

    const [getQNAItem, setQNAItem] = useState([{
        qna_seq : "",
        qna_Id : "",
        qna_division : "",
        qan_title : "",
        qna_content : "",
        qna_date : "",
    }]);

    const QNAcontent = async () => {
        const qnaCode = {qnacodeNum : QNACode.QNACode}
        const qnadata = await API.post("/api/qnainfo", qnaCode)
        const inputData = qnadata.data.map((rowData) => ({
            qna_seq : rowData.qna_seq,
            qna_Id : rowData.qna_Id,
            qna_division : rowData.qna_division,
            qan_title : rowData.qan_title,
            qna_content : rowData.qna_content,
            qna_date : rowData.qna_date 
        }))
        // setQNAItem(getQNAItem.concat(inputData));
        // console.log(qnadata);
        setQnAseq(inputData[0].qna_seq)
        setQnAid(inputData[0].qna_Id)
        setQnAdivision(inputData[0].qna_division)
        setQnAtitle(inputData[0].qan_title)
        setQnAcontent(inputData[0].qna_content)
        setQnAdate(inputData[0].qna_date)
    }
 
    useEffect(()=>{
        QNAcontent()
    }, [])

    return(
        <div>
            <HeaderView />
        <Container>
            <Container>
                <h1 style={{fontWeight:"bold", textAlign:"center", marginTop:"2em",fontSize:"3em"}}>Q&A</h1>
            </Container>
            <Container style={{marginTop:"3em", textAlign:"center"}}>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">회원가입</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">상품등록</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">판매문의</Button>
                <Button style={{fontWeight:"bold", textAlign:"center", textDecoration:"none", color:"black", fontSize:"1.5em", marginLeft:"1em"}} variant="link">기    타</Button>
            </Container>
            <Container style={{marginTop:"2em", height:"50em"}}>
                <Table style={{height:"100%"}}>
                    <thead style={{backgroundColor:"#e9ecef", height:"10%", borderTop:"2px solid Orange", borderBottom:"2px solid Orange"}}>
                        <tr  style={{fontSize:"1.3em", fontWeight:"bold", verticalAlign:"middle"}}>
                            <td colSpan={2}>{"Q : "+getQnAtitle}</td>
                        </tr>
                    </thead>
                    <tbody style={{color:"white", borderBottom:"2px solid Orange", height:"90%"}}>
                        <tr style={{color:"black", fontSize:"1em", height:"60%"}}>
                            <td style={{width:"10%", height:"60%", backgroundColor:"#e9ecef", verticalAlign:"middle", textAlign:"center", fontSize:"1.5em", fontWeight:"bold"}}>Q</td>
                            <td style={{wordBreak:"break-all"}}>{getQnAcontent}</td>
                        </tr>
                        <tr style={{color:"black", fontSize:"1em", height:"30%", borderTop:"2px solid Orange"}}>
                            <td style={{width:"10%", backgroundColor:"#e9ecef", verticalAlign:"middle", textAlign:"center", fontSize:"1.5em", fontWeight:"bold"}}>A</td>
                            <td style={{wordBreak:"break-all"}}>11sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas1sdsdadasdas11sdsdadasdas1sdsdadasdas1s</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
        <FooterView />
        </div>
    )   
}