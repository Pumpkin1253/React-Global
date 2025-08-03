import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import {
  HomePage,
  MovieDetailsWrapper,
  SearchFormWrapper,
} from "./feature/homepage/components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { movieDetailsLoader } from "./feature/homepage/api/movieDetails";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        { index: true, element: <SearchFormWrapper /> },
        {
          path: ":movieId",
          element: <MovieDetailsWrapper />,
          loader: movieDetailsLoader,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
