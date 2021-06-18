import axios from "axios";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Col,
  Input,
  Row,
  Text,
} from "sha-el-design/lib";

const App: React.FC = () => {
  const [InputValue, updateInputValue] = React.useState<string>("");
  const [res, updateRes] = React.useState<FetchResponse[]>([]);
  const [loading, updateLoading] = React.useState<boolean>(false);

  const searchTvShows = async (query: string) => {
    updateLoading(true);

    const res = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${query}`
    );
    updateRes(res.data);

    updateLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchTvShows(InputValue);
  };

  return (
    <Row>
      <Col>
        <Text variant="h4" textAlign="center">
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
                value={InputValue}
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
                disabled={InputValue === ""}
              >
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
      <Col spanXs={22} spanSm={22} spanXl={20} offset={{ xs: 1, sm: 1, xl: 2 }}>
        <Row gutter={[15, 15]}>
          {res.map((v) => (
            <Col
              spanXs={16}
              spanSm={11}
              spanMd={8}
              spanLg={6}
              spanXl={4.8}
              offset={{ xs: 4, sm: 1, md: 0 }}
            >
              <Card>
                <CardMedia
                  image={
                    v.show.image?.medium ||
                    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                  }
                  height="270px"
                />
                <CardHeader>
                  <Row>
                    <Col>
                      <Text variant="h6" textAlign="center">
                        {v.show.name}
                      </Text>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

interface FetchResponse {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    generes: string[];
    status: string;
    runtime: any;
    averageRuntime: any;
    premiered: string;
    officialSite: string;
    schedule: any;
    rating: {
      average: number;
    };
    weight: any;
    network: any;
    webChannel: any;
    dvdCountry: any;
    externals: any;
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    updated: any;
    _links: any;
  };
}

export default App;
