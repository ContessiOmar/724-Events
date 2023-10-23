import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [currentIndex, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date)
  );

  const nextCard = () => {
    // Mise a jour de l'index
    setIndex(currentIndex + 1 === byDateDesc?.length ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    // Nouvelle function pour l'interval
    const intervalId = setInterval(nextCard, 5000);
    return () => {
      clearInterval(intervalId);
    }
  }, [currentIndex]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

// On ajoute un champ 'id' à chaque événement en fonction de sa position dans l'array 'byDateDesc'
  const evtId = byDateDesc?.map((event, index) => ({
    ...event,
    id: index,
  }));

  return (
    <div className="SlideCardList">

      <div className="SlideCardList__container">
        {byDateDesc?.map((event, index) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${index === currentIndex ? 'display' : 'hide'}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {evtId?.map((_, radioIdx) => (
            <input
              key={`${radioIdx + 1}`}
              type="radio"
              name="radio-button"
              checked={radioIdx === currentIndex}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>

    </div >
  );
};

export default Slider;