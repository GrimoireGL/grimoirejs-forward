import MacroRegistry from "grimoirejs-fundamental/ref/Material/MacroRegistory";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";

export default class ForwardShadingManagerComponent extends Component {
  public static attributes: { [key: string]: IAttributeDeclaration } = {

  };

  private static _typeToMacros:{[key:string]:string} = {
    point:"POINT_LIGHT_COUNT",
    directional:"DIR_LIGHT_COUNT",
    spot:"SPOT_LIGHT_COUNT"
  };

  public maxLightCount: {
      point: number,
      directional: number,
      spot: number
  } = {
      point: 0,
      directional: 0,
      spot: 0
  };



  private _macroRegistry:MacroRegistry;
  public $awake(): void {
    this._macroRegistry = (this.companion.get("MaterialFactory") as MaterialFactory).macro;
    this._macroRegistry.setValue("DIR_LIGHT_COUNT", "0");
    this._macroRegistry.setValue("POINT_LIGHT_COUNT", "0");
    this._macroRegistry.setValue("SPOT_LIGHT_COUNT", "0");
  }

  public updateLightCount(type:string,count:number):void{
    if(this.maxLightCount[type] === void 0){
      throw new Error(`Unknown light type "${type}" was specified.`);
    }
    if(count > this.maxLightCount[type]){
      this.maxLightCount[type] = count;
      this._macroRegistry.setValue(ForwardShadingManagerComponent._typeToMacros[type],""+count);
    }
  }
}
