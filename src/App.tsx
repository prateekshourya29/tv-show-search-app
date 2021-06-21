import React from "react";
import { Button, Col, Input, Row, Skeleton, Text } from "sha-el-design/lib";
import { ShowCard } from "./App/Components/ShowCard";

import axios from "axios";
import { GiEmptyMetalBucket } from "react-icons/gi";
import { createArray } from "./App/helper";
import { FetchResponse } from "./App/Typings/Shows";

const App: React.FC = () => {
  const [inputValue, updateInputValue] = React.useState<string>("");
  const [res, updateRes] = React.useState<FetchResponse[]>([]);
  const [loading, updateLoading] = React.useState<boolean>(false);

  const fetchTvShows = async (query: string) => {
    updateLoading(true);

    const res = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${query}`
    );
    updateRes(res.data);

    updateLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTvShows(inputValue);
  };

  return (
    <Row>
      <Col>
        <Text variant="h2" textAlign="center">
          Search TV Show
        </Text>
      </Col>
      <Col
        spanXs={22}
        spanSm={20}
        spanMd={16}
        spanLg={12}
        spanXl={10}
        offset={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 7 }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Row>
            <Col
              spanXs={20}
              spanSm={18}
              spanXl={16}
              offset={{ xs: 2, sm: 3, xl: 4 }}
            >
              <Input
                value={inputValue}
                onChange={(e) => updateInputValue(e.target.value)}
                label="Enter Show Name"
              />
            </Col>
            <Col
              spanXs={8}
              spanSm={8}
              spanXl={6}
              offset={{ xs: 8, sm: 8, xl: 9 }}
            >
              <Button
                displayBlock
                type="submit"
                primary
                loading={loading}
                disabled={inputValue === ""}
              >
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
      <Col spanXs={22} spanSm={22} spanXl={20} offset={{ xs: 1, sm: 1, xl: 2 }}>
        <Row gutter={[15, 15]}>
          {loading ? (
            createArray(10).map((v: number) => (
              <Col
                key={v}
                spanXs={16}
                spanSm={11}
                spanMd={8}
                spanLg={6}
                spanXl={4.8}
                offset={{ xs: 4, sm: 1, md: 0 }}
              >
                <Skeleton isLoading={loading} />
              </Col>
            ))
          ) : !res.length ? (
            <Col>
              <GiEmptyMetalBucket size="150px" style={{ margin: "auto" }} />
              <Text variant="h6" textAlign="center">
                No show available
              </Text>
            </Col>
          ) : (
            res.map((v, i) => (
              <Col
                key={i}
                spanXs={16}
                spanSm={11}
                spanMd={8}
                spanLg={6}
                spanXl={4.8}
                offset={{ xs: 4, sm: 1, md: 0 }}
              >
                <ShowCard data={v} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default App;
