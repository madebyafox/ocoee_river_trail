#pragma strict

private var m_me:blindGUIText;

private var m_button:blindGUIButton;
private var m_start:boolean = false;


function Start () {

	m_me = this.gameObject.GetComponent(blindGUIText);
	m_button = this.gameObject.GetComponent(blindGUIButton);
	m_button.m_buttonClickDelegate = OnButtonClick;
	m_me.m_alpha = 1.0f;


}

function Update () {

	//if (m_me && Time.time >= 3.0f && !m_start) {
	//	var targetShowStart:blindGUIAnimationState = new blindGUIAnimationState( m_me );
	//	targetShowStart.alpha = 1.0f;
	//	m_me.AnimateTo( targetShowStart, 1.0f);
	//	m_start = true;
	//}
	
	//if(Rect(15,15,200,100), "start Text"){

}

public function OnButtonClick( sender:blindGUIButton):void {	

	 
		Debug.Log("I've been clicked");
		Application.LoadLevel("1Map");
	
		
}