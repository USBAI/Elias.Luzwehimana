import { Journey } from "@/components/journey";
import { StoryProvider } from "@/components/story";

export default function Home() {
  return (
    <StoryProvider>
      <main>
        <Journey />
      </main>
    </StoryProvider>
  );
}
