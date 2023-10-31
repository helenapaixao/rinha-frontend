import React, { useState } from 'react';
import {JSONTree} from 'react-json-tree';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  //font-size: 48px;
  //width: 80%;
  margin: 0 auto;
  //display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight:700 ;
`;

const SubTitle = styled.h2`
font-size: 24px;
font-weight: 400 ;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
`;

const Loading = styled.div`
  color: #007bff;
  font-size: 16px;
  margin-top: 20px;
`;


function App() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          try {
            const json = JSON.parse(e.target.result as string);
            setJsonData(json);
            setErrorMessage(null);
            setIsLoading(false)
          } catch (error) {
            setErrorMessage('Invalid file. Please load a valid JSON file.');
            console.error('Erro ao analisar JSON:', error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <Title>JSON Tree Viewer</Title>
      <SubTitle>Simple JSON Viewer that runs completely on-client. No data exchange</SubTitle>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {isLoading && <Loading>Loading...</Loading>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {jsonData && (
        <div>
          <h2>JSON Tree</h2>
          <JSONTree data={jsonData} />
        </div>
      )}
    </Container>
  );
}

export default App;
