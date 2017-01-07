import Texture2D from "grimoirejs-fundamental/ref/Resource/Texture2D";
import SceneLightManager from "./SceneLightManager";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import Framebuffer from "grimoirejs-fundamental/ref/Resource/Framebuffer";
export default class ShadowMapCameraComponent extends CameraComponent {

  public fbo:Framebuffer; // TODO remove

  public shadowMapTexture:Texture2D; // TODO remove

  public shadowMapIndex:number;

  public bufferSize:number = 512;// TODO remove

  private _gl:WebGLRenderingContext;

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
    this._gl = this.companion.get("gl");
    this.shadowMapTexture = new Texture2D(this._gl);
    this.shadowMapTexture.update(0,this.bufferSize,this.bufferSize,0,WebGLRenderingContext.RGB,WebGLRenderingContext.UNSIGNED_BYTE);
    this.fbo = new Framebuffer(this._gl);
    this.fbo.update(this.shadowMapTexture);
    sm.addShadowMapCamera(this);
  }

  public $unmount():void{
    const sm = this.containedScene.node.getComponent(SceneLightManager);
    sm.removeShadowMapCamera(this);
  }
}
