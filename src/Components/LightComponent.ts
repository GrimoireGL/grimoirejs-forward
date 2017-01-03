import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";

export default class LightComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {
    type: {
      converter: "String",
      default: "Directional"
    }
  };

  /**
   * The type of light changed last time.
   * @type {string}
   */
  private _lastLightType: string;

  public $awake(): void {
    this.getAttributeRaw("type").watch((v) => this._onLightTypeChanged(v), true);
  }

  /**
   * Called when the light type was changed
   * @param {string} type [description]
   */
  private _onLightTypeChanged(type: string): void {
    type = type.toLowerCase();
    // check if the light type was changed actually.
    if (type === this._lastLightType) {
      return;
    } else {
      this._lastLightType = type;
    }
    this._addLightTypeComponent(type);
  }

  private _addLightTypeComponent(type: string): void {
    switch (type) {
      case "directional":
        this.node.addComponent("DirectionalLightType", {}, true);
        break;
      case "point":
        this.node.addComponent("PointLightType", {}, true);
        break;
      case "spot":
        this.node.addComponent("SpotLightType", {}, true);
        break;
    }
  }
}
