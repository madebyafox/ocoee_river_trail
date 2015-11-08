using UnityEngine;
using System.Collections;

public class TransitionOpenComplete : MonoBehaviour {
	
	public GameObject button;
	
	void OnTransitionComplete () {
	
		// show start button
		if(button) button.SetActive(true);
	//	Application.LoadLevel("1Map");

	}
}
