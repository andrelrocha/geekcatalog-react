import axios from "axios";

//const url = "https://closely-glad-whale.ngrok-free.app";
const url = "http://localhost:8080"

export const ApiManager = axios.create({
    baseURL: url,
    responseType: "json"
});

export const ApiManagerMultiPart = axios.create({
    baseURL: url,
    responseType: "blob"
});

const checkServerAvailability = async () => {
    try {
        await ApiManager.get("/infra/ping");
        console.log("Server is online.");
    } catch (error) {
        console.error("Server is not available.");
        alert("Error: Server is not available.");
    }
  }

  checkServerAvailability();