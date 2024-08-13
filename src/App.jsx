import { Routes, Route } from "react-router-dom";
import "./App.css";
import { StoryCreationProviderWrapper } from "./contexts/storyCreation.context.jsx";
import { TimeScrollProviderWrapper } from "./contexts/timeScroll.context.jsx";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import StoryPage from "./pages/StoryPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <TimeScrollProviderWrapper>
        <StoryCreationProviderWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/story/:storyId" element={<StoryPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            {/* TODO: protect profilepage route. */}
          </Routes>
        </StoryCreationProviderWrapper>
      </TimeScrollProviderWrapper>
    </>
  );
}

export default App;
