Matcha
=

  description
  -
  
  #### 데이팅 웹 서비스
  
  - [x] 로그인, 회원가입
  - [ ] 프로필 생성, 조회
  - [ ] 좋아요, 알람
  - [ ] 태그, 거리순, 좋아요 수, 나이 차이를 이용한 추천
  - [ ] text, 음성, 영상 채팅
  
  #### directory
  ```
.
├── back
│   ├── controllers
│   ├── docs
│   ├── lib
│   ├── routers
│   ├── socket
│   ├── sql
│   ├── ssl
│   ├── startegy
│   ├── uploads
│   └── utils
├── elasticsearch
├── front
│   ├── dist
│   ├── public
│   └── src
├── mysql
└── redis
  ```

  Info
  -

  - 환경

     * Docker를 이용한 환경 세팅

  - 개발 스택
    * FrontEnd: React
    * BackEnd: Node.js(express)
    * DataBase: mysql
    * tool: github, docker-compose

  - 구현 리스트
    ##### back:
      * querybuilder: rdbms이용을 위한 crud 쿼리 빌더
      * jwt, omniauth: passport strategy를 이용한 jwt 로그인
      * swagger: swagger-ui-express, swagger-jsdoc을 이용한 api 명세서

    ##### front:

  중간후기
  -
  
  - Eunryong: 본격적으로 백엔드를 처음으로 시작하면서 부족한 부분을 많이 알수있었습니다. 대부분 npm, docker document를 통해 기능을 구현 할 수 있었지만
            querybuilder, swagger와 같은 원하는 기능을 만들기 위해 직접 로그확인하거나 에러를 찾아가면서 만들다보니 좀 더 개발자다운 개발을 했다고 생각합니다.
  
  image
  -
  ![project (1)](https://github.com/ft-matcha/matcha/assets/86572427/f42aac1a-6faf-4c06-91df-f69a2365c063)
  ![project (3)](https://github.com/ft-matcha/matcha/assets/86572427/86a3d1f2-e17f-4c81-85a8-598b9f5bbcd2)
  ![project (2)](https://github.com/ft-matcha/matcha/assets/86572427/5899efe4-ec40-4ec7-bc62-1b4270335ee3)
  ![project](https://github.com/ft-matcha/matcha/assets/86572427/2b538a39-1114-4df3-9382-0e98611bbf4c)


  
