import React, { useState } from "react";

import DropdownSelector from "main/components/Updates/dropdown";
import {
  oneSubject,
  threeSubjects,
  allTheSubjects,
} from "fixtures/subjectFixtures";

export default {
  title: "components/Updates/dropdown",
  component: DropdownSelector,
};

const Template = (args) => {
  const [subjects, setSubject] = useState("ALL");

  return (
    <DropdownSelector
      subjects={subjects}
      setSubject={setSubject}
      controlId={"SampleControlId"}
      label={"Subject"}
      {...args}
    />
  );
};

export const OneSubject = Template.bind({});
OneSubject.args = {
  subjects: oneSubject,
};

export const ThreeSubjects = Template.bind({});
ThreeSubjects.args = {
  subjects: threeSubjects,
};

export const AllTheSubjects = Template.bind({});
AllTheSubjects.args = {
  subjects: allTheSubjects,
};
