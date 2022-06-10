import React, { Component } from "react";

function PersonRow({ person }) {
  const { firstName, lastName, age } = person;
  return (
    <tr>
      <th>{firstName}</th>
      <th>{lastName}</th>
      <th>{age}</th>
    </tr>
  );
}

export default PersonRow;
