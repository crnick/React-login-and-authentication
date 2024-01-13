import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1); // go back to where you came from
  return (
    <section>
      <h1>Unauthorized access</h1>
      <button onClick={goBack}>Go Back</button>
    </section>
  );
};

export default Unauthorized;
