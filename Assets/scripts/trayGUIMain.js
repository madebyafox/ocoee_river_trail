
//todo: set the real start position of the instantiated objects



#pragma strict
class trayGUIMain extends MonoBehaviour {

private var m_layer:blindGUILayer;
private var m_startAnimation:boolean = false;

private var sim_type : String;
private var boat_type : String = "guide";

private var currentsGO : GameObject;
private var rocksGO : GameObject;
private var lineGO : GameObject;

private var running:boolean = false;




private var waterAnimation : GameObject;

public var followPrefab : GameObject;
public var clickyPrefab: GameObject;

public var followAshleyGOOD : GameObject;
public var followAshleyBAD : GameObject;
public var clickyAshleyGOOD : GameObject;
public var clickyAshleyBAD : GameObject;
public var followGUIDE : GameObject;
public var clickyGUIDE : GameObject;

function Start() {


	m_layer = this.gameObject.GetComponent(blindGUILayer);
	m_layer.m_alpha = 0.0f;
	
	
	var goodButtonGO:GameObject = GameObject.Find("good");
	var badButtonGO:GameObject = GameObject.Find("bad");
	var guideButtonGO:GameObject = GameObject.Find("guide");
	
	var currentsButtonGO:GameObject = GameObject.Find("currents");
	var rocksButtonGO:GameObject = GameObject.Find("rocks");
	var lineButtonGO:GameObject = GameObject.Find("line");
	var startButtonGO:GameObject = GameObject.Find("start");
	

	var goodButton:blindGUIButton = goodButtonGO.GetComponent(blindGUIButton);
	var badButton:blindGUIButton = badButtonGO.GetComponent(blindGUIButton);
	var guideButton:blindGUIButton = guideButtonGO.GetComponent(blindGUIButton);

	var currentsButton:blindGUIButton = currentsButtonGO.GetComponent(blindGUIButton);
	var rocksButton:blindGUIButton = rocksButtonGO.GetComponent(blindGUIButton);
	var lineButton:blindGUIButton = lineButtonGO.GetComponent(blindGUIButton);
	var startButton:blindGUIButton = startButtonGO.GetComponent(blindGUIButton);

	
	goodButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	badButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	guideButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	
	
	currentsButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	rocksButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	lineButton.m_buttonStateChangedDelegate = OnButtonStateChange;
	startButton.m_buttonClickDelegate = OnButtonClick;

	currentsGO = GameObject.Find("Currents");
	rocksGO = GameObject.Find("Rocks");		
	lineGO = GameObject.Find("Line");	
	waterAnimation = GameObject.Find("waterAnimation");

}


function Update () {
	
	if (m_layer && Time.time >= 1.0f && !m_startAnimation) {
		var targetShowAnimation:blindGUIAnimationState = new blindGUIAnimationState( m_layer );
		targetShowAnimation.alpha = 1.0f;
		m_layer.AnimateTo( targetShowAnimation, 1.0f);
		m_startAnimation = true;
	}
}

public function OnButtonStateChange( sender:blindGUIButton, newState : boolean):void {

	if ((sender.name == "currents") && m_layer ){
		
		//TURN THE CURRENTS ON
		if (sender.m_pushed) {currentsGO.SetActive(true);
			//Debug.Log("CURRENTS ON");
		}	
		else { //TURN THE CURRENTS OFF
		currentsGO.SetActive(false);
		//Debug.Log("CURRENTS OFF");
		}
	}
	
	else if ((sender.name == "rocks") && m_layer ){
	
		//TURN THE ROCKS ON
		if (sender.m_pushed) {
		//Debug.Log("ROCKS ON");
		rocksGO.SetActive(true);
		}
		else { //TURN THE ROCKS OFF
		//Debug.Log("ROCKS OFF");
		rocksGO.SetActive(false); 
		}
	}
	else if ((sender.name == "line") && m_layer ){
		//TURN THE PATH FOLLOW BOAT ON
		if (sender.m_pushed) {
			sim_type = "follow";
			lineGO.SetActive(true);}
		else { 
			sim_type = "click";
			lineGO.SetActive(false);}
	}
	
	else if ((sender.name == "good") && m_layer ){
		//TURN THE PATH FOLLOW BOAT ON
		if (sender.m_pushed) {boat_type = "good";}}
		
		else if ((sender.name == "bad") && m_layer ){
		//TURN THE PATH FOLLOW BOAT ON
		if (sender.m_pushed) {boat_type = "bad";}}
		
		else if ((sender.name == "guide") && m_layer ){
		//TURN THE PATH FOLLOW BOAT ON
		if (sender.m_pushed) {boat_type = "guide";}}
}

		
public function OnButtonClick( sender:blindGUIButton):void {	

Debug.Log("CLICK EVENT");
	 if ((sender.name == "start") && m_layer && !running){
		Debug.Log("time to start");
		running = true;
		var boat : GameObject;
		
		
		if (sim_type == "follow"){
			Debug.Log("Create a follow sim ");
			
			
			if(boat_type == "guide") {boat = GameObject.Instantiate(followGUIDE, Vector3(-3,-1.5,0),Quaternion.identity); }
			else if (boat_type == "good") {boat = GameObject.Instantiate(followAshleyGOOD, Vector3(-3,-1.5,0),Quaternion.identity);}
			else if (boat_type == "bad") {boat = GameObject.Instantiate(followAshleyBAD, Vector3(-3,-1.5,0),Quaternion.identity);}
			
		}
		
		else if (sim_type == "click") {Debug.Log("Create a click sim");
			
			if(boat_type == "guide") {boat = GameObject.Instantiate(clickyGUIDE, Vector3(-3,-1.5,0),Quaternion.identity); }
			else if (boat_type == "good") {boat = GameObject.Instantiate(clickyAshleyGOOD, Vector3(-3,-1.5,0),Quaternion.identity);}
			else if (boat_type == "bad") {boat = GameObject.Instantiate(clickyAshleyBAD, Vector3(-3,-1.5,0),Quaternion.identity);}
			
		}
		var lineButtonGO:GameObject = GameObject.Find("line");
		lineButtonGO.GetComponent(blindGUIButton).m_enabled = false;
		
		var currentHelpers = currentsGO.GetComponentsInChildren(Renderer);
		for ( var x : Renderer in currentHelpers){
			x.enabled = false;
			}
		
		lineGO.SetActive(false);
		
		if (currentsGO.active == true) { waterAnimation.renderer.enabled = true;}

		
		var targetShowAnimation:blindGUIAnimationState = new blindGUIAnimationState( m_layer );
		targetShowAnimation.alpha = 0.0f;
		m_layer.AnimateTo( targetShowAnimation, 1.0f);	}
		
		
		else if ((sender.name == "start") && m_layer && running){
		running = false;
		Application.LoadLevel("3rapid.grumpy");
		
		}
		
	/* ORIGINAL CODE	
		if (sim_type == "follow"){
			Debug.Log("Create a follow sim ");
			boat = GameObject.Instantiate(followPrefab, Vector3(0,0,0),Quaternion.identity);
		}
		
		else if (sim_type == "click") {Debug.Log("Create a click sim");
			boat = GameObject.Instantiate(clickyPrefab, Vector3(0,0,0),Quaternion.identity);
		}
		var lineButtonGO:GameObject = GameObject.Find("line");
		lineButtonGO.GetComponent(blindGUIButton).m_enabled = false;
		
		var currentHelpers = currentsGO.GetComponentsInChildren(Renderer);
		for ( var x : Renderer in currentHelpers){
			x.enabled = false;
			}
		
		lineGO.SetActive(false);
		
		if (currentsGO.active == true) { waterAnimation.renderer.enabled = true;}

		
		var targetShowAnimation:blindGUIAnimationState = new blindGUIAnimationState( m_layer );
		targetShowAnimation.alpha = 0.0f;
		m_layer.AnimateTo( targetShowAnimation, 1.0f);	}
	*/	
		
		
		
}
}//end class		



