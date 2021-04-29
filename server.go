package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

var t *template.Template

type dataStruct struct {
	Artists   string
	Relations string
}

type Pagination struct {
	elements int
	page     int
}

var data dataStruct
var pagination Pagination

func main() {
	pagination.elements = 0
	pagination.page = 1

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
	data.Artists = loadArtists()

	if req.Method == "POST" {
		req.ParseForm()

		if req.FormValue("buttonPrevious") == "previous" {
			fmt.Println(pagination.elements, "previous")
			if pagination.page != 1 {
				pagination.page--
			}

		} else if req.FormValue("buttonNext") == "next" {
			fmt.Println(pagination.elements, "next")
			if pagination.page < 52/pagination.elements+1 {
				pagination.page++
			}

		} else if req.FormValue("paginationSelect") != "" {
			fmt.Println(req.FormValue("paginationSelect"))
			val, err := strconv.Atoi(req.FormValue("paginationSelect"))
			if err != nil {
				fmt.Println(err.Error())
				os.Exit(0)
			}
			pagination.elements = val
			pagination.page = 1
		}

		applyPagination(pagination.elements, pagination.page)
	}

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

func loadArtists() string {
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

func loadRelations() string {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/relation")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseData, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	return string(responseData)
}

func applyPagination(elements int, page int) {
	if elements != 0 {
		artistsRune := []rune(data.Artists)
		var min int = 0
		var max int = 0
		for i := range artistsRune {

			if elements == max {
				max = i
				break
			}

			if artistsRune[i] == 123 {
				min++
			}

			if artistsRune[i] == 125 {
				max++
			}
		}
		fmt.Println(string(artistsRune[:max]) + "]")
		data.Artists = string(artistsRune[:max]) + "]"
	}
}
