import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  Button,
  Alert,
  Spinner,
  Col,
} from "react-bootstrap";
import NumericInput from "react-numeric-input";
import ArtworkCard from "./artworkCard.js";
import { searchArtworks } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Homepage component
function Homepage({ onLogout }) {
  // Component States
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noArtworksFound, setNoArtworksFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [maxArt, setMaxArtNum] = useState(1);
  const [limit, setLimit] = useState(15);

  // Set the keyword state
  const onChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  // Search artworks
  const onSearchArtworks = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { total, artworksFetched } = await searchArtworks({
      keyword: keyword,
      start: 0,
      limit: limit,
    });
    setMaxArtNum(total);
    console.log(artworksFetched);

    setArtworks(artworksFetched);
    setNoArtworksFound(!artworksFetched || !artworksFetched.length);
    setIsLoading(false); // loading now false
    toast.success(
      `${artworksFetched.length} artworks found that match your search!`
    ); // Toast
  };

  // Load more artworks
  const loadMoreArtworks = async () => {
    setIsLoadingMore(true);
    const { total, artworksFetched } = await searchArtworks({
      keyword: keyword,
      start: artworks.length,
      limit: limit,
    });
    setMaxArtNum(total);
    setArtworks((artworksPrev) => [...artworksPrev, ...artworksFetched]);
    setIsLoadingMore(false); // loading now false
    toast.success(`${artworksFetched.length} new artworks now displayed!`); // Toast
  };

  // Markup
  return (
    <Container fluid className="overflow-hidden mx-0">
      <Row className="mt-2 mb-2">
        <Col>
          <Button variant="outline-danger" onClick={onLogout} className="p-2">
            Log out
          </Button>
        </Col>
      </Row>
      <Row>
        <h1>Art gallery browsing</h1>
      </Row>
      <Row className="mt-2">
        <h4>
          Enter one or multiple keywords below to search for artworks in the Art
          Institute of Chicago.
        </h4>
      </Row>

      <Row>
        {/* Search form */}
        <Form onSubmit={onSearchArtworks} className="m-2 p-2 bg-light">
          <Row className="align-items-center">
            <Col xs="9">
              <Form.Label htmlFor="searchtext">Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="something like Picasso"
                id="searchtext"
                onChange={onChangeKeyword}
                value={keyword}
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="limitnum">Limit</Form.Label>
              <NumericInput
                className="form-control"
                value={limit}
                min={0}
                max={100}
                id="limitnum"
                onChange={(value) => {
                  setLimit(value);
                }}
              />
            </Col>
          </Row>
          <Button
            variant="outline-primary"
            disabled={!keyword}
            type="submit"
            className="my-4"
          >
            Search artworks
          </Button>
        </Form>
      </Row>
      <div className="m-4">
        {isLoading ? (
          <Row className="justify-content-center mb-5">
            <Spinner animation="border" variant="primary" />
          </Row>
        ) : noArtworksFound ? (
          <Alert variant={"info"}>
            No results were found for the entered keyword.
          </Alert>
        ) : (
          <Row xs={1} md={3} lg={4} className="g-4">
            {artworks?.map((artwork, idx) => {
              return (
                <ArtworkCard
                  artwork={artwork}
                  idx={idx}
                  key={`artwork-${artwork.id}`}
                />
              );
            })}
          </Row>
        )}
      </div>

      {/* Load more button */}
      {!isLoadingMore && artworks.length > 0 && artworks.length < maxArt ? (
        <div class="text-center my-2">
          <Button variant="secondary" onClick={loadMoreArtworks}>
            Load more
          </Button>
        </div>
      ) : isLoadingMore && artworks.length > 0 && artworks.length < maxArt ? (
        <Row className="justify-content-center mb-5">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : undefined}
    </Container>
  );
}

export default Homepage;
