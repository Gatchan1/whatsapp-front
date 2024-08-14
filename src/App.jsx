import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import StoryPage from "./pages/StoryPage.jsx";
import CreateStoryLayout from "./contexts/layouts/createStory.layout.jsx";

function App() {
  return (
    <>
      <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={< CreateStoryLayout />}>
              <Route path="/create" element={<CreatePage />} />
            </Route>
            <Route path="/story/:storyId" element={<StoryPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            {/* TODO: protect profilepage route. */}
          </Routes>
    </>
  );
}

export default App;
