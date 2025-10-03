import { useEffect } from "react";
import { useGlobalState } from "./libs/state/globalState";
import "./App.css";
import HomePage from "./pages/home";
import HomeLayout from "./components/Layout/homeLayout";

function App() {
  const { theme } = useGlobalState();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {/* No Pages, hence no navigation setup */}
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    </>
  );
}

export default App;
