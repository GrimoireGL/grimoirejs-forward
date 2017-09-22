import SpotLightShadowMapCameraComponent from "./SpotLightShadowMapCameraComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import ISceneUpdateArgument from "grimoirejs-fundamental/ref/SceneRenderer/ISceneUpdateArgument";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";
export default class SpotLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      default: "white"
    },
    innerCone: {
      converter: "Angle2D",
      default: "5d"
    },
    outerCone: {
      converter: "Angle2D",
      default: "20d"
    },
    decay: {
      converter: "Number",
      default: 1
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

  private _transform: TransformComponent;

  private _innerCone: number;

  private _outerCone: number;

  private _decay: number;

  private _intensity:number;

  private _shadowCamera:SpotLightShadowMapCameraComponent;

  public $awake(): void {
    this.lightType = "spot";
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttributeRaw("innerCone").boundTo("_innerCone");
    this.getAttributeRaw("outerCone").boundTo("_outerCone");
    this.getAttributeRaw("decay").boundTo("_decay");
    this.getAttributeRaw("intensity").boundTo("_intensity");
    this.getAttributeRaw("shadow").watch(v=>this._useShadowChanged(v),true);
  }


  public $update(args: ISceneUpdateArgument): void {
    const sceneDesc = args.sceneDescription as LightInfoSceneDesc;
    const spots = sceneDesc.lights.spot;
    const index = this.__ensureIndex(spots);
    const pos = this._transform.globalPosition;
    const dir = this._transform.up.negateThis();
    const intensity = this._intensity * Math.PI;
    spots.positions.set(index,pos.X,pos.Y,pos.Z);
    spots.colors.set(index,this._color.R * intensity,this._color.G * intensity,this._color.B * intensity);
    spots.directions.set(index,dir.X,dir.Y,dir.Z);
    spots.params.set(index,this._innerCone,this._outerCone,this._decay,this._shadowCamera? this._shadowCamera.shadowMapIndex:-1);
  }

  private _useShadowChanged(v:boolean):void{
    if(!v && this._shadowCamera){
      this._shadowCamera.dispose();
      this._shadowCamera = null;
    }else if(v){
      this._shadowCamera = this.node.addComponent("SpotLightShadowMapCamera") as any as SpotLightShadowMapCameraComponent;
    }
  }
}
