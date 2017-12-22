import SceneLightManager from "./SceneLightManager";
import MacroRegistry from "grimoirejs-fundamental/ref/Material/MacroRegistory";
import Component from "grimoirejs/ref/Core/Component";
import IAttributeDeclaration from "grimoirejs/ref/Interface/IAttributeDeclaration";
import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import MaterialContainer from "grimoirejs-fundamental/ref/Components/MaterialContainerComponent";


import Basic from "raw-loader!../Shaders/Basic.sort";


export default class ForwardShadingManagerComponent extends Component {
    public static componentName = "ForwardShadingManager";
    public static attributes: { [key: string]: IAttributeDeclaration } = {
    };

    private static _typeToMacros: { [key: string]: string } = {
        point: "POINT_LIGHT_COUNT",
        directional: "DIR_LIGHT_COUNT",
        spot: "SPOT_LIGHT_COUNT"
    };

    private _sceneLightManagers: SceneLightManager[] = [];

    private _macroRegistry: MacroRegistry;

    public $awake(): void {
        this._macroRegistry = MaterialFactory.get(this.companion.get("gl")).macro;
        this._macroRegistry.setValue("DIR_LIGHT_COUNT", "0");
        this._macroRegistry.setValue("POINT_LIGHT_COUNT", "0");
        this._macroRegistry.setValue("SPOT_LIGHT_COUNT", "0");
        this._macroRegistry.setValue("SHADOW_MAP_COUNT", "0");
        MaterialFactory.addSORTMaterial("basic-shading", Basic);
        MaterialContainer.rewriteDefaultMaterial("basic-shading");
    }

    public addSceneLightManager(s: SceneLightManager): void {
        this._sceneLightManagers.push(s);
        this.updateLightProperty();
    }

    public removeSceneLightManager(s: SceneLightManager): void {
        const o = this._sceneLightManagers.indexOf(s);
        this._sceneLightManagers.splice(o, 1);
        this.updateLightProperty();
    }

    public updateLightProperty(): void {
        let d = 0, s = 0, p = 0, sm = 0;
        for (let i = 0; i < this._sceneLightManagers.length; i++) {
            const slm = this._sceneLightManagers[i];
            d = Math.max(slm.lights.directional.length, d);
            p = Math.max(slm.lights.point.length, p);
            s = Math.max(slm.lights.spot.length, s);
            sm = Math.max(slm.shadowMapCameras.length, sm);
        }
        this._macroRegistry.setValue("DIR_LIGHT_COUNT", d + "");
        this._macroRegistry.setValue("POINT_LIGHT_COUNT", p + "");
        this._macroRegistry.setValue("SPOT_LIGHT_COUNT", s + "");
        this._macroRegistry.setValue("SHADOW_MAP_COUNT", sm + "");
    }
}
