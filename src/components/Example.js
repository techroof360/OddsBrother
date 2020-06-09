import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import axios from "axios";

const Example = props => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        userId: "api@skild",
        password: "password"
      }
    };

    // axios
    //   .get("https://staging.skild.com/skild_api_spring/SectionIds/json", config)
    //   .then(res => setResponse(res.data.sectionList));
    axios({
      method: "post",
      url: "https://staging.skild.com/skild_api_spring/authenticate",
      headers: { "Content-Type": "application/json" },
      data: {
        userId: "api@skild",
        password: "password"
      }
    }).then(res => {
      console.log(res.data.token);
      axios({
        method: "GET",
        url: "https://staging.skild.com/skild_api_spring/BracketIds/json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.data.token}`
        }
      }).then(res => {
        console.log(res);
      });
    });
  }, []);

  return (
    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
      <thead className="thead-light">
        <tr>
          <th className="text-center">Bracket ID</th>

          <th className="text-center">Section ID</th>

          <th className="text-center">Display No</th>

          <th className="text-center">Question</th>
        </tr>
      </thead>
      <tbody>
        {response.length > 0 ? (
          response.map((section, index) => (
            <tr key={index}>
              <td className="text-center">{section.bracketId}</td>
              <td className="text-center">{section.sectionId}</td>
              <td className="text-center">{section.displayNumber}</td>
              <td className="text-center">{section.question}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Example;
