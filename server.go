package main

import (
	"html/template"
	"net/http"
)

var t *template.Template

func main() {
	t = template.Must(template.ParseFiles("templates/index.html"))
	// http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/home", home)
	http.Handle("/home/", http.NotFoundHandler())
	http.ListenAndServe(":8000", nil)

	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/dates", dates)
	http.Handle("/dates/", http.NotFoundHandler())
	http.ListenAndServe(":8000", nil)
}

func home(w http.ResponseWriter, req *http.Request) {
	tHome, err := template.ParseFiles("templates/home.html")
	if (err != nil) {
		w.WriteHeader(400)	
	}
	
	tHome.Execute(w, nil)
}

func dates(w http.RsponseWriter, req *http.Rquest) {
	tDates, err := template.ParseFiles("templates/dates.html")
	if (err != nil) {
		w.WriteHeader(400)	
	}
	
	tDates.Execute(w, nil)
}
