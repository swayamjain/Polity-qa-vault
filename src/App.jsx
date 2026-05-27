import React, { useState } from 'react';
import { BookOpen, BarChart2, Calendar, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import data from './data.json';

// Sidebar Component
const Sidebar = ({ activePaperId, onSelectPaper }) => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <BookOpen className="logo-icon" size={32} />
        <div className="logo-text">
          <h1>Polity<br/>Q&A Vault</h1>
          <span className="logo-subtitle">CC<br/>Swayam<br/>Jain</span>
          <p>Political Science II</p>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-item">
          <BarChart2 size={18} />
          <span>Predictive Analysis</span>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-title">Exam Papers</div>
        {data.papers.map((paper) => (
          <div 
            key={paper.id}
            className={`nav-item ${activePaperId === paper.id ? 'active' : ''}`}
            onClick={() => onSelectPaper(paper.id)}
          >
            {paper.id === 'predictive-paper' ? (
              <BookOpen size={18} />
            ) : (
              <Calendar size={18} />
            )}
            <span>{paper.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Accordion Component
const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <ChevronDown 
          size={20} 
          className={`accordion-icon ${isOpen ? 'open' : ''}`} 
        />
      </div>
      {isOpen && content && (
        <div className="accordion-body markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

// Main Content Component
const ContentArea = ({ paper }) => {
  if (!paper) return <div className="main-content">Select a paper</div>;

  return (
    <div className="main-content">
      <div className="main-header">
        <h1 className="main-title">{paper.title}</h1>
        <p className="main-subtitle">Click on any question below to reveal the detailed answer.</p>
      </div>

      <div className="accordion-container">
        {paper.questions.map((q, idx) => (
          <Accordion key={idx} title={q.title} content={q.content} />
        ))}
      </div>
    </div>
  );
};

// App Component
const App = () => {
  const [activePaperId, setActivePaperId] = useState(data.papers[0]?.id);
  
  const activePaper = data.papers.find(p => p.id === activePaperId);

  return (
    <>
      <Sidebar activePaperId={activePaperId} onSelectPaper={setActivePaperId} />
      <ContentArea paper={activePaper} />
    </>
  );
};

export default App;
