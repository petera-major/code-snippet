export default function FilterBar({ setFilterLang, activeLang }) {
    const languages = ["All", "JavaScript", "Python", "HTML", "C#", "Go", "PHP", "SQL", "CSS", "TypeScript", "C++", "Java", "Other"];
  
    return (
      <div className="filter-buttons">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setFilterLang(lang)}
            className={`filter-pill ${activeLang === lang ? "active" : ""}`}
          >
            {lang}
          </button>
        ))}
      </div>
    );
  }
  