import { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artWork, setArtWork] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Blue 🔵", "Yellow 🟡", "White ⚪", "Green 🟢"],
    },
    {
      question: "What's your favorite season?",
      options: ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"]
    },
    {
      question: "Which type of music do you prefer?",
      options: ["Classical 🎻", "Rock 🎸", "Pop 🎤", "Jazz 🎷"]
    },
    {
      question: "What is your preferred type of vacation?",
      options: ["Beach 🏖️", "Mountains 🏔️", "City 🏙️", "Countryside 🌳"]
    },
    {
      question: "Which drink do you prefer?",
      options: ["Coffee ☕", "Tea 🍵", "Juice 🧃", "Water 💧"]
    },
    {
      question: "What is your favorite type of movie?",
      options: ["Action 🎬", "Comedy 😂", "Drama 🎭", "Horror 👻"]
    },
    {
      question: "Which type of book do you prefer?",
      options: ["Fiction 📚", "Non-Fiction 📖", "Mystery 🕵️‍♂️", "Fantasy 🧙‍♂️"]
    },
    {
      question: "What is your favorite time of day?",
      options: ["Morning 🌅", "Afternoon 🌞", "Evening 🌇", "Night 🌙"]
    },
    {
      question: "What is your favorite type of pet?",
      options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Fish 🐠"]
    },
    {
      question: "Which type of art do you prefer?",
      options: ["Painting 🎨", "Sculpture 🗿", "Photography 📸", "Digital Art 💻"]
    },
    {
      question: "What fictional character do you prefer?",
      options: ["Superhero 🦸‍♂️", "Ninja 🥷", "Wizard 🧙‍♂️", "Fairy 🧚‍♀️"]
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Blue 🔵": "Water",
    "Yellow 🟡": "Air",
    "White ⚪": "Earth",
    "Green 🟢": "Fire",
    "Spring 🌸": "Air",
    "Summer ☀️": "Fire",
    "Autumn 🍂": "Earth",
    "Winter ❄️": "Water",
    "Classical 🎻": "Earth",
    "Rock 🎸": "Fire",
    "Pop 🎤": "Water",
    "Jazz 🎷": "Air",
    "Beach 🏖️": "Water",
    "Mountains 🏔️": "Earth",
    "City 🏙️": "Fire",
    "Countryside 🌳": "Air",
    "Coffee ☕": "Fire",
    "Tea 🍵": "Water",
    "Juice 🧃": "Earth",
    "Water 💧": "Air",
    "Action 🎬": "Fire",
    "Comedy 😂": "Air",
    "Drama 🎭": "Water",
    "Horror 👻": "Earth",
    "Fiction 📚": "Water",
    "Non-Fiction 📖": "Earth",
    "Mystery 🕵️‍♂️": "Air",
    "Fantasy 🧙‍♂️": "Fire",
    "Morning 🌅": "Fire",
    "Afternoon 🌞": "Earth",
    "Evening 🌇": "Water",
    "Night 🌙": "Air",
    "Dog 🐶": "Earth", 
    "Cat 🐱": "Water", 
    "Bird 🐦": "Air", 
    "Fish 🐠": "Fire",
    "Painting 🎨": "Earth",
    "Sculpture 🗿": "Fire",
    "Photography 📸": "Air",
    "Digital Art 💻": "Water",
    "Superhero 🦸‍♂️": "Air", 
    "Ninja 🥷": "Water", 
    "Wizard 🧙‍♂️": "Earth", 
    "Fairy 🧚‍♀️": "Fire"
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchImage(query) {
    async function fetching(url){
      const response = await fetch(url);
      if(!response.ok){
        throw new Error("Failed to fetch artwork information");
      }
      return response.json();
    }
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`;
    const objectIDs = await fetching(url);
    const objectID = objectIDs.objectIDs[Math.floor(Math.random()*objectIDs.total)];
    url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    console.log(url);
    let data = await fetching(url);
    while(data.primaryImage===""){
      const objectID = objectIDs.objectIDs[Math.floor(Math.random()*objectIDs.total)];
      url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
      data = await fetching(url);
    }
    setArtWork(data);
  }

  useEffect(
    function () {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchImage(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  return (
    // <UserProvider value={{ user: userName, setName: setUserName }}>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={currentQuestionIndex < questions.length ? (
            <Question
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
            />
          ) : (
            
            <Results element={element} artwork={artWork} />
          )}
        />
      </Routes>
    </>
    /* </UserProvider> */
  );
}

export default App