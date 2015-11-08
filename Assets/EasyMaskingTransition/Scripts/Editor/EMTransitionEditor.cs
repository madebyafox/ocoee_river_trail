using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

[CustomEditor(typeof(EMTransition))]
public class EMTransitionEditor : Editor
{
	EMTransition _target;
	
	private SerializedProperty screenSize;
	
	void OnEnable(){
		
		_target = (EMTransition)target;
		_target.Resize();
	}
	
	public override void OnInspectorGUI(){
		
		//DrawDefaultInspector();
		
		EditorGUILayout.Space();
		
		bool playOnAwake = EditorGUILayout.Toggle("Play On Awake", _target.playOnAwake);
		if(playOnAwake != _target.playOnAwake)
		{
			Undo.RegisterUndo(_target, "Play On Awake Change");
			_target.playOnAwake = playOnAwake;
		}
		
		bool pingPong = EditorGUILayout.Toggle("Preview Mode", _target.pingPong);
		if(pingPong != _target.pingPong)
		{
			Undo.RegisterUndo(_target, "Ping Pong Change");
			_target.pingPong = pingPong;
		}
		
		EditorGUILayout.Space();
		
		_target.curve = EditorGUILayout.CurveField("Transition Curve", _target.curve);
		
		float duration = EditorGUILayout.Slider("duration", _target.duration, 0.1f, 5f);
		if(duration != _target.duration)
		{
			Undo.RegisterUndo(_target, "Duration Change");
			_target.duration = duration;
		}
		
		if(GUILayout.Button("Flip Transition Curve")) {
			
			_target.SetFlipCurve();
		}
		
		//  layout end
		
		if(GUI.changed) {
			EditorUtility.SetDirty (target);
		}
	}
}