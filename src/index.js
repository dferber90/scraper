import React from "react";
import ReactDOM from "react-dom";
import htmlToJson from "html-to-json";
import fakeResponse from "./response";
import { getDomain } from "./utils";

import "./styles.css";

// const fetchUri = () => Promise.resolve(fakeResponse);

const fetchUri = url => fetch(url).then(response => response.json());

class App extends React.Component {
  state = {
    url:
      "https://www.srf.ch/news/schweiz/weniger-praemienverbilligungen-kantone-sparen-beim-mittelstand",
    data: null
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.url);
    fetchUri(this.state.url)
      .then(body =>
        htmlToJson.parse(body, {
          pageTitle: doc => doc.find("title").text(),
          title: doc => doc.find(".article-title__text").text()
        })
      )
      .then(parsed => {
        console.log(parsed);
        this.setState(prevState => ({
          data: {
            domain: getDomain(prevState.url),
            pageTitle: parsed.pageTitle,
            title: parsed.title
          }
        }));
      });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            name="url"
            type="text"
            onChange={event => {
              this.setState({ url: event.target.value });
            }}
            value={this.state.url}
          />
          <button type="submit">Scrape</button>
        </form>
        {this.state.data && (
          <table>
            <tr>
              <td>Domain</td>
              <td>
                <input
                  name="domain"
                  value={this.state.data.domain}
                  onChange={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>Page Title</td>
              <td>
                <input
                  name="pageTitle"
                  value={this.state.data.pageTitle}
                  onChange={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>Title</td>
              <td>
                <input
                  name="title"
                  value={this.state.data.title}
                  onChange={() => {}}
                />
              </td>
            </tr>
          </table>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
