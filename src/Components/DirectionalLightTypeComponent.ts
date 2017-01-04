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
    this.getAttributeRaw("color").boundTo("_color");
    this._transform = this.node.getComponent("Transform") as TransformComponent;
  }

  public $mount():void{
    super.$mount();
    this.__sceneLightManager.addLight("directional");
  }

  public $unmount():void{
    this.__sceneLightManager.removeLight("directional");
  }



  public $update(sceneDesc: LightInfoSceneDesc): void {
    const directionals = sceneDesc.lights.directional;
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
