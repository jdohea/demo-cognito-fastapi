import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";

function MyToken() {
  const { accessToken } = useContext(AuthContext);

  return (
    <div>
      <h1>Token</h1>
      {accessToken ? (
        <textarea readOnly value={accessToken} rows={3} cols={50} />
      ) : (
        <p>No token available. Please sign in.</p>
      )}
    </div>
  );
}

export default MyToken;
