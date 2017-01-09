import Vector2 from "grimoirejs-math/ref/Vector2";
import Texture2D from "grimoirejs-fundamental/ref/Resource/Texture2D";
import ISpotLightInfo from "./ISpotLightInfo";
import IPointLightInfo from "./IPointLightInfo";
import IDirectionalLightInfo from "./IDirectionalLightInfo";
interface LightsInfoDesc {
  directional: IDirectionalLightInfo,
  point: IPointLightInfo,
  spot: ISpotLightInfo,
  shadowMap:{
    shadowMapCountPerEdge:Vector2,
    pixelSize:number,
    count:number,
    shadowMap:Texture2D,
    lightMatrices:Texture2D;
  }
}

export default LightsInfoDesc;
