#pragma strict
class levelSelect extends MonoBehaviour {

private var roll_state :boolean = false;
private var stable_state :boolean = false;

private var rolls : GameObject [];

private var blevel1 : GameObject;
private var blevel2 : GameObject ;
private var blevel3 : GameObject ;

private var level1 : GameObject [];
private var level2 : GameObject [];
private var level3 : GameObject [];

private var level1button:blindGUIButton;
private var level2button:blindGUIButton;
private var level3button:blindGUIButton;
private var startButton:blindGUIButton;



function Start () {

	level1 = GameObject.FindGameObjectsWithTag("level1"); //get all gos for level1
	level2 = GameObject.FindGameObjectsWithTag("level2"); //get all gos for level2
	level3 = GameObject.FindGameObjectsWithTag("level3"); //get all gos for level3
	
	
	var level1GO:GameObject = GameObject.Find("Level 1"); //get the rollbutton
	var level2GO:GameObject = GameObject.Find("Level 2"); //get the rollbutton
	var level3GO:GameObject = GameObject.Find("Level 3"); //get the rollbutton
	var startBGO:GameObject = GameObject.Find("startText"); //get the rollbutton

	level1button = level1GO.GetComponent(blindGUIButton); //get the actual button 
	level2button = level2GO.GetComponent(blindGUIButton); //get the actual button 
	level3button = level3GO.GetComponent(blindGUIButton); //get the actual button 
	startButton = startBGO.GetComponent(blindGUIButton); //get the actual button 

	level1button.m_buttonStateChangedDelegate = OnButtonStateChange; //delegate the button push
	level2button.m_buttonStateChangedDelegate = OnButtonStateChange; //delegate the button push
	level3button.m_buttonStateChangedDelegate = OnButtonStateChange; //delegate the button push

	level1button.m_buttonClickDelegate = OnButtonClick;
	level2button.m_buttonClickDelegate = OnButtonClick;
	level3button.m_buttonClickDelegate = OnButtonClick;
	startButton.m_buttonClickDelegate = OnButtonClick;

	
	for (var item1 : GameObject in level1)
	{
		item1.GetComponent(blindGUIText).m_alpha = 0.0f;
	}

	for (var item2 : GameObject in level2)
	{
		item2.GetComponent(blindGUIText).m_alpha = 0.0f;
	}

	for (var item3 : GameObject in level3)
	{
		item3.GetComponent(blindGUIText).m_alpha = 0.0f;
	}
}






public function OnButtonStateChange( sender:blindGUIButton, newState : boolean):void {


	if (sender.name == "Level 1"){
		
		if (sender.m_pushed) 
		{
		for (var item1 : GameObject in level1)
	{
		item1.GetComponent(blindGUIText).m_alpha = 1.0f;
	}
		
		}	
		
		else { 
			for (var item1 : GameObject in level1)
	{
		item1.GetComponent(blindGUIText).m_alpha = 0.0f;
	}
		}
	}	
	
	if (sender.name == "Level 2"){
		
		if (sender.m_pushed) 
		{
		for (var item2 : GameObject in level2)
	{
		item2.GetComponent(blindGUIText).m_alpha = 1.0f;
	}
		
		}	
		
		else { 
			for (var item2 : GameObject in level2)
	{
		item2.GetComponent(blindGUIText).m_alpha = 0.0f;
	}
		}
	}	
	
	if (sender.name == "Level 3"){
		
		if (sender.m_pushed) 
		{
		for (var item3 : GameObject in level3)
	{
		item3.GetComponent(blindGUIText).m_alpha = 1.0f;
	}
		
		}	
		
		else { 
			for (var item3 : GameObject in level3)
	{
		item3.GetComponent(blindGUIText).m_alpha = 0.0f;
	}
		}
	}	
	
	
		
	
	
}

		
public function OnButtonClick( sender:blindGUIButton):void {	

	 if (sender.name == "Level 1") {
		Debug.Log("Level 1");
		for (var item1 : GameObject in level1)
		{
		item1.GetComponent(blindGUIText).m_alpha = 1.0f;
		}
	 }
	 if (sender.name == "Level 2") {
		Debug.Log("Level 2");
		for (var item2 : GameObject in level2)
		{
		item2.GetComponent(blindGUIText).m_alpha = 1.0f;
		}
	 }
	 if (sender.name == "Level 3") {
		Debug.Log("Level 3");
		for (var item3 : GameObject in level3)
	{
		item3.GetComponent(blindGUIText).m_alpha = 1.0f;
	}
	 }
	
	
	if (sender.name == "startText") {
	
	
	if 	(level1button.m_pushed){Application.LoadLevel("2boat.choice");}
	if 	(level2button.m_pushed){Application.LoadLevel("3rapid.grumpy");}
	if 	(level3button.m_pushed){Application.LoadLevel("3rapid.grumpy");} 		
		
		
		
		}
	}
	
	
	
}




		


