#pragma strict

private var m_layer:blindGUILayer;
private var m_startAnimation:boolean = false;
var animframes : int = 0;


function Start () {

	m_layer = this.gameObject.GetComponent(blindGUILayer);
	m_layer.m_alpha = 0.0f;


}

function Update () {

	if (m_layer && Time.time >= animframes && !m_startAnimation) {
		var targetShowAnimation:blindGUIAnimationState = new blindGUIAnimationState( m_layer );
		targetShowAnimation.alpha = 1.0f;
		m_layer.AnimateTo( targetShowAnimation, 1.0f);
		m_startAnimation = true;
	}



}