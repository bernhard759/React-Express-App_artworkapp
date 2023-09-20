import React, { memo } from "react";
import { Card, Col } from "react-bootstrap";

function ArtworkCard({ idx, artwork }) {
  const {
    title,
    image_url,
    artist_display,
    date_display,
    medium_display,
    place_of_origin,
  } = artwork;
  // Markup
  return (
    <Col key={`col-${idx}`}>
      <Card>
        <a
          href={image_url}
          target="_blank"
          rel="noreferrer"
          aria-current="true"
        >
          <Card.Img variant="top" loading="lazy" src={image_url} />
        </a>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="text-muted" style={{ whiteSpace: "pre-line" }}>
            {place_of_origin}, {date_display}
            <br />
            <small className="text-muted">{artist_display}</small>
          </Card.Text>
          <Card.Text>
            <small className="text-muted">{medium_display}</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default memo(ArtworkCard);
