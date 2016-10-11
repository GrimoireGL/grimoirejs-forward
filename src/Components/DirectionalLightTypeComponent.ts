import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/lib/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/lib/Components/TransformComponent";
import {Vector3, Color3} from "grimoirejs-math";

export default class DirectionalLightTypeComponent extends LightTypeComponentBase {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    color: {
      converter: "Color3",
      defaultValue: "white"
    }
  };

  private _color: Color3;

  private _transform: TransformComponent;

  public $awake(): void {
    this.getAttribute("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
  }

  public $update(sceneDesc: LightInfoSceneDesc): void {
    this.__ensureLightTypeContainer(sceneDesc);
    const directionals = sceneDesc.lights.diretctional;
    const index = this.__ensureIndex(directionals);
    const d = this._transform.forward;
    directionals.directions[index * 3 + 0] = d.X;
    directionals.directions[index * 3 + 1] = d.Y;
    directionals.directions[index * 3 + 2] = d.Z;
    const c = this._color;
    directionals.colors[index * 3 + 0] = c.R;
    directionals.colors[index * 3 + 1] = c.G;
    directionals.colors[index * 3 + 2] = c.B;
  }
}
