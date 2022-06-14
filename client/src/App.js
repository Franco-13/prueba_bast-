import { useSelector } from "react-redux";
import "./App.css";
import AnimalRegistry from "./pages/AnimalRegistry";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <h1 style={{ color: "yellow" }}>LOADING...</h1>
    </div>
  );
};

function App() {
  const loading = useSelector((state) => state.animals.loading);
  return (
    <>
      {loading && <Loading />}
      <div className="App-header">
        <AnimalRegistry />
      </div>
    </>
  );
}

export default App;
