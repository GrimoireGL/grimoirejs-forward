import ILightInfo from "./ILightInfo";
import VectorArrayContainer from "../Util/VectorArrayContainer";

interface IPointLightInfo extends ILightInfo {
  colors: VectorArrayContainer;
  positions: VectorArrayContainer;
  /**
   * (Distance,Decay)
   * @type {number[]}
   */
  params: VectorArrayContainer;
}

export default IPointLightInfo;
