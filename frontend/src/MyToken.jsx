import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";

function MyToken() {
  const { idToken } = useContext(AuthContext); // Assuming idToken is provided by AuthContext
  const [apiResult, setApiResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (idToken) {
      // Call the API once the token is available
      fetch("https://0aq4e85ypb.execute-api.eu-west-1.amazonaws.com/demo/hello", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setApiResult(data); // Store the result in state
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [idToken]);

  return (
    <div>
      <h1>Token</h1>
      {idToken ? (
        <textarea readOnly value={idToken} rows={3} cols={50} />
      ) : (
        <p>No token available. Please sign in.</p>
      )}

      <h2>API Result</h2>
      {error && <p>Error: {error}</p>}
      {apiResult ? (
        <pre>{JSON.stringify(apiResult, null, 2)}</pre>
      ) : (
        <p>Loading API result...</p>
      )}
    </div>
  );
}

export default MyToken;
