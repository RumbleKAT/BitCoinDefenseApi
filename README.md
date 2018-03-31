# BitcoinDefenceApi

본 문서는 BitcoinDefence 게임에 사용되는 api 문서입니다.

본 api는 heroku paas 기반 클라우드와 mLab을 통해서 MongoDB\(noSQL\)로 제작되었습니다.

## 구조

파일구조는 아래의 그림과 같이 구성되어 있습니다.

```
------------|-------- models
            |            |----- product.js
            |            |----- tower.js
            |            |----- users.js
            |
            |-------- routes
            |            |----- auth.js
            |            |----- index.js
            |            |----- shop.js
            |            |----- tower.js
            |            |----- transaction.js
            |
            |-------- app.js 
            |-------- secret.js
            |-------- utils.js
```

* model 폴더는 mongodb에서 사용할 db 스키마 정보를 저장합니다.
* routes 폴더는 서버에서 REST API의 형식으로 사용자의 데이터를 처리할 수 있도록 구성되어 있습니다. 
* app.js 서버 전체를 담당하는 main 파일입니다.
* secret.js는 JWT 모듈을 사용할때 필요한 private secret key 입니다. 
* utils.js는 response를 보낼 때 불필요한 중복을 줄이기 위한 미들웨어입니다. 

## 구성

본 api의 구성은 리소스 지향 아키텍쳐의 방식을 따릅니다.

### 회원가입

```
var absolute_url = "https://bcdefence.herokuapp.com"

get  | absolute_url + /api/users/
- 사용자 전체의 정보를 json 형태로 출력합니다. 

get  | absolute_url + /api/user?name=ex&password=ex (deprecate)
- 특정 사용자의 정보를 확인하는 api입니다.  

post | abolute_url + /api/user
<header / application/json>
{
    name : "",
    password : "",
    email : "", 
}
- 회원가입에서 사용되는 api입니다. body에 위의 형식과 같이 json 형식으로 전송합니다.

put  | absolute_url + /api/user/:_id (req.params._id)
<header / application/json>
{
    name : "",
    password : "",
    email : "", 
}
- 사용자 정보를 갱신하는 api입니다.

delete | abosolute_url + /api/user/:_id (req.parmas._id)
- 사용자의 정보를 삭제하는 api입니다.

```



