export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map((opt, idx) => (
          <button key={idx} onClick={() => onAnswer(idx)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
