import { useEffect, useState } from "react";

const Event = ({ event, events, setEvents }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [eventName, setEventName] = useState(event.eventName);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [isNew, setIsNew] = useState(eventName === "");

  useEffect(() => {
    if (eventName === "") {
      setIsEditable(true);
    }
  }, []);

  const postEvent = async () => {
    const newEvent = {
      eventName,
      startDate,
      endDate,
    };
    try {
      const response = await fetch(`http://localhost:3000/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("response was not ok");
      }
      const data = await response.json();

      setEventName(data.eventName);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };
  const putEvent = async (id, updatedEvents) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvents),
      });
      if (!response.ok) {
        throw new Error("response was not ok");
      }
      const data = await response.json();

      setEventName(data.eventName);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("response was not ok");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };
  const handleAdd = () => {
    postEvent();
    setEvents(events);
    setIsEditable(false);
  };

  const handleDelete = (id) => {
    // const newEvents = events.filter((event) => event.id != id);
    deleteEvent(id);
    setEvents(events.filter((event) => event.id != id));
  };

  const handleSave = (id) => {
    // const updatedEvents = events.map((e) =>
    //   e.id === id ? { ...e, eventName, startDate, endDate } : e
    // );

    const updatedEvent = { eventName, startDate, endDate };
    putEvent(id, updatedEvent);
    // setEvents(updatedEvents);
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
