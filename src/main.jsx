import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { EventForm } from "./pages/EventForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { eventPageLoader } from "./components/EventPageLoader";

const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#fcf6d3",
        color: "#433580",
      },
      "input, button, select, div": {
        borderColor: "#433580",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: { base: "md", lg: "lg" },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:id",
        element: <EventPage />,
        loader: eventPageLoader,
        // action: addComment,
      },
      {
        path: "/addevent",
        element: <EventForm />,
        // loader: postListLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
