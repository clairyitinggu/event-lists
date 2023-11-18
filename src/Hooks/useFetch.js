export default function useFetch(baseUrl) {
  // GET METHOD
  function get(url) {
    return fetch(`${baseUrl}${url}`).then((response) => response.json());
  }

  // POST METHOD
  function post(url, body) {
    return fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //DELETE METHOD
  function deleteRequest(url, id) {
    return fetch(`${baseUrl}${url}${id}`, {
      method: "DELETE",
    });
  }

  //PUT METHOD
  function put(url, id, updatedEvents) {
    return fetch(`${baseUrl}${url}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvents),
    });
  }

  return { get, post, deleteRequest, put };
}
