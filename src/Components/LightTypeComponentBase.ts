import ILightInfo from "../Objects/ILightInfo";
import LightsInfoDesc from "../Objects/LightsInfoDesc";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import Component from "grimoirejs/lib/Node/Component";
export default class LightTypeComponentBase extends Component {
  protected __ensureLightTypeContainer(sceneDesc: LightInfoSceneDesc): LightInfoSceneDesc {
    if (sceneDesc.lights && sceneDesc.lights.diretctional && sceneDesc.lights.point && sceneDesc.lights.spot) {
      return sceneDesc;
    } else {
      sceneDesc.lights = this.__generateDefaultLightTypeContainer();
    };
  }

  protected __ensureIndex<T extends ILightInfo>(lightParameters: T): number {
    const index = lightParameters.indicies.indexOf(this.id);
    if (index >= 0) {
      return index;
    } else {
      lightParameters.indicies.push(this.id);
      return lightParameters.indicies.length - 1;
    }
  }

  protected __generateDefaultLightTypeContainer(): LightsInfoDesc {
    return {
      diretctional: {
        indicies: [] as string[],
        directions: [] as number[],
        colors: [] as number[]
      },
      point: {
        indicies: [] as string[],
        positions: [] as number[],
        colors: [] as number[],
        params: [] as number[]
      },
      spot: {
        indicies: [] as string[],
        positions: [] as number[],
        directions: [] as number[],
        colors: [] as number[],
        params: [] as number[]
      }
    } as LightsInfoDesc;
  }
}
