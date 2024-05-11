import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Landing,
  Newsletter,
  Error,
  Cocktail,
  HomeLayout,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as cocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <SinglePageError></SinglePageError>,
        loader: landingLoader(queryClient),
      },
      {
        path: "/cocktail/:id/",
        element: <Cocktail></Cocktail>,
        errorElement: <SinglePageError></SinglePageError>,
        loader: cocktailLoader(queryClient),
      },
      {
        path: "/newsletter",
        element: <Newsletter></Newsletter>,
        action: newsletterAction,
      },
      {
        path: "/about",
        element: <About></About>,
        errorElement: <SinglePageError></SinglePageError>,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};
export default App;
