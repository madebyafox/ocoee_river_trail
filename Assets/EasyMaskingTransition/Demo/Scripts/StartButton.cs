using UnityEngine;
using System.Collections;

public class StartButton : MonoBehaviour {
	
	public EMTransition transition;
	bool isButtonVisible = true;
	
	void Awake () {
		
	}
	
	void OnGUI () {
	
		if(!isButtonVisible) return;
		
		if (GUI.Button(new Rect(Screen.width / 2 - 80,Screen.height - 80, 160, 40), "Start")) {
			
			if(transition)
			{
				transition.gameObject.SetActive(true);
				isButtonVisible = false;
			}
		}
	}
}
