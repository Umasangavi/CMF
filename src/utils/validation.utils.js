import * as yup from "yup";

export const new_event = yup.object().shape({
  ticket_booking_place: yup
    .string()
    .required("Ticket booking place is required"),
  ticket_booking_link_1: yup
    .string()
    .required("Ticket booking link is required"),
  poster_image: yup.string().required("Poster image is required"),
  venue: yup.string().required("Venue is required"),
  toDate: yup.string().required("To date is required"),
  from_date: yup.string().required("From date is required"),
  closeDate: yup.string().required("Close date is required"),
  location: yup.string().required("Location is required"),
  highlight: yup.string().required("Highlight is required"),
  event_details: yup.string().required("Event details is required"),
  event_category: yup.number().required("Event category is required"),
  name: yup.string().required("Full name is required"),
});
