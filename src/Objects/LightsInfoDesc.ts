import Texture2D from "grimoirejs-fundamental/ref/Resource/Texture2D";
import ISpotLightInfo from "./ISpotLightInfo";
import IPointLightInfo from "./IPointLightInfo";
import IDirectionalLightInfo from "./IDirectionalLightInfo";
interface LightsInfoDesc {
  directional: IDirectionalLightInfo,
  point: IPointLightInfo,
  spot: ISpotLightInfo,
  shadowMap:{
    size:number,
    xCount:number,
    shadowMap:Texture2D;
  }
}

export default LightsInfoDesc;
