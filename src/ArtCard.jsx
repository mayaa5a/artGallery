import React from 'react';

const ArtCard = ({ art, onBan }) => {
  const attributes = {
    Title: art.title,
    Artist: art.people?.[0]?.name,
    Medium: art.medium,
    Culture: art.culture,
    Period: art.period,
  };

  return (
    <div className="art-card">
      <img src={art.primaryimageurl} alt={art.title} width="300" />
      {Object.entries(attributes).map(([key, value]) => (
        value && (
          <div
            key={key}
            className="attribute"
            onClick={() => onBan(`${key}: ${value}`)}
          >
            <strong>{key}:</strong> {value}
          </div>
        )
      ))}
    </div>
  );
};

export default ArtCard;
