export async function login({ email, password }) {
  return await fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function searchArtworks({ keyword, start, limit }) {
  console.log(keyword, start, limit)
  return await fetch(
    `/api/homepage/getartworks?keyword=${keyword}&start=${start}&limit=${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
