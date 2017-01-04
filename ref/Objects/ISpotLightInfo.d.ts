import ILightInfo from "./ILightInfo";
import VectorArrayContainer from "../Util/VectorArrayContainer";
interface ISpotLightInfo extends ILightInfo {
    positions: VectorArrayContainer;
    directions: VectorArrayContainer;
    colors: VectorArrayContainer;
    /**
     * (InnerCone,OuterCone,Decay)
     * @type {VectorArrayContainer}
     */
    params: VectorArrayContainer;
}
export default ISpotLightInfo;
