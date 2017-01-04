import ForwardShadingManager from "./ForwardShadingManagerComponent";
import Component from "grimoirejs/ref/Node/Component";
export default class SceneLightManager extends Component {
    public lightCounts: {
        point: number,
        directional: number,
        spot: number
    } = {
        point: 0,
        directional: 0,
        spot: 0
    };

    private _shadingManager:ForwardShadingManager;

    public $mount():void{
      this._shadingManager = this.node.getComponentInAncesotor(ForwardShadingManager);
    }

    public addLight(type:string):void{
      switch(type){
        case "point":
          this.lightCounts.point ++;
          break;
        case "spot":
          this.lightCounts.spot ++;
          break;
        case "directional":
          this.lightCounts.directional ++;
          break;
        default:
          throw new Error(`Unknown light type "${type}" was specified.`);
      }
      this._shadingManager.updateLightCount(type,this.lightCounts[type]);
    }

    public removeLight(type:string):void{
      switch(type){
        case "point":
          this.lightCounts.point --;
          break;
        case "spot":
          this.lightCounts.spot --;
          break;
        case "directional":
          this.lightCounts.directional --;
          break;
        default:
          throw new Error(`Unknown light type "${type}" was specified.`);
      }
    }
}
