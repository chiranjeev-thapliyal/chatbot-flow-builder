import { v4 as uuidv4 } from "uuid";

const getId = () => `dndnode_${uuidv4()}`;

export { getId };
