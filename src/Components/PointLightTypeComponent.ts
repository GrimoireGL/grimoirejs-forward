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
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttributeRaw("distance").boundTo("_distance");
    this.getAttributeRaw("decay").boundTo("_decay");
    this.getAttributeRaw("intensity").boundTo("_intensity");
  }

  public $mount():void{
    super.$mount();
    this.__sceneLightManager.addLight("point");
  }

  public $unmount():void{
    this.__sceneLightManager.removeLight("point");
  }

  public $update(sceneDesc: LightInfoSceneDesc): void {
    const points = sceneDesc.lights.point;
    const index = this.__ensureIndex(points);
    const pos = this._transform.globalPosition;
    points.positions[3 * index + 0] = pos.X;
    points.positions[3 * index + 1] = pos.Y;
    points.positions[3 * index + 2] = pos.Z;
    points.colors[3 * index + 0] = this._color.R * this._intensity;
    points.colors[3 * index + 1] = this._color.G * this._intensity;
    points.colors[3 * index + 2] = this._color.B * this._intensity;
    points.params[2 * index + 0] = this._distance;
    points.params[2 * index + 1] = this._decay;
  }
}
