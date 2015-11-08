using UnityEngine;
using System.Collections;

public class TransitionCloseComplete : MonoBehaviour {

	void OnTransitionStart () {
	
	}
	
	void OnTransitionComplete () {
	
		// it load myself, because it's a demonstration
		Application.LoadLevel("Demo (Change Scene)");
		//Application.LoadLevel("1Map");

	}
}
