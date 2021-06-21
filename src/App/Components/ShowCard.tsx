import React from "react";
import {
  Card,
  CardMedia,
  CardHeader,
  Row,
  Col,
  Text,
  Modal,
  Tag,
  Button,
  Skeleton,
} from "sha-el-design/lib";
import CastCard from "./CastCard";

import axios from "axios";
import { CastDetails, FetchResponse } from "../Typings/Shows";
import { createArray } from "../helper";

export const ShowCard = (props: { data: FetchResponse }) => {
  const [isVisible, toggle] = React.useState(false);
  const [res, updateRes] = React.useState<CastDetails[]>([]);
  const [loading, updateLoading] = React.useState<boolean>(false);
  const [showEntireCast, updateEntireCast] = React.useState<boolean>(false);
  const showDetails = props.data.show;

  const fetchCastDetails = async (id: number) => {
    updateLoading(true);
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
    updateRes(res.data);
    updateLoading(false);
  };

  const onOpen = () => {
    fetchCastDetails(showDetails.id);
    toggle(true);
  };

  const onClose = () => {
    toggle(false);
    updateEntireCast(false);
  };

  return (
    <>
      <Card style={{ cursor: "pointer", height: "380px" }} onClick={onOpen}>
        <CardMedia
          image={
            showDetails.image?.medium ||
            "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
          }
          height="270px"
        />
        <CardHeader>
          <div style={{ width: "180px" }}>
            <Text variant="h6" textAlign="center">
              {showDetails.name}
            </Text>
          </div>
        </CardHeader>
        <Row gutter={[0, 0]}>
          {showDetails.rating.average && (
            <Col span={12}>
              <Tag outline color="danger" size="SMALL">
                {showDetails.rating.average}
              </Tag>
            </Col>
          )}
          <Col span={12}>
            <Button danger flat size="small">
              More Details
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        width="70%"
        isVisible={isVisible}
        onClose={onClose}
        style={{
          borderRadius: "10px",
          scrollbarWidth: "none",
          background: `linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .9)), url(${
            showDetails.image.original ||
            "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
          }) no-repeat center`,
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <>
          <Row gutter={[5, 5]}>
            <Col span={22} offset={1}>
              <Text variant="h2">{showDetails.name}</Text>
            </Col>
            <Col span={22} offset={2}>
              <Text variant="p" fontSize="20px">
                <div
                  dangerouslySetInnerHTML={{ __html: showDetails.summary }}
                />
              </Text>
            </Col>
            <Col span={22} offset={2}>
              <Row gutter={[0, 0]}>
                {showDetails.webChannel?.name && (
                  <Col
                    flex="0 1 auto"
                    style={{
                      borderRight: "2px solid white",
                      paddingRight: "20px",
                    }}
                  >
                    <Text fontSize="20px">Watch this at</Text>
                    <Button
                      primary
                      size="small"
                      href={showDetails?.officialSite}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginLeft: "15px",
                      }}
                    >
                      {showDetails.webChannel?.name}
                    </Button>
                  </Col>
                )}
                <Col
                  flex="1 1 auto"
                  style={{
                    paddingLeft: showDetails.webChannel?.name && "20px",
                  }}
                >
                  {showDetails.genres?.map((v, i) => (
                    <Tag key={i} color="info" size="SMALL">
                      {v}
                    </Tag>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
          {!!res.length && (
            <Col span={22} offset={1}>
              <Text variant="h3">Cast</Text>
            </Col>
          )}
          <Col span={22} offset={1}>
            <Row gutter={[10, 10]}>
              {loading ? (
                createArray(5).map((v: number) => (
                  <Col
                    key={v}
                    spanXs={20}
                    spanSm={12}
                    spanMd={8}
                    spanLg={6}
                    spanXl={4.8}
                    offset={{ xs: 2 }}
                  >
                    <Skeleton isLoading={loading} />
                  </Col>
                ))
              ) : res.length < 5 || showEntireCast ? (
                <>
                  {res.map((v, i) => (
                    <Col
                      key={i}
                      spanXs={20}
                      spanSm={12}
                      spanMd={8}
                      spanLg={6}
                      spanXl={4.8}
                      offset={{ xs: 2 }}
                    >
                      <CastCard data={v} />
                    </Col>
                  ))}
                  {res.length > 5 && (
                    <Col span={22}>
                      <Button
                        primary
                        flat
                        onClick={() => updateEntireCast(false)}
                      >
                        Show Less
                      </Button>
                    </Col>
                  )}
                </>
              ) : (
                <>
                  {res.slice(0, 5).map((v, i) => (
                    <Col
                      key={i}
                      spanXs={20}
                      spanSm={12}
                      spanMd={8}
                      spanLg={6}
                      spanXl={4.8}
                      offset={{ xs: 2 }}
                    >
                      <CastCard data={v} />
                    </Col>
                  ))}
                  <Col span={22}>
                    <Button primary flat onClick={() => updateEntireCast(true)}>
                      Show Entire Cast
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </>
      </Modal>
    </>
  );
};
