import ISpotLightInfo from "./ISpotLightInfo";
import IPointLightInfo from "./IPointLightInfo";
import IDirectionalLightInfo from "./IDirectionalLightInfo";
interface LightsInfoDesc {
    directional: IDirectionalLightInfo;
    point: IPointLightInfo;
    spot: ISpotLightInfo;
}
export default LightsInfoDesc;
