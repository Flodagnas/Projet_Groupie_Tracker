package main

import (
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

var t *template.Template

type dataStruct struct {
	ResponseData string
}

var data dataStruct

func main() {

	t = template.Must(template.ParseFiles("templates/index.html"))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/home", home)
	http.Handle("/home/", http.NotFoundHandler())
	http.ListenAndServe(":8000", nil)
}

func home(w http.ResponseWriter, req *http.Request) {
	data.ResponseData = loadAPI()
	tHome, err := template.ParseFiles("templates/home.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tHome.Execute(w, data)
}

func loadAPI() string {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/artists")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseData, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	return string(responseData)
}
