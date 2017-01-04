import SceneLightManager from "./SceneLightManager";
import ILightInfo from "../Objects/ILightInfo";
import LightsInfoDesc from "../Objects/LightsInfoDesc";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
  protected __sceneLightManager:SceneLightManager;

  public $mount():void{
    this.__sceneLightManager = this.node.getComponentInAncesotor(SceneLightManager);
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
}
