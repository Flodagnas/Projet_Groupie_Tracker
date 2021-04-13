package main

import (
	"html/template"
	"net/http"
)

var t *template.Template

func main() {
	t = template.Must(template.ParseFiles("templates/index.html"))
	// Importation du CSS :
	http.Handle("/static/css/", http.StripPrefix("/static/css/", http.FileServer(http.Dir("static/css"))))
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

	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/dates", dates)
	http.Handle("/dates/", http.NotFoundHandler())
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
	tArtists, err := template.ParseFiles("templates/artists.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tArtists.Execute(w, nil)
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
