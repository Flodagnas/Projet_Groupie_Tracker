package main

import (
	"html/template"
	"net/http"
)

var t *template.Template

type Response struct {
	id           int
	image        string
	name         string
	members      []string
	creationDate int
	firstAlbum   string
	locations    string
	concertDates string
	relations    string
}

func main() {
	// getJson()
	t = template.Must(template.ParseFiles("templates/index.html"))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/home", home)
	http.Handle("/home/", http.NotFoundHandler())
	http.ListenAndServe(":8000", nil)
}

func home(w http.ResponseWriter, req *http.Request) {
	tHome, err := template.ParseFiles("templates/home.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tHome.Execute(w, nil)
}

// func getJson() {
// 	url := "https://groupietrackers.herokuapp.com/api/artists"

// 	var tab []Response

// 	res, errGet := http.Get(url)
// 	// fmt.Println(res)

// 	if errGet != nil {
// 		panic(errGet.Error())
// 	}

// 	body, errRead := ioutil.ReadAll(res.Body)
// 	// fmt.Println(body)

// 	if errRead != nil {
// 		panic(errRead.Error())
// 	}

// 	// var artist Response

// 	err := json.Unmarshal(body, &tab)
// 	fmt.Println(err)

// 	fmt.Println(tab)
// 	// fmt.Println(artist.name)

// }
