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
    const res = await axios.get(`http://api.tvmaze.com/shows/${id}/cast`);
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
        style={{ borderRadius: "10px" }}
      >
        <Row>
          <Col span={17}>
            <Row>
              <Col span={22} offset={1}>
                <Text variant="h3">{showDetails.name}</Text>
              </Col>
              <Col span={22} offset={2}>
                <Text variant="p" fontSize="16px">
                  {showDetails.summary}
                </Text>
              </Col>
              <Col span={22} offset={2}>
                {showDetails.genres?.map((v, i) => (
                  <Tag key={i} size="SMALL" color="info">
                    {v}
                  </Tag>
                ))}
              </Col>
              {!!res.length && (
                <Col span={22} offset={1}>
                  <Text variant="h4">Cast</Text>
                </Col>
              )}
              <Col span={23} offset={1}>
                <Row gutter={[10, 10]}>
                  {loading ? (
                    createArray(4).map((v: number) => (
                      <Col key={v} span={6}>
                        <Skeleton isLoading={loading} />
                      </Col>
                    ))
                  ) : res.length < 4 || showEntireCast ? (
                    <>
                      {res.map((v, i) => (
                        <Col key={i} span={6}>
                          <CastCard data={v} />
                        </Col>
                      ))}
                      {res.length > 4 && (
                        <Col span={22}>
                          <Button
                            primary
                            flat
                            onClick={() => updateEntireCast(false)}
                          >
                            Hide Cast
                          </Button>
                        </Col>
                      )}
                    </>
                  ) : (
                    <>
                      {res.slice(0, 4).map((v, i) => (
                        <Col key={i} span={6}>
                          <CastCard data={v} />
                        </Col>
                      ))}
                      <Col span={22}>
                        <Button
                          primary
                          flat
                          onClick={() => updateEntireCast(true)}
                        >
                          Show Entire Cast
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={7}>
            <Row>
              <Col span={20} offset={2}>
                <Card>
                  <CardMedia
                    image={
                      showDetails.image?.medium ||
                      "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                    }
                    height="350px"
                  />
                </Card>
              </Col>
              {showDetails.webChannel?.name && (
                <Col span={20} offset={2}>
                  <Button
                    primary
                    size="small"
                    href={showDetails?.officialSite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {showDetails.webChannel?.name}
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
