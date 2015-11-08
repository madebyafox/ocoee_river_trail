// Unlit alpha-cutout shader.
// - no lighting
// - no lightmap support
// - no per-material color

Shader "Easy Masking Transition/Image Unlit" {
Properties {
	_ImgTex ("Image (RGB)", 2D) = "white" {}
	_MainTex ("Gradation (RGB)", 2D) = "white" {}
	_Cutoff ("Alpha cutoff", Range(0,1)) = 0.5
}

SubShader {
	Tags {"Queue"="AlphaTest" "IgnoreProjector"="True" "RenderType"="TransparentCutout"}
	LOD 100
	
	Pass {
	
		Lighting Off
		Alphatest Greater [_Cutoff]
		
		SetTexture [_ImgTex] { 
		
			combine texture
		}
		
		SetTexture [_MainTex] { 
		
			constantColor (1,1,1,0)
			combine previous,constant lerp (texture) previous
		}
	}
}
}