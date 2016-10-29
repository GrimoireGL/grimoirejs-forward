import Component from "grimoirejs/lib/Node/Component";
import IAttributeDeclaration from "grimoirejs/lib/Node/IAttributeDeclaration";
import MaterialFactory from "grimoirejs-fundamental/lib/Material/MaterialFactory";

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
