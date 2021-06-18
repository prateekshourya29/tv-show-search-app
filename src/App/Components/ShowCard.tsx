import React from "react";
import { Card, CardMedia, CardHeader, Row, Col, Text } from "sha-el-design/lib";
import { FetchResponse } from "../Typings/Shows";

export const ShowCard = (props: { data: FetchResponse }) => (
  <Card>
    <CardMedia
      image={
        props.data.show.image?.medium ||
        "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
      }
      height="270px"
    />
    <CardHeader>
      <Row>
        <Col>
          <Text variant="h6" textAlign="center">
            {props.data.show.name}
          </Text>
        </Col>
      </Row>
    </CardHeader>
  </Card>
);
