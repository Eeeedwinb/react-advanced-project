import { json } from "react-router-dom";

export const eventPageLoader = async ({ params }) => {
  const { id } = params; // Extract the event ID from the URL parameters

  try {
    const response = await fetch(`http://localhost:3000/events/${id}`);
    if (!response.ok) {
      throw new Error("Event not found");
    }
    const data = await response.json();
    return data; // Return the event data to be used by the component
  } catch (error) {
    console.error("Error loading event:", error);
    throw json({ message: "Event not found" }, { status: 404 });
  }
};
