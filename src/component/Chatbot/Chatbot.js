import HeaderView from "../section/HeaderView";
import FooterView from "../section/FooterView";
import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import basicSteps from './basicSteps';
import { Container} from "react-bootstrap";
import { ThemeProvider } from 'styled-components';

const steps = basicSteps;
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '2em',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

class sampleChatBot extends Component {
render() {
    return (
      <div>
        <HeaderView />
          <Container style={{marginTop:"2em"}}>
            <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              headerTitle="ChatBot Q & A"
              width="100%"
              height="30em"
            />
            </ThemeProvider>
          </Container>
        <FooterView />
      </div>
    );
  }
}
export default sampleChatBot;