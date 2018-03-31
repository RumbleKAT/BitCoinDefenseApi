using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;
using System;

[System.Serializable]
public class User {
    public string name;
    public string password;
    public string email;
}

[System.Serializable]
public class Shop {
    public int maker_id;
    public int tower_id;
    public string title;
    public int price;
    //content needed!
}

[System.Serializable]
public class Tower{
    public string name;
    public int face;
    public int weapon;
    public int cloth;
    public int head;
    public int hm;
    public int aura;
    public int bullet;
    public int attack;
    public int ats;
    public int target;
    public int dist;
    public int grade;
}

public class httpRequest : MonoBehaviour {

    const string absolute_url = "https://bcdefence.herokuapp.com";
    private UnityWebRequest www;

    [SerializeField]
    private string response = null;

	// Use this for initialization
	void Start () {

        User a = new User();
        a.name = "myungjin";
        a.password = "00000AAAA";
        a.email = "reki318@naver.com";

        string data = JsonUtility.ToJson(a);

        ///DELETE(absolute_url+"/api/user",1);
        //GET(absolute_url+"/api/users");
    }
	
    public string getResponse(){
        return this.response;
    }

    public void initResponse(){
        this.response = null;
    }

    public void GET (string url){
        Debug.Log(url);
        www = UnityWebRequest.Get(url);
        StartCoroutine(WaitForRequest(www));
    }

    public void POST(string url, string data){

        www = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(data);

        www.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        www.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        www.SetRequestHeader("Content-Type","application/json");

        StartCoroutine(WaitForRequest(www));
    }

    public void PUT(string url, string data , int _id){

        url = url + "/" + _id.ToString();

        www = UnityWebRequest.Put(url, data);
        www.SetRequestHeader("Content-Type","application/json");

        StartCoroutine(WaitForRequest(www));
    }

    public void DELETE(string url, int _id){
        
        url = url + "/" + _id.ToString();
        www = UnityWebRequest.Delete(url);

        StartCoroutine(WaitForRequest(www));
    }


    IEnumerator WaitForRequest(UnityWebRequest www){
        yield return www.SendWebRequest();  //wait for download response
 
        if(www.isNetworkError || www.isHttpError){
            Debug.Log(www.error);
        }else{
            try{
                this.response = www.downloadHandler.text;
            }catch(Exception e){
                Debug.Log("No more data!");
            }
        }
    }

}
