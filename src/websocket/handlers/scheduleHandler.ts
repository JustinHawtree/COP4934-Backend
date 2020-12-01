import Flight, { validFlightUpdateProps } from "../../models/flightInterface";
import * as flightService from "../../services/flightService";
import * as flightCrewService from "../../services/flightCrewService";

const scheduleHandler = async (action: string, payload: { [key: string]: any }, callback: (error: any, response: any) => any) => {
  switch (action) {

    case "add_many":
      console.log("Websocket Flight Add case!");
      
      await payload.flights.forEach( async (flight: any) => {
        try {
          let formattedflight: Flight = {
            flight_uuid: "",
            aircraft_uuid: flight.aircraft_uuid,
            location_uuid: flight.location_uuid,
            start_time: flight.start_time,
            end_time: flight.end_time,
            color: flight.color,
            title: flight.title,
            description: flight.description,
            allDay: Boolean(flight.allDay)
          };

          let newFlight = await flightService.createFlight(flight);

          if (flight.crew_members && flight.crew_members.length > 0) {
            let crewResult = await flightCrewService.createFlightCrewsByFlight(newFlight.newFlightUUID, payload.crew_members);
            if (crewResult.error) {
              console.error("Create Flight Crew Members Error:", crewResult.error);
              callback(crewResult.error, { success: false });
            }
          }
          //let returnFlight: any = { ...flight, flight_uuid: newFlight.newFlightUUID, crew_members: payload.crew_members };
          let start = payload.start_time;
          let end = payload.end_time;
          delete flight["start_time"];
          delete flight["end_time"];
          flight["flight_uuid"] = newFlight.newFlightUUID
          flight["start"] = start;
          flight["end"] = end;

        } catch (error) {
          console.error("Websocket Flight add error:", error);
          callback("Websocket Flight add error: " + error, null);
        }
        console.log("Offically Done one of the flight database Stuff");
      });
      console.log("Going to send to front end");
      callback(false, payload);
      break;

    default:
      callback("Websocket Flight: No valid action provided", null);
      break;
  }
}

export default scheduleHandler;
