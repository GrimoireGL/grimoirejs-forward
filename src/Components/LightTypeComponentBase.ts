import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
import SceneLightManager from "./SceneLightManager";
import ILightInfo from "../Objects/ILightInfo";
import LightsInfoDesc from "../Objects/LightsInfoDesc";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
  public lightType:string;

  protected __sceneLightManager:SceneLightManager;

  protected __lightDesc:LightsInfoDesc;

  protected __lightIndex:number;

  public $mount():void{
    this.__sceneLightManager = this.node.getComponentInAncestor(SceneLightManager);
    const sceneDesc = this.__sceneLightManager.node.getComponent(SceneComponent).sceneDescription as LightInfoSceneDesc;
    this.__lightDesc = sceneDesc.lights;
    this.__sceneLightManager.addLight(this);
  }

  public $unmount():void{
    this.__sceneLightManager.removeLight(this);
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
