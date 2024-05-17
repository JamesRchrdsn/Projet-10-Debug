import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
  data: { events: [], focus: [] },
  error: null,
  last: null,
});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    const json = await response.json();
    return {
      events: json.events.sort((a, b) => new Date(a.date) - new Date(b.date)),
      focus: json.focus.sort((a, b) => new Date(a.date) - new Date(b.date)),
    };
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({ events: [], focus: [] });
  const [last, setLast] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await api.loadData();
        setData(loadedData);
        if (loadedData.events.length > 0) {
          setLast(loadedData.events[loadedData.events.length - 1]);
        }
      } catch (err) {
        setError(err.message || "error on calling events");
      }
    };

    getData();
  }, []);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
