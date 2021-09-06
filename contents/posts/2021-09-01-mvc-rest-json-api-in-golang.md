---
title: Go言語でMVCのRESTful APIサーバーを作る
published_at: '2021-09-01T07:24:00+09:00'
---
最近Go言語の勉強で僕のプロフィールデータを管理するAPIをMVCのRESTful APIサーバーを実装したので紹介します。サーバーは、[Vercel](https://vercel.com/)の[Serverless functions](https://vercel.com/docs/serverless-functions/introduction)を使ってます。

# ファイル構造

MVCに対応するGoスクリプトは、M=`models`,V=`views`,C=`controllers`ディレクトリに配置しています。完全なソースは、[sainu/profile-api](https://github.com/sainu/profile-api)にあります。

```
.
├── api/
│   └── index.go
├── controllers/
│   ├── experiences_controller.go
│   ├── profiles_controller.go
│   ├── skills_controller.go
│   ├── social_links_controller.go
│   └── web_links_controller.go
├── go.mod
├── go.sum
├── models/
│   ├── experience.go
│   ├── profile.go
│   ├── project.go
│   ├── skill.go
│   ├── social_link.go
│   ├── technology.go
│   └── web_link.go
├── server/
│   ├── auth.go
│   └── router.go
├── vercel.json
└── views/
    ├── experiences_view.go
    ├── profiles_view.go
    ├── projects_view.go
    ├── skills_view.go
    ├── social_links_view.go
    ├── technologies_view.go
    └── web_links_view.go
```

# サンプル

## モデル

`models/profile.go`に`models`パッケージに`Profile`構造体を定義します。

```go
package models

import "fmt"

// Profile is struct of profile
type Profile struct {
	FamilyNameKanji string `json:"family_name_kanji"`
	GivenNameKanji  string `json:"given_name_kanji"`
	FamilyNameKana  string `json:"family_name_kana"`
	GivenNameKana   string `json:"given_name_kana"`
	FamilyNameEn    string `json:"family_name_en"`
	GivenNameEn     string `json:"given_name_en"`
	Nickname        string `json:"nickname"`
	Job             string `json:"job"`
	Email           string `json:"email"`
	Bio             string `json:"bio"`
	Location        string `json:"location"`
}

// GetProfile returns a profile
func GetProfile() *Profile {
	return &Profile{
		FamilyNameKanji: "道祖",
		GivenNameKanji:  "克理",
		...(略)...
		Location:        "Tokyo",
	}
}

// FullNameKanji is full name in Japanese
func (p *Profile) FullNameKanji() string {
	return fmt.Sprintf("%s %s", p.FamilyNameKanji, p.GivenNameKanji)
}

// FullNameKana is kana in Japanese
func (p *Profile) FullNameKana() string {
	return fmt.Sprintf("%s %s", p.FamilyNameKana, p.GivenNameKana)
}

// FullNameEn is full name in English
func (p *Profile) FullNameEn() string {
	return fmt.Sprintf("%s %s", p.GivenNameEn, p.FamilyNameEn)
}
```

## ビュー

`views/profiles_view.go`に`views`パッケージに`ProfileView`構造体を定義します。`NewProfileView`関数は、コントローラーで呼び出され、モデルの`models.Profile`を受けてJSONを生成するために`views.ProfileView`構造体のインスタンスを初期化して返します。

```go
package views

import "github.com/sainu/profile-api/models"

// ProfileView is struct of profile view
type ProfileView struct {
	FamilyNameKanji string `json:"family_name_kanji"`
	GivenNameKanji  string `json:"given_name_kanji"`
	FamilyNameKana  string `json:"family_name_kana"`
	GivenNameKana   string `json:"given_name_kana"`
	FamilyNameEn    string `json:"family_name_en"`
	GivenNameEn     string `json:"given_name_en"`
	FullNameKanji   string `json:"full_name_kanji"`
	FullNameKana    string `json:"full_name_kana"`
	FullNameEn      string `json:"full_name_en"`
	Nickname        string `json:"nickname"`
	Job             string `json:"job"`
	Email           string `json:"email"`
	Bio             string `json:"bio"`
	Location        string `json:"location"`
}

// NewProfileView is constructor for view of profile
func NewProfileView(profile *models.Profile) *ProfileView {
	view := &ProfileView{
		FamilyNameKanji: profile.FamilyNameKana,
		GivenNameKanji:  profile.GivenNameKanji,
		FamilyNameKana:  profile.FamilyNameKana,
		GivenNameKana:   profile.GivenNameKana,
		FamilyNameEn:    profile.FamilyNameEn,
		GivenNameEn:     profile.GivenNameEn,
		FullNameKanji:   profile.FullNameKanji(),
		FullNameKana:    profile.FullNameKana(),
		FullNameEn:      profile.FullNameEn(),
		Nickname:        profile.Nickname,
		Job:             profile.Job,
		Email:           profile.Email,
		Bio:             profile.Bio,
		Location:        profile.Location,
	}
	return view
}
```

## コントローラー

`controllers/profiles_controller.go`に`controllers.ProfilesController`構造体を定義します。また、ルーティングから呼び出されるアクション関数`Show`を`controllers.ProfilesController`構造体をレシーバーとして定義します。

```go
package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sainu/profile-api/models"
	"github.com/sainu/profile-api/views"
)

// ProfilesController controller for profile
type ProfilesController struct{}

// NewProfilesController is constructor for ProfileController
func NewProfilesController() *ProfilesController {
	return new(ProfilesController)
}

// Show binds to /profile
func (c *ProfilesController) Show(ctx echo.Context) error {
	profile := models.GetProfile()
	view := views.NewProfileView(profile)
	return ctx.JSON(http.StatusOK, view)
}
```

## ルーティング

ルーティングは、Go言語のWebサーバーフレームワークで有名な[`echo`](https://github.com/labstack/echo)を使いました。[Vercel](https://vercel.com/)の[Serverless functions](https://vercel.com/docs/serverless-functions/introduction)は、`api`ディレクトリに任意のgoファイルを作成し、専用のハンドラ関数を定義すると、Vercelの方でよしなにルーティングしてくれます。ただ、別ファイルであっても同一パッケージ内に同名のハンドラ関数を定義することはできなかったので、`api/*`へのリクエストを全て`/api`にリダイレクトする設定を`vercel.json`にし、`api/index.go`のハンドラで自前でルーティングすることにしました。

`server/router.go`にルーティングを呼び出す`NewRouter`関数を定義します。これは、Vercelのリクエストを受ける`api/index.go`のハンドラ関数内から呼び出されます。

```go
package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sainu/profile-api/controllers"
)

// NewRouter is constructor for router
func NewRouter() (*echo.Echo, error) {
	router := echo.New()
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())
	router.Use(middleware.BasicAuth(BasicAuthHandler))

	experiencesController := controllers.NewExperiencesController()
	router.GET("/api/experiences", experiencesController.Index)

	profilesController := controllers.NewProfilesController()
	router.GET("/api/profile", profilesController.Show)

	skillsController := controllers.NewSkillsController()
	router.GET("/api/skills", skillsController.Index)

	socialLinksController := controllers.NewSocialLinksController()
	router.GET("/api/social_links", socialLinksController.Index)

	webLinksController := controllers.NewWebLinksController()
	router.GET("/api/web_links", webLinksController.Index)

	return router, nil
}
```

## vercel.json

[ルーティング](#ルーティング)に書いた通り、`vercel.json`で`/api/*`へのリクエストを全て`/api`にリライトします。

```json
{
	"cleanUrls": true,
	"trailingSlash": false,
	"headers": [
		{
			"source": "/(.*)",
			"headers": [
				{
					"key": "Content-Type",
					"value": "application/json"
				}
			]
		}
	],
	"rewrites": [
		{ "source": "/api/(.*)", "destination": "/api" }
	]
}
```

## Vercel Serverless functionsのエントリーポイント

`api`ディレクトリ配下のgoファイルに`Handler`関数を定義すると、Vercelのサーバーから呼び出されます。この関数内で、自前で作成したルーティングを`server.NewRouter()`で取得し、`Handler`関数に渡される`http.ResponseWriter`と`http.Request`をechoインスタンスの`ServerHTTP`関数に渡します。

これでVercelへのリクエストを自前でルーティングできるようになります。

```go
package handler

import (
	"net/http"

	"github.com/sainu/profile-api/server"
)

// Handler is handler function for vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	router, err := server.NewRouter()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")

	router.ServeHTTP(w, r)
}

```

# やり残したこと

1. echoで自前でルーティングしているのをVercelのServerless functionsでルーティングする方法が知りたい。
2. モデルのデータをどこかのデータストアに置きたい。
