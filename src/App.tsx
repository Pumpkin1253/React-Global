import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import { HomePage } from "./feature/homepage/components";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HomePage></HomePage>
      </QueryClientProvider>
    </>
  );
}

export default App;
