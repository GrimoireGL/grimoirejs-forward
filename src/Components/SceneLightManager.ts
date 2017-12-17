import Vector2 from "grimoirejs-math/ref/Vector2";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import Framebuffer from "grimoirejs-fundamental/ref/Resource/FrameBuffer";
import Texture2D from "../../node_modules/grimoirejs-fundamental/ref/Resource/Texture2D";
import IAttributeDeclaration from "grimoirejs/ref/Interface/IAttributeDeclaration";
import ShadowMapCamera from "./ShadowMapCameraComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
import LightInfoDesc from "../Objects/LightsInfoDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import ForwardShadingManager from "./ForwardShadingManagerComponent";
import Renderbuffer from "grimoirejs-fundamental/ref/Resource/RenderBuffer";
import Component from "grimoirejs/ref/Core/Component";
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

    public lightMatrices: Float32Array;

    public shadowMapFBO: Framebuffer;

    public shadowQuality: number;

    private _shadingManager: ForwardShadingManager;

    private _lightSceneDesc: LightInfoDesc;

    private _gl: WebGLRenderingContext;

    private _maxTextureSize: number;

    private _singleShadowMapSize: number;

    private _shadowMapTexture: Texture2D;

    private _lightMatricesTexture: Texture2D;

    private _shadowMapRenderbuffer: Renderbuffer;

    private _shadowMapElementCounts: Vector2;

    public $awake(): void {
        this.getAttributeRaw("shadowQuality").watch(v => {
            this._singleShadowMapSize = Math.pow(2, v);
        }, true);
    }

    public $mount(): void {
        this._gl = this.companion.get("gl");
        this._shadowMapTexture = new Texture2D(this._gl);
        this._lightMatricesTexture = new Texture2D(this._gl);
        this._lightMatricesTexture.magFilter = WebGLRenderingContext.NEAREST;
        this._lightMatricesTexture.minFilter = WebGLRenderingContext.NEAREST;
        this._shadowMapRenderbuffer = new Renderbuffer(this._gl);
        this._maxTextureSize = this._gl.getParameter(WebGLRenderingContext.MAX_TEXTURE_SIZE);
        this._shadingManager = this.node.getComponentInAncestor(ForwardShadingManager);
        const scene = this.node.getComponent(SceneComponent);
        this._lightSceneDesc = (scene.sceneDescription as LightInfoSceneDesc).lights;
        this._shadingManager.addSceneLightManager(this);
        this._updateShadowMapSize();
        this.shadowMapFBO = new Framebuffer(this._gl);
        this.shadowMapFBO.update(this._shadowMapTexture);
        this.shadowMapFBO.update(this._shadowMapRenderbuffer);
    }

    public $unmount(): void {
        this._shadingManager.removeSceneLightManager(this);
        this.shadowMapFBO.destroy();
        this._shadowMapTexture.destroy();
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

    public viewportByShadowmapIndex(index: number): void {
        const i = index % this._shadowMapElementCounts.X;
        const j = (index - i) / this._shadowMapElementCounts.X;
        this._gl.viewport(i * this._singleShadowMapSize, j * this._singleShadowMapSize
            , this._singleShadowMapSize, this._singleShadowMapSize);
    }

    public updateLightMatricies(camera: CameraComponent): void {
        this.shadowMapCameras.forEach(v => {
            v.updateCamera(camera);
        });
        this.shadowMapCameras.forEach((v, i) => {
            const pv = v.projectionViewMatrix.rawElements;
            for (let j = 0; j < 16; j++) {
                this.lightMatrices[16 * i + j] = pv[j];
            }
        });
        this._updateLightMatricesTexture();
    }

    /**
     * Update texture size
     */
    private _updateShadowMapSize(): void {
        const max = this._maxTextureSize;
        const single = this._singleShadowMapSize; // in px
        const byEdge = max / single;
        const count = this.shadowMapCameras.length;
        let size = count === 0 ? 0 : Math.pow(2, Math.ceil(Math.log2(Math.ceil(Math.sqrt(count))))) * single;
        if (size > max) {
            throw new Error("Max shadow map buffer size overflow");
        }
        if (count === 0) {
            this._shadowMapTexture.update(0, 1, 1, 0, WebGLRenderingContext.RGB, WebGLRenderingContext.UNSIGNED_BYTE);
            this._shadowMapRenderbuffer.update(WebGLRenderingContext.DEPTH_COMPONENT16, 1, 1);
        } else {
            this._shadowMapTexture.update(0, size, size, 0, WebGLRenderingContext.RGB, WebGLRenderingContext.UNSIGNED_BYTE);
            this._shadowMapRenderbuffer.update(WebGLRenderingContext.DEPTH_COMPONENT16, size, size);
        }
        const matCount = Math.pow(2, Math.ceil(Math.log2(count)));
        this.lightMatrices = new Float32Array(matCount * 16);
        this._shadowMapElementCounts = new Vector2(size / single, size / single);
        this._updateLightMatricesTexture();
        this._lightSceneDesc.shadowMap = {
            shadowMapCountPerEdge: this._shadowMapElementCounts,
            count: matCount,
            shadowMap: this._shadowMapTexture,
            lightMatrices: this._lightMatricesTexture,
            pixelSize: 1.0 / this._singleShadowMapSize
        };
    }

    private _updateLightMatricesTexture(): void {
        const count = this.shadowMapCameras.length;
        this._lightMatricesTexture.update(0, 4, Math.pow(2, Math.ceil(Math.log2(count))), 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.FLOAT, this.lightMatrices);
    }
}
