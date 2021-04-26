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
	// Importation des fichiers statiques :
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/", http.NotFoundHandler())

	// Accès aux pages :
	http.HandleFunc("/home", home)
	http.Handle("/home/", http.NotFoundHandler())
	http.HandleFunc("/artists", artists)
	http.Handle("/artists/", http.NotFoundHandler())
	http.HandleFunc("/dates", dates)
	http.Handle("/dates/", http.NotFoundHandler())
	http.HandleFunc("/locations", locations)
	http.Handle("/locations/", http.NotFoundHandler())

	// Port :
	http.ListenAndServe(":8000", nil)
}

func home(w http.ResponseWriter, req *http.Request) {

	tHome, err := template.ParseFiles("templates/home.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tHome.Execute(w, nil)
}

func artists(w http.ResponseWriter, req *http.Request) {
	data.ResponseData = loadAPI()
	tArtists, err := template.ParseFiles("templates/artists.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tArtists.Execute(w, data)
}

func dates(w http.ResponseWriter, req *http.Request) {
	tDates, err := template.ParseFiles("templates/dates.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tDates.Execute(w, nil)
}

func locations(w http.ResponseWriter, req *http.Request) {
	tLocations, err := template.ParseFiles("templates/locations.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tLocations.Execute(w, nil)
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