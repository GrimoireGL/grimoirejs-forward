import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";


export default class PointLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      default: "white"
    },
    distance: {
      converter: "Number",
      default: 5.0
    },
    decay: {
      converter: "Number",
      default: 2.0
    },
    intensity:{
      converter:"Number",
      default:1
    }
  };

  private _color: Color3;

  private _transform: TransformComponent;

  private _distance: number;

  private _decay: number;

  private _intensity:number;

  public $awake(): void {
    this.lightType = "point";
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttributeRaw("distance").boundTo("_distance");
    this.getAttributeRaw("decay").boundTo("_decay");
    this.getAttributeRaw("intensity").boundTo("_intensity");
  }

  public $update(sceneDesc: LightInfoSceneDesc): void {
    const points = sceneDesc.lights.point;
    const index = this.__ensureIndex(points);
    const pos = this._transform.globalPosition;
    points.positions.set(index,pos.X,pos.Y,pos.Z);
    points.colors.set(index,this._color.R * this._intensity,this._color.G * this._intensity,this._color.B * this._intensity)
    points.params.set(index,this._distance,this._decay);
  }
}
