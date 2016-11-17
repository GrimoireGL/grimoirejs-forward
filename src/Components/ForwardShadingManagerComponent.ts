import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";

export default class ForwardShadingManagerComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {

  };

  public $awake(): void {
    const mf = this.companion.get("MaterialFactory") as MaterialFactory;
    // TODO should be determined dynamicly.
    mf.macro.setValue("DIR_LIGHT_COUNT", "5");
    mf.macro.setValue("POINT_LIGHT_COUNT", "5");
    mf.macro.setValue("SPOT_LIGHT_COUNT", "5");
  }
}
