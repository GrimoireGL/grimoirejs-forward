import SceneLightManager from "./SceneLightManager";
import IRenderRendererMessage from "grimoirejs-fundamental/ref/Messages/IRenderRendererMessage";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Component from "grimoirejs/ref/Node/Component";
import RenderScene from "grimoirejs-fundamental/ref/Components/RenderSceneComponent";

export default class RenderShadowMapComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {

    };

    private _renderSceneComponent: RenderScene;

    private _gl: WebGLRenderingContext;

    public $mount(): void {
        this._renderSceneComponent = this.node.getComponent(RenderScene);
        if (!this._renderSceneComponent) {
            throw new Error(`There was no RenderScene component found on the node attached RenderShadowMapComponent`);
        }
        this._gl = this.companion.get("gl");

    }

    public $render(args: IRenderRendererMessage): void {
        const sceneCamera = this._renderSceneComponent.camera ? this._renderSceneComponent.camera : args.camera;
        const slm = sceneCamera.containedScene.node.getComponent(SceneLightManager);
        if (slm.shadowMapCameras.length === 0) {
            return;
        }
        slm.shadowMapFBO.bind();
        this._gl.clearColor(0, 0, 0, 0);
        this._gl.clearDepth(1);
        this._gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
        slm.updateLightMatricies(sceneCamera);
        slm.shadowMapCameras.forEach(v => {
            slm.viewportByShadowmapIndex(v.shadowMapIndex);
            v.updateContainedScene(args.timer);
            v.renderScene({
                camera: v,
                buffers: null,
                layer: "default",
                viewport: args.viewport,
                technique: "depth",
                renderer: this._renderSceneComponent,
                sceneDescription: {},
                timer: args.timer,
                sortingTechnique:"default"
            });
        });
        this._gl.flush();
        this._gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
    }
}
