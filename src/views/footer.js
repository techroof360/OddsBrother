import React from "react";
import { Container, Row, Col } from "reactstrap";
import Twitter from "@material-ui/icons/Twitter";
import Facebook from "@material-ui/icons/Facebook";
import "../style/responsive.css";

export default function Footer() {
  const handleClickOpenSm = (e, link) => {
    e.preventDefault();
    window.open(link, "_new");
  };

  return (
    <div>
      <div style={{ backgroundColor: "#333333", padding: 50 }}>
        <Row
          xs="1"
          sm="2"
          id="handelFooter"
          style={{
            marginBottom: 0,
            textAlign: "center",
            color: "white",

            marginLeft: "8%",
          }}
        >
          <Col
            sm={{ size: 5 }}
            style={{
              backgroundColor: "#3B5998",

              fontFamily: "sans-serif",

              marginBottom: 15,
              padding: 10,
            }}
            className="fb-box"
            onClick={(e) =>
              handleClickOpenSm(
                e,
                "https://www.facebook.com/groups/2146335875599093/"
              )
            }
          >
            <Facebook style={{ marginRight: 10, color: "white" }} />
            Join us on Facebook
          </Col>

          <Col
            sm={{ size: 5, offset: 1 }}
            className="twitter-box"
            style={{
              backgroundColor: "#00ACEE",

              fontFamily: "sans-serif",

              marginBottom: 15,
              padding: 10,
            }}
            onClick={(e) =>
              handleClickOpenSm(e, "https://twitter.com/oddsbrother")
            }
          >
            <Twitter style={{ marginRight: 10, color: "white" }} />
            Join us on Twitter
          </Col>
        </Row>
      </div>

      <div
        style={{
          backgroundColor: "#000000",
          color: "white",
          textAlign: "center",
          fontSize: 12,
          height: 40,
          paddingTop: 12,
        }}
      >
        © Copyright 2020 - Oddsbrother.com
      </div>
    </div>
  );
}
