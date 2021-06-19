import { Card, CardHeader, CardMedia, Text } from "sha-el-design/lib";

import { CastDetails } from "../Typings/Shows";

const CastCard = (props: { data: CastDetails }) => (
  <Card>
    <CardMedia image={props.data.person?.image?.medium} height="200px" />
    <CardHeader>
      <div style={{ width: "90%" }}>
        <Text>{props.data.person.name}</Text>
      </div>
    </CardHeader>
    <Text>
      as
      <br /> {props.data.character.name}
    </Text>
  </Card>
);

export default CastCard;
