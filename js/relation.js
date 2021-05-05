function APIDates(dates) {
    datesGroupe = JSON.parse(dates)

    for (date in datesGroupe['dates']){
        relationsGroupe['dates'][date].forEach(date2 => {
            dates.push(date2)
        });
    }

    dates.sort(function(a, b){
        let dateA = new Date(a.split("-").reverse().join("-"))
        let dateB = new Date(b.split("-").reverse().join("-"))
        return dateA - dateB
    })
    console.log(dates);
    
};

if (responseDates) {
    APIDates(responseDates)
}