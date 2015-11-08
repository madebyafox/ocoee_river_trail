// Unlit alpha-cutout shader.
// - no lighting
// - no lightmap support
// - no per-material color

Shader "Easy Masking Transition/Color Unlit" {
Properties {
    _Color("Color (RGBA)", COLOR) = (0, 0.5, 0, 1)
	_MainTex ("Gradation (RGB)", 2D) = "white" {}
	_Cutoff ("Alpha cutoff", Range(0,1)) = 0.5
}

SubShader {
	Tags {"Queue"="AlphaTest" "IgnoreProjector"="True" "RenderType"="TransparentCutout"}
	LOD 100
	
	Pass {
	
		Lighting Off
		Alphatest Greater [_Cutoff]
		
		SetTexture [_MainTex] { 
		
			constantColor [_Color]
			combine Constant
		}
		
		SetTexture [_MainTex] { 
		
			constantColor (1,1,1,0)
			combine previous,constant
		}
		
		SetTexture [_MainTex] { 
		
			constantColor [_Color]
			combine previous lerp (texture) Constant
		}
	}
}
}