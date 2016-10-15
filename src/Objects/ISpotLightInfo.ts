import ILightInfo from "./ILightInfo";

interface ISpotLightInfo extends ILightInfo {
  positions: number[];
  directions: number[];
  colors: number[];
  /**
   * (InnerCone,OuterCone,Decay)
   * @type {number[]}
   */
  params: number[];
}

export default ISpotLightInfo;
