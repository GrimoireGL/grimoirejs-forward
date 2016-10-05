import SceneLightInfoContainer from "../Objects/SceneLightInfoContainer";
import Component from "grimoirejs/lib/Node/Component";
import IAttributeDeclaration from "grimoirejs/lib/Node/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/lib/Components/TransformComponent";
import {Vector3, Color3} from "grimoirejs-math";

export default class DirectionalLightTypeComponent extends Component {
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

  public $update(sceneDesc: SceneLightInfoContainer): void {
    if (!sceneDesc.lights) {
      sceneDesc.lights = {
        diretctional: {
          indicies: [],
          directions: [],
          colors: []
        },
        point: {},
        spot: {}
      };
    }
    const directional = sceneDesc.lights.diretctional;
    let index = directional.indicies.indexOf(this.id);
    if (index === -1) {
      directional.indicies.push(this.id);
      index = directional.indicies.length - 1;
    }
    const d = this._transform.forward;
    directional.directions[index * 3 + 0] = d.X;
    directional.directions[index * 3 + 1] = d.Y;
    directional.directions[index * 3 + 2] = d.Z;
    const c = this._color;
    directional.colors[index * 3 + 0] = c.R;
    directional.colors[index * 3 + 1] = c.G;
    directional.colors[index * 3 + 2] = c.B;
  }
}
