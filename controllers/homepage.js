const fetch = require("cross-fetch");
const { response } = require("express");
const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q=";

//  GET Artworks request function
const getArtworks = async (req, res = response) => {
  // Query params
  const { keyword, start, limit } = req.query;
  const pageNum = Math.floor((Number(start) + Number(limit)) / Number(limit));

  try {
    // Get the data from the API
    const resp = await fetch(
      `${AIC_URL}${keyword}&limit=${limit}&page=${pageNum}&fields=id,title,image_id,date_display,artist_display,place_of_origin,medium_display,api_link`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    // The data from the API
    const { pagination = [], data = [] } = await resp.json();

    const dataWithUrls = data.map((image) => ({
      ...image,
      image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
    }));

    res.json({total: pagination.total, artworksFetched:dataWithUrls});

    // Catch any error
  } catch (err) {
    console.error(err);
  }
};

// Export the get request function
module.exports = {
  getArtworks,
};
