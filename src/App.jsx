import { useState, useEffect } from "react";
import "./App.css";
import editIcon from "./icons/editIcon";
import deleteIcon from "./icons/deleteIcon";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState([
    {
      eventName: "Music Festival",
      startDate: "2023-01-20",
      endDate: "2023-01-21",
      id: 1,
    },
    {
      eventName: "Food Festival",
      startDate: "2023-02-01",
      endDate: "2023-02-02",
      id: 2,
    },
  ]);
  // GET method

  const getEvent = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <EventList eventList={events} setEvents={setEvents} />
    </>
  );
}

export default App;
