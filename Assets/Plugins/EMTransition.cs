using UnityEngine;
using System.Collections;

public class EMTransition : MonoBehaviour {
	
	public bool playOnAwake = true;
	public bool pingPong = false;
	public AnimationCurve curve;
	public float duration = 1f;
	
	void Start() {
		
		Resize();
		if(playOnAwake) Play();
	}
	
	public void Play() {
		
		if(curve.Evaluate(0) > 0.5f) renderer.material.SetFloat("_Cutoff", 1f);
		else renderer.material.SetFloat("_Cutoff", 0);
		
		StartCoroutine(Tweening());
		
		if(!pingPong) SendMessage("OnTransitionStart", SendMessageOptions.DontRequireReceiver);
	}
	
	IEnumerator Tweening() {
		
		float t = Time.time;
		
		while(Time.time - t < duration)
		{
			yield return 0;
			float val = curve.Evaluate((Time.time - t) / duration);
			renderer.material.SetFloat("_Cutoff",val);
		}
		
		if(pingPong) {
			
			curve = FlipCurve();
			Play();
			
		} else {
			
			SendMessage("OnTransitionComplete", SendMessageOptions.DontRequireReceiver);
			
		}
	}
	
	public void SetFlipCurve () {
		
		curve = FlipCurve();
	}
	
	private AnimationCurve FlipCurve () {
		
		AnimationCurve newCurve = new AnimationCurve();
		
		for (int i = 0; i < curve.length; i++) {
		
			Keyframe key = curve[i];
			key.time = 1f - key.time;
			key.inTangent = key.inTangent * -1;
			key.outTangent = key.outTangent * -1;
			newCurve.AddKey(key);
		}
		
		return newCurve;
	}
	
	public void Resize () {
	
		Camera camera = transform.Find("Camera").camera;
		float ratio = Mathf.Max(camera.pixelWidth / camera.pixelHeight, 1);
		transform.localScale = new Vector3(ratio, ratio, ratio);
	}
	
}
