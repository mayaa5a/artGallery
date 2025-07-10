//file that holds the art cards in a gallary 
import React, {useState, useEffect} from 'react';
import ArtCard from  './ArtCard';

const Gallery = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [banned, setBanned] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewedTitles, setViewedTitles] = useState([]);

    useEffect(() => {
        const fetchArt = async () => {
            const ApiKey = "API_KEY_HERE";
            const response = await fetch(
                `https://api.harvardartmuseums.org/object?apikey=0ca73577-4d4c-4935-b126-cb6905fc6f60&size=200&hasimage=1`
            );
            const data = await response.json();
            setArtworks(data.records);
            setLoading(false);
         };

        fetchArt();
    }, []);

        const handleBan = (attribute) => {
        if (!banned.includes(attribute)) {
            setBanned([...banned, attribute]);
        }
        showNextValidArtwork(currentIndex + 1);
};

const showNextValidArtwork = (startIndex) => {
  for (let i = startIndex; i < artworks.length; i++) {
    const art = artworks[i];
    const attributes = [
      `Title: ${art.title}`,
      `Artist: ${art.people?.[0]?.name}`,
      `Medium: ${art.medium}`,
      `Culture: ${art.culture}`,
      `Period: ${art.period}`,
    ];

    const hasBanned = attributes.some(attr => banned.includes(attr));
    if (!hasBanned) {
    setCurrentIndex(i);
    if (!viewedTitles.includes(art.title)) {
        setViewedTitles([...viewedTitles, art.title]);
    }
    return;
    }
  }

  // If no valid artwork is found
  alert("No more matching artworks!");
};
                    

    if (loading) return <p>Loading...</p>;

    return (
    <div className="veni-vici-layout">
      <div className="banned">
        <h3>Banned Attributes</h3>
        <ul>
          {banned.map((item, index) => (
            <li key={index}>🚫 {item}</li>
          ))}
        </ul>
      </div>

      <div className="gallery">
        <ArtCard art={artworks[currentIndex]} onBan={handleBan} />
          <button id="next-button" onClick={() => showNextValidArtwork(currentIndex + 1)}>
            Next Artwork 
        </button>
      </div>

      <div className="viewed">
      <h3>Viewed Artworks</h3>
      <ul>
        {viewedTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};
    export default Gallery;
    

