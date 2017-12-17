import LightTypeComponentBase from "./LightTypeComponentBase";
import Component from "grimoirejs/ref/Core/Component";
import IAttributeDeclaration from "grimoirejs/ref/Interface/IAttributeDeclaration";

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

  private _lightTypeComponent: LightTypeComponentBase;

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
    this._removeLastTypeComponent();
    this._addLightTypeComponent(type);
  }

  private _addLightTypeComponent(type: string): void {
    switch (type) {
      case "directional":
        this._lightTypeComponent = this.node.addComponent("DirectionalLightType", {}, true) as LightTypeComponentBase;
        break;
      case "point":
        this._lightTypeComponent = this.node.addComponent("PointLightType", {}, true) as LightTypeComponentBase;
        break;
      case "spot":
        this._lightTypeComponent = this.node.addComponent("SpotLightType", {}, true) as LightTypeComponentBase;
        break;
    }
  }

  private _removeLastTypeComponent(): void {
    if (this._lightTypeComponent) {
      this._lightTypeComponent.dispose();
    }
  }
}
