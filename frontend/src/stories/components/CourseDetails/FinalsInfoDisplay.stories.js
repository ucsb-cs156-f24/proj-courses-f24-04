import React from "react";

import FinalsInfoDisplay from "main/components/CourseDetails/FinalsInfoDisplay";
import { finalsInfoFixtures } from "fixtures/finalsInfoFixtures";

export default {
  title: "components/CourseDetails/FinalsInfoDisplay",
  component: FinalsInfoDisplay,
};

const Template = (args) => {
  return <FinalsInfoDisplay {...args} />;
};

export const Empty = Template.bind({});
Empty.args = {
  finalsInfo: [],
};

export const oneFinalsInfo = Template.bind({});
oneFinalsInfo.args = {
  finalsInfo: [finalsInfoFixtures.oneFinalsInfo],
};
