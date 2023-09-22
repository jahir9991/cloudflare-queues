import { consumer } from "./consumer";
import { producer } from "./producer";

export default {
	fetch: producer,
	queue: consumer
};