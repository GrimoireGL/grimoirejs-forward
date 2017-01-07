import Texture2D from "../../node_modules/grimoirejs-fundamental/ref/Resource/Texture2D";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import ShadowMapCamera from "./ShadowMapCameraComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
import LightInfoDesc from "../Objects/LightsInfoDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import ForwardShadingManager from "./ForwardShadingManagerComponent";
import Component from "grimoirejs/ref/Node/Component";
export default class SceneLightManager extends Component {

    public static attributes: { [key: string]: IAttributeDeclaration } = {
        shadowQuality: {
            converter: "Number",
            default: 9
        }
    };

    public lights: {
        point: LightTypeComponentBase[],
        directional: LightTypeComponentBase[],
        spot: LightTypeComponentBase[]
    } = {
        point: [],
        directional: [],
        spot: []
    };

    public shadowMapCameras: ShadowMapCamera[] = [];

    public shadowQuality: number;

    private _shadingManager: ForwardShadingManager;

    private _lightSceneDesc: LightInfoDesc;

    private _gl: WebGLRenderingContext;

    private _maxTextureSize: number;

    private _singleShadowMapSize: number;

    private _shadowMapTexture: Texture2D;

    public $awake(): void {
        this.getAttributeRaw("shadowQuality").watch(v => {
            this._singleShadowMapSize = Math.pow(2, v);
        },true);
    }

    public $mount(): void {
        this._gl = this.companion.get("gl");
        this._shadowMapTexture = new Texture2D(this._gl);
        this._maxTextureSize = this._gl.getParameter(WebGLRenderingContext.MAX_TEXTURE_SIZE);
        this._shadingManager = this.node.getComponentInAncesotor(ForwardShadingManager);
        const scene = this.node.getComponent(SceneComponent);
        this._lightSceneDesc = (scene.sceneDescription as LightInfoSceneDesc).lights;
        this._shadingManager.addSceneLightManager(this);
        this._updateShadowMapSize();
    }

    public $unmount(): void {
        this._shadingManager.removeSceneLightManager(this);
    }

    public addLight(light: LightTypeComponentBase): void {
        switch (light.lightType) {
            case "point":
                this.lights.point.push(light);
                this._lightSceneDesc.point.colors.incrementLength();
                this._lightSceneDesc.point.positions.incrementLength();
                this._lightSceneDesc.point.params.incrementLength();
                break;
            case "directional":
                this.lights.directional.push(light);
                this._lightSceneDesc.directional.colors.incrementLength();
                this._lightSceneDesc.directional.directions.incrementLength();
                this._lightSceneDesc.directional.params.incrementLength();
                break;
            case "spot":
                this.lights.spot.push(light);
                this._lightSceneDesc.spot.colors.incrementLength();
                this._lightSceneDesc.spot.directions.incrementLength();
                this._lightSceneDesc.spot.positions.incrementLength();
                this._lightSceneDesc.spot.params.incrementLength();
                break;
        }
        this._shadingManager.updateLightCount();
    }

    public removeLight(light: LightTypeComponentBase): void {
        switch (light.lightType) {
            case "point":
                const i1 = this.lights.point.indexOf(light);
                this.lights.point.splice(i1, 1);
                this._lightSceneDesc.point.colors.decrementLength();
                this._lightSceneDesc.point.positions.decrementLength();
                this._lightSceneDesc.point.params.decrementLength();
                break;
            case "directional":
                const i2 = this.lights.directional.indexOf(light);
                this.lights.directional.splice(i2, 1);
                this._lightSceneDesc.directional.colors.decrementLength();
                this._lightSceneDesc.directional.directions.decrementLength();
                this._lightSceneDesc.directional.params.decrementLength();
                break;
            case "spot":
                const i3 = this.lights.spot.indexOf(light);
                this.lights.spot.splice(i3, 1);
                this._lightSceneDesc.spot.colors.decrementLength();
                this._lightSceneDesc.spot.directions.decrementLength();
                this._lightSceneDesc.spot.positions.decrementLength();
                this._lightSceneDesc.spot.params.decrementLength();
                break;
        }
        this._shadingManager.updateLightCount();
    }

    public addShadowMapCamera(smCamera: ShadowMapCamera): void {
        this.shadowMapCameras.push(smCamera);
        smCamera.shadowMapIndex = this.shadowMapCameras.length - 1;
        this._updateShadowMapSize();
    }

    public removeShadowMapCamera(smCamera: ShadowMapCamera): void {
        const index = this.shadowMapCameras.indexOf(smCamera);
        this.shadowMapCameras.splice(index, 1);
        for (let i = 0; i < this.shadowMapCameras.length; i++) { // reapply shadow index
            this.shadowMapCameras[i].shadowMapIndex = i;
        }
        this._updateShadowMapSize();
    }

    /**
     * Update texture size
     */
    private _updateShadowMapSize(): void {
        const max = this._maxTextureSize;
        const single = this._singleShadowMapSize;
        const byEdge = max / single;
        const count = this.shadowMapCameras.length;
        const lxc = count % byEdge; // element count of last row
        const yc = (count - lxc) / byEdge; // row count
        if (yc * single > max) {
            throw new Error("Max shadow map buffer size overflow");
        }
        let xLength = lxc * single;
        if (yc !== 0) {
            xLength = max;
        }
        if (lxc === 0 && yc === 0) {
          this._shadowMapTexture.update(0,1,1,0,WebGLRenderingContext.RGB,WebGLRenderingContext.UNSIGNED_BYTE);
        } else {
            this._shadowMapTexture.update(0, xLength, (yc + 1) * single, 0, WebGLRenderingContext.RGB, WebGLRenderingContext.UNSIGNED_BYTE);
        }
        this._lightSceneDesc.shadowMap = {
          size:single / max,
          xCount:xLength/single,
          shadowMap:this._shadowMapTexture
        };
    }
}
