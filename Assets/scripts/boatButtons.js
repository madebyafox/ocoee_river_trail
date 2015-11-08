#pragma strict
class boatButtons extends MonoBehaviour {

private var roll_state :boolean = false;
private var stable_state :boolean = false;
private var rolls : GameObject [];
private var stables : GameObject [];
private var rolllabels : GameObject [];
private var stablelabels : GameObject [];


/*
//private var m_layer:blindGUILayer;
//private var m_startAnimation:boolean = false;
private var sim_type : String;

private var currentsGO : GameObject;
private var rocksGO : GameObject;
private var lineGO : GameObject;
private var waterAnimation : GameObject;

public var followPrefab : GameObject;
public var clickyPrefab: GameObject;
*/

function Start () {

	rolls = GameObject.FindGameObjectsWithTag("roll"); //get all gos for the roll indicators
	stables = GameObject.FindGameObjectsWithTag("stable"); //get all gos for the roll indicators
	
	rolllabels = GameObject.FindGameObjectsWithTag("rolllabel"); //get all gos for the roll indicators
	stablelabels = GameObject.FindGameObjectsWithTag("stablelabel"); //get all gos for the roll indicators
		
	var rollButtonGO:GameObject = GameObject.Find("ROLL"); //get the rollbutton
	var stableButtonGO:GameObject = GameObject.Find("STABLE"); //get the rollbutton
	var saveButtonGO:GameObject = GameObject.Find("SAVE"); //get the rollbutton

	var rollButton:blindGUIButton = rollButtonGO.GetComponent(blindGUIButton); //get the actual button from the rollButton
	var stableButton:blindGUIButton = stableButtonGO.GetComponent(blindGUIButton); //get the actual button from the rollButton
	var saveButton:blindGUIButton = saveButtonGO.GetComponent(blindGUIButton); //get the actual button from the rollButton

	rollButton.m_buttonStateChangedDelegate = OnButtonStateChange; //delegate the button push
	stableButton.m_buttonStateChangedDelegate = OnButtonStateChange; //delegate the button push
	saveButton.m_buttonClickDelegate = OnButtonClick; //delegate the button push

	for (var item1 : GameObject in rolls)
	{
		item1.renderer.active = false;
		roll_state = false;
	}

	for (var item2 : GameObject in stables)
	{
		item2.renderer.active = false;
		stable_state = false;
	}

	for (var item3 : GameObject in rolllabels)
	{
		item3.GetComponent(blindGUIText).m_alpha = 0.0f;
	}

	for (var item4 : GameObject in stablelabels)
	{
		item4.GetComponent(blindGUIText).m_alpha = 0.0f;
	}

/*
	//m_layer = this.gameObject.GetComponent(blindGUILayer);
	//m_layer.m_alpha = 0.0f;
	
	var currentsButtonGO:GameObject = GameObject.Find("currents");
	var currentsButton:blindGUIButton = currentsButtonGO.GetComponent(blindGUIButton);
	currentsButton.m_buttonStateChangedDelegate = OnButtonStateChange;

*/
}



function Update () {
/*	
	if (m_layer && Time.time >= 1.0f && !m_startAnimation) {
		var targetShowAnimation:blindGUIAnimationState = new blindGUIAnimationState( m_layer );
		targetShowAnimation.alpha = 1.0f;
		m_layer.AnimateTo( targetShowAnimation, 1.0f);
		m_startAnimation = true;
	}
*/
}

public function OnButtonStateChange( sender:blindGUIButton, newState : boolean):void {

	if (sender.name == "ROLL"){
		
		if (sender.m_pushed) 
		{
			for (var item1 : GameObject in rolls)
			{
				item1.renderer.active = true;
				roll_state = true;
			}
			
			for (var item3 : GameObject in rolllabels)
			{
				item3.GetComponent(blindGUIText).m_alpha = 1.0f;
			}
		}	
		
		else { 
			for (var item1 : GameObject in rolls)
			{
				item1.renderer.active = false;
				roll_state = false;
			}
			for (var item3 : GameObject in rolllabels)
			{
				item3.GetComponent(blindGUIText).m_alpha = 0.0f;
			}
		}
	}	
	
	
	if (sender.name == "STABLE"){
		
		if (sender.m_pushed) 
		{
			for (var item1 : GameObject in stables)
			{
				item1.renderer.active = true;
				roll_state = true;
			}
			for (var item4 : GameObject in stablelabels)
			{
				item4.GetComponent(blindGUIText).m_alpha = 1.0f;
			}
		}	
		
		else { 
			for (var item1 : GameObject in stables)
			{
				item1.renderer.active = false;
				roll_state = false;
			}
			for (var item4 : GameObject in stablelabels)
			{
				item4.GetComponent(blindGUIText).m_alpha = 0.0f;
			}
		}
	}	
	
	
}

		
public function OnButtonClick( sender:blindGUIButton):void {	

	 if (sender.name == "SAVE") {
		Debug.Log("I was clicked!");
		Application.LoadLevel("3rapid.grumpy");
	}
}
}


