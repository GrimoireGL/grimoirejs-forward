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
      defaultValue: "white"
    },
    distance: {
      converter: "Number",
      defaultValue: 5.0
    },
    decay: {
      converter: "Number",
      defaultValue: 2.0
    }
  };

  private _color: Color3;


  private _transform: TransformComponent;

  private _distance: number;

  private _decay: number;

  public $awake(): void {
    this.getAttribute("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttribute("distance").boundTo("_distance");
    this.getAttribute("decay").boundTo("_decay");
  }


  public $update(sceneDesc: LightInfoSceneDesc): void {
    this.__ensureLightTypeContainer(sceneDesc);
    const points = sceneDesc.lights.point;
    const index = this.__ensureIndex(points);
    const pos = this._transform.globalPosition;
    points.positions[3 * index + 0] = pos.X;
    points.positions[3 * index + 1] = pos.Y;
    points.positions[3 * index + 2] = pos.Z;
    points.colors[3 * index + 0] = this._color.R;
    points.colors[3 * index + 1] = this._color.G;
    points.colors[3 * index + 2] = this._color.B;
    points.params[2 * index + 0] = this._distance;
    points.params[2 * index + 1] = this._decay;
  }
}
