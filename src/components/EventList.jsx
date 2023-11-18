import Event from "./Event";

const EventList = ({ eventList, setEvents }) => {
  const tableHeaders = ["Event", "Start", "End", "Actions"];
  const newEvent = {
    eventName: "",
    startDate: "",
    endDate: "",
  };
  const handleAddNewEvent = () => {
    setEvents([...eventList, newEvent]);
  };
  return (
    <>
      <button onClick={() => handleAddNewEvent()}>Add New Event</button>
      <table>
        <thead>
          <tr>
            {" "}
            {tableHeaders.map((tableHeader) => (
              <th key={tableHeader}>{tableHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventList.map((event) => {
            return (
              <>
                <Event
                  key={event}
                  event={event}
                  events={eventList}
                  setEvents={setEvents}
                />
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EventList;
