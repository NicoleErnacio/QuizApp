import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What is the capital of the Philippines?",
    options: ["Cebu", "Manila", "Davao", "Baguio"],
    answer: "Manila",
  },
  {
    question: "How many days are in a week?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "What color is the sky in the morning?",
    options: ["Blue", "Green", "Red", "Black"],
    answer: "Blue",
  },
  {
    question: "Who is the national hero of the Philippines?",
    options: ["Andres Bonifacio", "Jose Rizal", "Emilio Aguinaldo", "Apolinario Mabini"],
    answer: "Jose Rizal",
  },
  {
    question: "What is the national fruit of the Philippines?",
    options: ["Banana", "Mango", "Pineapple", "Watermelon"],
    answer: "Mango",
  },
  {
    question: "How many islands does the Philippines have?",
    options: ["About 3,000", "About 5,000", "About 7,600", "About 10,000"],
    answer: "About 7,600",
  },
  {
    question: "What is the national flower of the Philippines?",
    options: ["Rose", "Sampaguita", "Orchid", "Sunflower"],
    answer: "Sampaguita",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is 12 x 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
  },
  {
    question: "Which gas do plants absorb from the air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const answered = selected !== null;
  const correctAnswer = questions[current].answer;

  const handleAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    if (option === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  const getButtonClass = (option) => {
    if (!answered) return "";
    if (option === correctAnswer) return "correct";
    if (option === selected) return "wrong";
    return "";
  };

  if (finished) {
    return (
      <div className="quiz">
        <h1>Quiz Complete!</h1>
        <p>
          Your score: {score} / {questions.length}
        </p>
        <button onClick={restart}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>
        Question {current + 1} / {questions.length}
      </h2>
      <p>{questions[current].question}</p>

      {questions[current].options.map((option) => (
        <button
          key={option}
          className={getButtonClass(option)}
          onClick={() => handleAnswer(option)}
          disabled={answered}
        >
          {option}
        </button>
      ))}

      {answered && (
        <div className="result">
          <p>
            {selected === correctAnswer
              ? "✅ Correct!"
              : "❌ Wrong!"}
          </p>
          <p>
            Correct answer: <strong>{correctAnswer}</strong>
          </p>
          <button className="next" onClick={handleNext}>
            {current + 1 < questions.length ? "Next" : "See Score"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;