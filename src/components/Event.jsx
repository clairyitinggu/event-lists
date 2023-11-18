import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";

const Event = ({ event, events, setEvents }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [eventName, setEventName] = useState(event.eventName);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [isNew, setIsNew] = useState(eventName === "");
  const { post, deleteRequest, put } = useFetch("http://localhost:3000/");

  useEffect(() => {
    if (eventName === "") {
      setIsEditable(true);
    }
  }, []);

  const handleAdd = () => {
    post("events", {
      eventName,
      startDate,
      endDate,
    });
    setEvents(events);
    setIsEditable(false);
  };

  const handleDelete = (id) => {
    deleteRequest("events", id);
    setEvents(events.filter((event) => event.id != id));
  };

  const handleSave = (id) => {
    const updatedEvent = { eventName, startDate, endDate };
    put("events", id, updatedEvent);

    setIsEditable(false);
  };

  const handleCancel = () => {
    if (!eventName && !startDate && !endDate) {
      setEvents(events.slice(0, -1));
    }
    setIsEditable(false);
  };

  return (
    <>
      <tr key={event.id}>
        <td>
          {isEditable ? (
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          ) : (
            eventName
          )}
        </td>

        <td>
          {isEditable ? (
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          ) : (
            startDate
          )}
        </td>
        <td>
          {isEditable ? (
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          ) : (
            endDate
          )}
        </td>
        <td>
          {isEditable ? (
            <>
              {isNew ? (
                <button onClick={() => handleAdd()}>add</button>
              ) : (
                <button onClick={() => handleSave(event.id)}>save</button>
              )}
              <button onClick={() => handleCancel()}>cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditable(true)}>edit</button>
              <button onClick={() => handleDelete(event.id)}>delete</button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default Event;
