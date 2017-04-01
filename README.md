# forward

[![Greenkeeper badge](https://badges.greenkeeper.io/GrimoireGL/grimoirejs-forward-shading.svg)](https://greenkeeper.io/)
> Forward lighting package for grimoire.js

Describe about this package here.
(パッケージに関する説明をここに記述する。)

# installation

```bash
  npm install grimoirejs-forward-shading --save
```

## DirectionalLightType コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
### 属性
<!-- DO NOT EDIT -->
<!-- ATTRS -->
| 属性名 | コンバーター | デフォルト値 | その他 |
|:------:|:------:|:------:|:------:|
| color | Color3 | "white" | なし |

<!-- /ATTRS -->
<!-- /DO NOT EDIT -->
### color 属性

 * `converter`: Color3
 * `defaultValue`: "white"

<!-- EDIT HERE(color)-->
<!-- /EDIT HERE-->

## ForwardShadingManager コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
属性なし
## Light コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
### 属性
<!-- DO NOT EDIT -->
<!-- ATTRS -->
| 属性名 | コンバーター | デフォルト値 | その他 |
|:------:|:------:|:------:|:------:|
| type | String | "Directional" | なし |

<!-- /ATTRS -->
<!-- /DO NOT EDIT -->
### type 属性

 * `converter`: String
 * `defaultValue`: "Directional"

<!-- EDIT HERE(type)-->
<!-- /EDIT HERE-->

## PointLightType コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
### 属性
<!-- DO NOT EDIT -->
<!-- ATTRS -->
| 属性名 | コンバーター | デフォルト値 | その他 |
|:------:|:------:|:------:|:------:|
| color | Color3 | "white" | なし |
| distance | Number | 5.0 | なし |
| decay | Number | 2.0 | なし |

<!-- /ATTRS -->
<!-- /DO NOT EDIT -->
### color 属性

 * `converter`: Color3
 * `defaultValue`: "white"

<!-- EDIT HERE(color)-->
<!-- /EDIT HERE-->
### distance 属性

 * `converter`: Number
 * `defaultValue`: 5.0

<!-- EDIT HERE(distance)-->
<!-- /EDIT HERE-->
### decay 属性

 * `converter`: Number
 * `defaultValue`: 2.0

<!-- EDIT HERE(decay)-->
<!-- /EDIT HERE-->

## RenderForward コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
属性なし
## SpotLightType コンポーネント
<!-- EDIT HERE(@Component)-->
<!-- /EDIT HERE-->
### 属性
<!-- DO NOT EDIT -->
<!-- ATTRS -->
| 属性名 | コンバーター | デフォルト値 | その他 |
|:------:|:------:|:------:|:------:|
| color | Color3 | "white" | なし |
| innerCone | Angle2D | "5d" | なし |
| outerCone | Angle2D | "20d" | なし |
| decay | Number | 1 | なし |

<!-- /ATTRS -->
<!-- /DO NOT EDIT -->
### color 属性

 * `converter`: Color3
 * `defaultValue`: "white"

<!-- EDIT HERE(color)-->
<!-- /EDIT HERE-->
### innerCone 属性

 * `converter`: Angle2D
 * `defaultValue`: "5d"

<!-- EDIT HERE(innerCone)-->
<!-- /EDIT HERE-->
### outerCone 属性

 * `converter`: Angle2D
 * `defaultValue`: "20d"

<!-- EDIT HERE(outerCone)-->
<!-- /EDIT HERE-->
### decay 属性

 * `converter`: Number
 * `defaultValue`: 1

<!-- EDIT HERE(decay)-->
<!-- /EDIT HERE-->

# LICENSE

MIT
