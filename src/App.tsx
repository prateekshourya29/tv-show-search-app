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

  const searchTvShows = async (query: string): Promise<any> => {
    if (query === "") return;

    console.log("Searching for...", query);
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
          TV Show Search App
        </Text>
      </Col>
      <Col span={10} offset={7}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Row>
            <Col offset={2} span={20}>
              <Input
                value={InputValue}
                onChange={(e) => updateInputValue(e.target.value)}
                label="Search for Tv Shows"
              />
            </Col>
            <Col offset={10} span={4}>
              <Button
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
      <Col span={16} offset={4}>
        <Row>
          {res.map((v) => (
            <Col span={4.8}>
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
