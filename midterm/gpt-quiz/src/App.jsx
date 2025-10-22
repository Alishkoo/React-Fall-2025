import { useState, useEffect } from "react";
import ThemeSelector from "./components/ThemeSelector";
import QuestionCard from "./components/QuestionCard";
import ScoreBoard from "./components/ScoreBoard";
import { generateQuestions } from "./api/cohere";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const TOTAL_QUESTIONS = 5;

  useEffect(() => {
    if (!theme) return;

    const fetchQuestions = async () => {
      setLoading(true);
      const qList = await generateQuestions(theme, TOTAL_QUESTIONS);
      setQuestions(qList);
      setCurrentIndex(0);
      setScore(0);
      setIsFinished(false);
      setLoading(false);
    };

    fetchQuestions();
  }, [theme]);

  const startQuiz = (selectedTheme) => setTheme(selectedTheme);

  const handleAnswer = (optionIndex) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    if (currentQ.answer === optionIndex) setScore((prev) => prev + 1);

    const nextIndex = currentIndex + 1;
    if (nextIndex < TOTAL_QUESTIONS) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setTheme(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="app">
      {!theme ? (
        <ThemeSelector onSelect={startQuiz} />
      ) : loading ? (
        <p className="loading text-xl">Генерация вопросов...</p>
      ) : isFinished ? (
        <div className="result-screen">
          <h1>
            Вы получили {score}/{TOTAL_QUESTIONS}!
          </h1>
          <p>
            Вы знаете эту тему{" "}
            <span className="percentage">
              {Math.round((score / TOTAL_QUESTIONS) * 100)}%
            </span>
          </p>
          <button onClick={handleRestart}>Сыграть снова</button>
        </div>
      ) : currentQuestion ? (
        <>
          <ScoreBoard score={score} />
          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
          <p className="text-gray-300 mt-4">
            Вопрос {currentIndex + 1}/{TOTAL_QUESTIONS}
          </p>
        </>
      ) : (
        <p className="error ">Ошибка загрузки вопросов</p>
      )}
    </div>
  );
}

export default App;
