#

# 파이어베이스 초기화 및 웹앱 호스팅

## Create React App으로 프로젝트 생성

`create-react-app 앱이름`

> 여기서 Typescript 템플릿 적용은  
> `create-react-app 앱이름 --template typescript`

> 여기서 패키지매니저를 npm으로 바꾸는 것은  
> `create-react-app 앱이름 --use-npm`

프로젝트 생성 결과

```
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
└── tsconfig.json
```

> typescript 템플릿으로 생성한 프로젝트 구조

## 파이어베이스 설치

이제 프로젝트를 구성했으니 파이어베이스 프로젝트로 전환해야한다

`https://console.firebase.google.com/`  
해당 사이트로 이동한다

![](./fb-home.png)
프로젝트 추가 클릭

![](./fb-init1.png)
프로젝트 제목 정하고

![](./fb-init2.png)
현 프로젝트에는 애널리틱스를 포함하지 않기 때문에 체크 취소 후 프로젝트 생성

![](./fb-create-app.png)
프로젝트 생성 후 나오는 페이지에서 상단의 </> 버튼을 클릭

![](./fb-create1.png)
웹앱 이름을 지정한다

![](./fb-create2.png)
현재 상태에서 현 프로젝트 폴더에서 `npm install --save firebase`로 firebase 종속성을 설치한다
그리고 다음버튼을 누른다

![](./fb-create3.png)
`npm install -g firebase-tools`로 파이어베이스 툴을 설치한다

![](./fb-create4.png)
`firebase login` 입력하고 google 계정으로 로그인한다

![](./fb-cli-init.png)
`firebase init` 입력 후
해당 cli 화면에서 Firestore, Functions, Hosting, Emulators 선택을 한다

Use an Existing Project 선택 후 현 firebase 프로젝트 이름 선택 후 넘어간다

> init가 제대로 실행이 안된다면 firestore 초기화를 위해 Firebase콘솔에서  
> 왼쪽의 네비게이션 클릭후 Firestore탭에서 시작하기 버튼을 클릭
> ![](./fb-fs-create.png)  
> 현 화면에서 테스트 모드 클릭 후 다음으로 넘어가고 그 뒤 리전을 설정하고 마무리 한다

![](./fb-cli-init2.png)  
init 중 firestore rules, indexes 파일의 이름을 물어보는데 엔터를 입력해서 넘어가자 (기본값)

또한 Functions의 기본 언어를 묻는데 js, ts중 고른다
그 다음은 eslint 사용 여부에 따라 고른다

그리고 엔터 누르고 마친다

![](./fb-cli-init3.png)  
호스팅할 폴더를 선택해야한다 기본값은 public으로 되어있지만 spa웹앱을 만들것이기 때문에 build 폴더로 지정한다

![](./fb-cli-init5.png)  
그 다음 에뮬레이터 설정에서 Database 제외하고 전부 선택하고 전부 기본포트로 설정한다

이제 firebase와 프로젝트가 연동되었다

```
├── README.md
├── build
│   └── index.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── functions
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   └── index.ts
│   ├── tsconfig.dev.json
│   └── tsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
└── tsconfig.json
```

현 프로젝트를 github repo에 커밋한다

---

## 빌드 및 배포

CRA로 프로젝트가 구성이 되어있다면 `npm run build` 로 빌드한다
