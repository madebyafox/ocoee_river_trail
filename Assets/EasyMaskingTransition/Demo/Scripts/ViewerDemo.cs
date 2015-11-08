using UnityEngine;
using System.Collections;

public class ViewerDemo : MonoBehaviour {
	
	public Transform transition;
	public Texture2D[] textures;
	int current = 0;
	
	void Start() {
	}
	
	void Update() {
		
		if(!textures[current]) return;
		
		// Swich Gradations Texture to other
		if (Input.GetKeyDown(KeyCode.LeftArrow)) {
			
			current = (current-- > 0) ? current : textures.Length - 1;
			transition.renderer.material.SetTexture("_MainTex", textures[current]);
		}
		
		if (Input.GetKeyDown(KeyCode.RightArrow)) {
			
			current = (++current < textures.Length) ? current : 0;
			transition.renderer.material.SetTexture("_MainTex", textures[current]);
		}
	}
	
	void OnGUI() {
		
		if(!textures[current]) return;
		
		// Swich Gradations Texture to other
		if (GUI.Button(new Rect(10, 10, 30, 20), "<")) {
			
			current = (current-- > 0) ? current : textures.Length - 1;
			transition.renderer.material.SetTexture("_MainTex", textures[current]);
		}
		
		if (GUI.Button(new Rect(50, 10, 30, 20), ">")) {
			
			current = (++current < textures.Length) ? current : 0;
			transition.renderer.material.SetTexture("_MainTex", textures[current]);
		}
		
		
		GUI.Label (new Rect (90, 10, 200, 20), (current + 1).ToString() + " - " + textures[current].name);
		
		// Swich Color
		if (GUI.Button(new Rect(10, 40, 80, 20), "black")) {
			
			transition.renderer.material.SetColor("_Color", Color.black);
		}
		
		if (GUI.Button(new Rect(100, 40, 80, 20), "white")) {
			
			transition.renderer.material.SetColor("_Color", Color.white);
		}
		
		if (GUI.Button(new Rect(190, 40, 80, 20), "red")) {
			
			transition.renderer.material.SetColor("_Color", Color.red);
		}
		
		if (GUI.Button(new Rect(280, 40, 80, 20), "green")) {
			
			transition.renderer.material.SetColor("_Color", Color.green);
		}
		
		if (GUI.Button(new Rect(370, 40, 80, 20), "blue")) {
			
			transition.renderer.material.SetColor("_Color", Color.blue);
		}
		
		if (GUI.Button(new Rect(460, 40, 80, 20), "random")) {
			
			Color random = new Color(Random.Range(0f, 1f), Random.Range(0f, 1f), Random.Range(0f, 1f), 1f);
			transition.renderer.material.SetColor("_Color", random);
		}
		
		// Rotatate Camera
		if (GUI.Button(new Rect(10, 70, 80, 20), "rotation 0")) {
			
			transition.FindChild("Camera").localEulerAngles = new Vector3(0, 0, 0);
		}
		
		if (GUI.Button(new Rect(100, 70, 80, 20), "rotation 90")) {
			
			transition.FindChild("Camera").localEulerAngles = new Vector3(0, 0, 90);
		}
		
		if (GUI.Button(new Rect(190, 70, 80, 20), "rotation 180")) {
			
			transition.FindChild("Camera").localEulerAngles = new Vector3(0, 0, 180);
		}
		
		if (GUI.Button(new Rect(280, 70, 80, 20), "rotation 270")) {
			
			transition.FindChild("Camera").localEulerAngles = new Vector3(0, 0, 270);
		}
		
	}
}
