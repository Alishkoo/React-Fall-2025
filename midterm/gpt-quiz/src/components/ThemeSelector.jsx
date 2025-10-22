export default function ThemeSelector({ onSelect }) {
  const themes = ["Наука", "История", "Песни", "Космос", "Фантастика"];

  return (
    <div className="theme-selector">
      <h2>Выберите тему викторины</h2>
      <div className="themes">
        {themes.map((theme) => (
          <button key={theme} onClick={() => onSelect(theme)}>
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
