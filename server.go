package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

var t *template.Template

type artistStruct struct {
	Id           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Locations    string   `json:"locations"`
	ConcertDates string   `json:"concertDates"`
	Relations    string   `json:"relations"`
}
type relationStruct struct {
	Id             int      `json:"id"`
	DatesLocations struct{} `json:"datesLocations"`
}

var artistsData []artistStruct
var relationsData []relationStruct

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

	// Accès aux données :
	http.HandleFunc("/api/artists", artistsAPI)
	// http.HandleFunc("/api/relations", relationsAPI)

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

	// data.Artists = loadArtists()

	if req.Method == "POST" {
		req.ParseForm()

		if req.FormValue("buttonPrevious") == "Previous" {
			// fmt.Println(pagination.elements, "previous")
			if pagination.page != 1 {
				pagination.page--
			}

		} else if req.FormValue("buttonNext") == "Next" {
			// fmt.Println(pagination.elements, "next")
			if pagination.elements != 0 {
				if pagination.page < 52/pagination.elements+1 {
					pagination.page++
				}
			}

		} else if req.FormValue("paginationSelect") != "" {
			// fmt.Println(req.FormValue("paginationSelect"))
			val, err := strconv.Atoi(req.FormValue("paginationSelect"))
			if err != nil {
				fmt.Println(err.Error())
				os.Exit(0)
			}
			pagination.elements = val
			pagination.page = 1
		}

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

/*-----------------------------------------------------------------------------------*/

func artistsAPI(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	loadArtists()
	applyPagination(pagination.elements, pagination.page)
	artistsDataBytes, _ := json.Marshal(artistsData)
	w.Write(artistsDataBytes)
}

// func relationsAPI(w http.ResponseWriter, req *http.Request) {
// 	w.Header().Add("Content-Type", "application/json")
// 	w.Write(loadRelations())
// }

func loadArtists() {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/artists")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseJson, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	errUnmarshal := json.Unmarshal(responseJson, &artistsData)
	if errUnmarshal != nil {
		fmt.Println(errUnmarshal)
		os.Exit(0)
	}
}

// func loadRelations() string {
// 	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/relation")

// 	if errGet != nil {
// 		log.Fatal(errGet)
// 	}

// 	responseJson, errReadAll := ioutil.ReadAll(response.Body)
// 	if errReadAll != nil {
// 		log.Fatal(errReadAll)
// 	}

// 	return string(responseJson)
// }

func applyPagination(elements int, page int) {
	if elements != 0 {
		first := elements * (page - 1)
		last := elements * page
		if last > 52 {
			last = 52
		}
		artistsData = artistsData[first:last]
	}
}
