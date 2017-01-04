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
    }
  };

  private _color: Color3;

  private _transform: TransformComponent;

  private _innerCone: number;

  private _outerCone: number;

  private _decay: number;

  public $awake(): void {
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
    this.getAttributeRaw("innerCone").boundTo("_innerCone");
    this.getAttributeRaw("outerCone").boundTo("_outerCone");
    this.getAttributeRaw("decay").boundTo("_decay");
  }

  public $mount():void{
    super.$mount();
    this.__sceneLightManager.addLight("spot");
  }

  public $unmount():void{
    this.__sceneLightManager.removeLight("spot");
  }



  public $update(sceneDesc: LightInfoSceneDesc): void {
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
