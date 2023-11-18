import { useState, useEffect } from "react";
import "./App.css";
// import editIcon from "./icons/editIcon";
// import deleteIcon from "./icons/deleteIcon";
import EventList from "./components/EventList";
import useFetch from "./Hooks/useFetch";

function App() {
  const [events, setEvents] = useState([]);
  const { get } = useFetch("http://localhost:3000/");

  useEffect(() => {
    get("events")
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <EventList eventList={events} setEvents={setEvents} />
    </>
  );
}

export default App;
