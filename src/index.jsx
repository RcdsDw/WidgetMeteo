import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components'
import City from './components/cityData';
import "./styles/style.css"

const Container = styled.div `
`

createRoot(document.getElementById('root')).render(
  <Container>
      <City defaultCity={"Ibos"}/>
  </Container>
);
