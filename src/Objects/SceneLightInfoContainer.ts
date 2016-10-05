import {Vector3, Color3} from "grimoirejs-math";
interface SceneLightInfoContainer {
  lights: {
    diretctional: {
      indicies: string[],
      directions: number[],
      colors: number[]
    },
    point: {
      [key: string]: {
        position: Vector3,
        color: Color3
      }
    },
    spot: {
      [key: string]: {
        direction: Vector3,
        color: Color3
      }
    }
  }
}

export default SceneLightInfoContainer;
