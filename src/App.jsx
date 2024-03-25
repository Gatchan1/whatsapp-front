import { Routes, Route } from "react-router-dom";
import "./App.css";
import { StoryCreationProviderWrapper } from "./contexts/storyCreation.context.jsx";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <>
      <Navbar />
      <StoryCreationProviderWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/:username" element={<ProfilePage />} />
          {/* TODO: protect profilepage route. */}
        </Routes>
      </StoryCreationProviderWrapper>
    </>
  );
}

export default App;
