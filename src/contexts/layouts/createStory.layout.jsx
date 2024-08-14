import { Outlet } from "react-router-dom";
import { StoryCreationProviderWrapper } from "../storyCreation.context";
import { TimeScrollProviderWrapper } from "../timeScroll.context";

export default function CreateStoryLayout() {
  return (
    <TimeScrollProviderWrapper>
      <StoryCreationProviderWrapper>
        <Outlet />
      </StoryCreationProviderWrapper>
    </TimeScrollProviderWrapper>
  );
}
