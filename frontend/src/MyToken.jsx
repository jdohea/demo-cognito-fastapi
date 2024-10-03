import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";

function MyToken() {
  const { idToken } = useContext(AuthContext);

  return (
    <div>
      <h1>Token</h1>
      {idToken ? (
        <textarea readOnly value={idToken} rows={3} cols={50} />
      ) : (
        <p>No token available. Please sign in.</p>
      )}
    </div>
  );
}

export default MyToken;
