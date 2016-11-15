import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";
export default class SpotLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      defaultValue: "white"
    },
    innerCone: {
      converter: "Angle2D",
      defaultValue: "5d"
    },
    outerCone: {
      converter: "Angle2D",
      defaultValue: "20d"
    },
    decay: {
      converter: "Number",
      defaultValue: 1
    }
  };

  private _color: Color3;

  private _transform: TransformComponent;

  private _innerCone: number;

  private _outerCone: number;

  private _decay: number;

  public $awake(): void {
    this.getAttribute("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttribute("innerCone").boundTo("_innerCone");
    this.getAttribute("outerCone").boundTo("_outerCone");
    this.getAttribute("decay").boundTo("_decay");
  }


  public $update(sceneDesc: LightInfoSceneDesc): void {
    this.__ensureLightTypeContainer(sceneDesc);
    const spots = sceneDesc.lights.spot;
    const index = this.__ensureIndex(spots);
    const pos = this._transform.globalPosition;
    const dir = this._transform.up.negateThis();
    spots.positions[3 * index + 0] = pos.X;
    spots.positions[3 * index + 1] = pos.Y;
    spots.positions[3 * index + 2] = pos.Z;
    spots.colors[3 * index + 0] = this._color.R;
    spots.colors[3 * index + 1] = this._color.G;
    spots.colors[3 * index + 2] = this._color.B;
    spots.directions[3 * index + 0] = dir.X;
    spots.directions[3 * index + 1] = dir.Y;
    spots.directions[3 * index + 2] = dir.Z;
    spots.params[3 * index + 0] = this._innerCone;
    spots.params[3 * index + 1] = this._outerCone;
    spots.params[3 * index + 2] = this._decay;
  }
}
