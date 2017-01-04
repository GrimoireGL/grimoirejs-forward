import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";
export default class DirectionalLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      default: "white"
    }
  };

  private _color: Color3;

  private _transform: TransformComponent;

  public $awake(): void {
    this.lightType = "directional";
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
  }

  public $update(sceneDesc: LightInfoSceneDesc): void {
    const directionals = sceneDesc.lights.directional;
    const index = this.__ensureIndex(directionals);
    const d = this._transform.forward;
    directionals.directions.set(index,d.X,d.Y,d.Z);
    const c = this._color;
    directionals.colors.set(index,c.R,c.G,c.B);
  }
}
