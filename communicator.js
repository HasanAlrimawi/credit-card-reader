const tracksRetriever =  function getTracks() {
    return new Promise((resolve, reject) => {
        let tracks = "%B1234 5678 9101 1223Alrimawi/Hasan^1226?;1234 5678 9101 1223=1226?";
        setTimeout(() => {
            resolve(tracks)
        }, 1000
        )
    })
    // return data;
}