import ShadowMapCameraComponent from "./ShadowMapCameraComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import ISceneUpdateArgument from "grimoirejs-fundamental/ref/SceneRenderer/ISceneUpdateArgument";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";
export default class DirectionalLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      default: "white"
    },
    intensity:{
      converter:"Number",
      default:1
    },
    shadow:{
      converter:"Boolean",
      default:false
    }
  };

  private _color: Color3;

  private _intensity:number;

  private _transform: TransformComponent;

  private _shadowCamera:ShadowMapCameraComponent;

  public $awake(): void {
    this.lightType = "directional";
    this.getAttributeRaw("color").boundTo("_color");
    this.getAttributeRaw("intensity").boundTo("_intensity");
    this.getAttributeRaw("shadow").watch(v=>this._useShadowChanged(v),true);
    this._transform = this.node.getComponent("Transform") as TransformComponent;
  }

  public $update(args: ISceneUpdateArgument): void {
    const sceneDesc = args.sceneDescription as LightInfoSceneDesc;
    const directionals = sceneDesc.lights.directional;
    const index = this.__ensureIndex(directionals);
    const d = this._transform.forward;
    const p = this._transform.globalPosition;
    directionals.directions.set(index,d.X,d.Y,d.Z);
    const c = this._color;
    directionals.colors.set(index,c.R * this._intensity ,c.G * this._intensity,c.B * this._intensity);
    directionals.params.set(index,this._shadowCamera ? this._shadowCamera.shadowMapIndex : -1,p.X,p.Y,p.Z);
  }

  private _useShadowChanged(v:boolean):void{
    if(!v && this._shadowCamera){
      this._shadowCamera.dispose();
      this._shadowCamera = null;
    }else if(v){
      this._shadowCamera = this.node.addComponent("ShadowMapCamera") as any as ShadowMapCameraComponent;
    }
  }
}
