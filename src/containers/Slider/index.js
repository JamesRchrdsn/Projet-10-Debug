import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    if (data.focus && data.focus.length > 0) {
      setTimeout(() => setIndex((index + 1) % data.focus.length), 5000);
    }
  };
  useEffect(() => {
    nextCard();
    return () => clearTimeout(nextCard);
  }, [index, data.focus]);
  if (!data.focus || data.focus.length === 0) {
    return null;
  }
  return (
    <div className="SlideCardList">
      {data.focus.map((event, idx) => (
        <React.Fragment key={`slide-${event.id}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
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
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {data.focus.map((focus, radioIdx) => (
                <input
                  key={`pagination-${focus.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
