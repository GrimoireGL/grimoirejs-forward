import ShadowMapCameraComponent from "./ShadowMapCameraComponent";
export default class SpotLightShadowMapCameraComponent extends ShadowMapCameraComponent{

  public $awake():void{
    super.$awake();
    this.OrthographicMode = false;
  }
}
