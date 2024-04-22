import logo from './logo.svg';
import './App.css';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

function App() {
  const [code, setCode] = useState(""); 
  const [language, setLanguage] = useState(""); 


  const submitCode = async () => {
    const answer = await fetch(
    "https://9kl9qjlfxi.execute-api.ap-south-1.amazonaws.com/production",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        language: language,
        code: code,
      }),
    }
  );
    const response = answer.json();
    console.log(response);
  };

  const API_KEY = "2e3e90198296daee22c12963e957c33a"

const getWeatherData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log('Weather data:', data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
};

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <div className="App">

      <button
        style={{ 
          background: language=="python" ? "black" : "white",
          color: language=="python" ? "white" : "black",
        }}
        onClick={() => {
          setLanguage("python");
        }}> 

        Python
      </button>

      <button
        style={{ 
          background: language=="java" ? "black" : "white",
          color: language=="java" ? "white" : "black",
        }}
        onClick={() => {
          setLanguage("java");
        }}> 

        Java
      </button>

      <button
        style={{ 
          background: language=="cpp" ? "black" : "white",
          color: language=="cpp" ? "white" : "black",
        }}
        onClick={() => {
          setLanguage("cpp");
        }}> 

        C++
      </button>     

      <button onClick={() => {
        // submitCode();
        getWeatherData('New York');
      }}>SUBMIT</button>       

      <Editor 
        onChange={(e) => {
          setCode(e);
        }}
        theme='vs-dark'
        height="90vh" 
        defaultLanguage="cpp" 
        defaultValue="// write code here" 
        />;
    </div>
  );
}
  
export default App;