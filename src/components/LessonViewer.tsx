import React from 'react';
import { useLessonContent } from '../hooks/useContentLoader';

interface LessonViewerProps {
  level: 'junior' | 'middle' | 'senior' | 'supersenior';
  classNumber: number | string;
  chapterNumber: number;
  lessonNumber: number;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  level,
  classNumber,
  chapterNumber,
  lessonNumber
}) => {
  const { content, loading, error } = useLessonContent(
    level,
    classNumber,
    chapterNumber,
    lessonNumber
  );

  if (loading) {
    return (
      <div className="lesson-loading">
        <div className="spinner"></div>
        <p>Loading your lesson...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lesson-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!content) {
    return <div>No content available</div>;
  }

  return (
    <div className="lesson-container">
      {/* Header */}
      <header className="lesson-header">
        <h1>{content.lessonTitle}</h1>
        <p className="lesson-subtitle">{content.content.introduction.welcomeMessage}</p>
      </header>

      {/* Introduction Story */}
      <section className="lesson-introduction">
        <h2>{content.content.introduction.story.title}</h2>
        <div className="story-content">
          {content.content.introduction.story.images.map((img: any) => (
            <img key={img.id} src={img.path} alt={img.alt} />
          ))}
          <p>{content.content.introduction.story.content}</p>
        </div>
      </section>

      {/* Main Concepts */}
      <section className="lesson-concepts">
        {content.content.mainConcept.sections.map((section: any) => (
          <div key={section.id} className="concept-section">
            <h3>{section.title}</h3>
            <p>{section.simpleExplanation}</p>
            
            {/* Real-life example */}
            <div className="real-life-example">
              <h4>Real Life:</h4>
              <p>{section.realLifeExample.scenario}</p>
            </div>

            {/* Visual aid */}
            {section.visualAid && (
              <img 
                src={section.visualAid.path} 
                alt={section.visualAid.description}
              />
            )}
          </div>
        ))}
      </section>

      {/* Interactive Games */}
      <section className="lesson-games">
        <h2>Let's Play!</h2>
        {content.content.games.map((game: any) => (
          <GameComponent key={game.gameId} game={game} />
        ))}
      </section>

      {/* Activities */}
      <section className="lesson-activities">
        <h2>Activities</h2>
        {content.content.activities.map((activity: any) => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))}
      </section>

      {/* Summary */}
      <section className="lesson-summary">
        <h2>What We Learned</h2>
        <ul>
          {content.content.lessonSummary.keyTakeaways.map((point: string, index: number) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        
        <div className="aura-closing">
          <p>{content.content.lessonSummary.auraClosing.congratulations}</p>
          <div className="achievement">
            {content.content.lessonSummary.auraClosing.achievement}
          </div>
        </div>
      </section>
    </div>
  );
};

// Game Component (simplified)
const GameComponent: React.FC<{ game: any }> = ({ game }) => {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>{game.instruction}</p>
      {/* Game logic based on game.gameType */}
      {game.gameType === 'drag_drop_sort' && <DragDropGame game={game} />}
      {game.gameType === 'tap_to_find' && <TapToFindGame game={game} />}
      {game.gameType === 'match_pairs' && <MatchPairsGame game={game} />}
    </div>
  );
};

// Activity Card
const ActivityCard: React.FC<{ activity: any }> = ({ activity }) => {
  return (
    <div className="activity-card">
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      <div className="materials">
        <h4>You'll need:</h4>
        <ul>
          {activity.materials.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="steps">
        <h4>Steps:</h4>
        <ol>
          {activity.steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Placeholder game components
const DragDropGame: React.FC<{ game: any }> = ({ game }) => <div>Drag Drop Game</div>;
const TapToFindGame: React.FC<{ game: any }> = ({ game }) => <div>Tap to Find Game</div>;
const MatchPairsGame: React.FC<{ game: any }> = ({ game }) => <div>Match Pairs Game</div>;
