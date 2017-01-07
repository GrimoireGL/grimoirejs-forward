import Texture2D from "grimoirejs-fundamental/ref/Resource/Texture2D";
import SceneLightManager from "./SceneLightManager";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import Framebuffer from "grimoirejs-fundamental/ref/Resource/Framebuffer";
export default class ShadowMapCameraComponent extends CameraComponent {
  
  public shadowMapIndex:number;

  public $awake():void{
    this.Near = 0.01;
    this.Far = 10.0;
    this.OrthographicMode = true;
    this.OrthoSize = 10;
    this.AutoAspect = false;
    this.Aspect = 1.0;
  }

  public $mount():void{
    super.$mount();
    const sm = this.containedScene.node.getComponent(SceneLightManager);
    sm.addShadowMapCamera(this);
  }

  public $unmount():void{
    const sm = this.containedScene.node.getComponent(SceneLightManager);
    sm.removeShadowMapCamera(this);
  }
}
