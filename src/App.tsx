import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import {
  AddForm,
  DeleteForm,
  EditForm,
  HomePage,
  MovieDetailsWrapper,
  SearchFormWrapper,
} from "./feature/homepage/components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { movieLoader } from "./feature/homepage/api/movie";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/",
          element: <SearchFormWrapper />,
          children: [
            {
              path: "/new",
              element: <AddForm />,
            },
            {
              path: "/edit/:movieId",
              element: <EditForm />,
              loader: movieLoader,
            },
            {
              path: "/delete/:movieId",
              element: <DeleteForm />,
            },
          ],
        },
        {
          path: ":movieId",
          element: <MovieDetailsWrapper />,
          loader: movieLoader,
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
