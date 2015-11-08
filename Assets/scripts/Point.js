//------------------------------------------------------------------------------------------------
//Point.js
//ARF	4.16.14
//Prints animated text above a game object when invoked by a game object
//Currently invoked by adding a component at runtime in the boatInfo.js script
//------------------------------------------------------------------------------------------------

private var GetHitEffect : float;
private var targY : float;
private var PointPosition : Vector3;
var Point : String;


function Start() {
	PointPosition = transform.position ;//+ Vector3(Random.Range(-1,1),0,Random.Range(-1,1));
	targY = Screen.height /2;
}


function OnGUI() {
	var PointSkin : GUISkin = Resources.Load("GetPoint",GUISkin);
	var screenPos2 : Vector3 = Camera.main.camera.WorldToScreenPoint (PointPosition);
	GetHitEffect += Time.deltaTime*30;
	GUI.color = new Color (1.0f,1.0f,1.0f,1.0f - (GetHitEffect - 50) / 7);
	GUI.skin = PointSkin;
	GUI.Label (Rect (screenPos2.x+10 , targY, 120, 120),  Point.ToString());
}


function Update() {
	targY -= Time.deltaTime*200;
}